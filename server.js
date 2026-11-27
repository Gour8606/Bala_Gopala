/**
 * Bala Gopala Gurukul - Static production server (zero dependencies)
 *
 * Serves only the public app assets, with compression, conditional requests,
 * and security headers. Anything not on the public allow-list is a 404.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const zlib = require('zlib');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.webmanifest': 'application/manifest+json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg'
};

// Project files that live beside the app but must never be served.
const PRIVATE_FILES = ['server.js', 'test.js', 'package.json', 'package-lock.json'];
const COMPRESSIBLE = ['.html', '.css', '.js', '.json', '.webmanifest', '.svg'];

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self' data: blob:",
  "connect-src 'self'",
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "frame-ancestors 'self'"
].join('; ');

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'no-referrer',
  'Content-Security-Policy': CONTENT_SECURITY_POLICY,
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin'
};

// Compressed bodies keyed by "<path>|<etag>|<encoding>" so each file version is compressed once.
const compressedCache = new Map();

function getNetworkIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

function sendPlain(res, status, message, extraHeaders) {
  const headers = Object.assign({ 'Content-Type': 'text/plain; charset=UTF-8', 'Cache-Control': 'no-store' }, SECURITY_HEADERS, extraHeaders || {});
  res.writeHead(status, headers);
  res.end(message);
}

/**
 * Maps a request URL to a servable file path inside PUBLIC_DIR.
 * Returns { status } for anything that must not be served.
 */
function resolvePublicPath(rawUrl) {
  let reqPath;
  try {
    reqPath = decodeURIComponent(String(rawUrl).split('?')[0].split('#')[0]);
  } catch (e) {
    return { status: 400 };
  }
  if (reqPath.indexOf('\0') !== -1) return { status: 400 };
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const filePath = path.join(PUBLIC_DIR, path.normalize(reqPath));
  const relPath = path.relative(PUBLIC_DIR, filePath);
  if (!relPath || relPath.startsWith('..') || path.isAbsolute(relPath)) return { status: 403 };

  const segments = relPath.split(path.sep);
  // Hidden files and folders (.git, .env, .claude ...) and dependencies stay private
  if (segments.some((s) => s.charAt(0) === '.' || s === 'node_modules')) return { status: 404 };
  if (segments.length === 1 && PRIVATE_FILES.indexOf(segments[0]) !== -1) return { status: 404 };

  const ext = path.extname(filePath).toLowerCase();
  if (!MIME_TYPES[ext]) return { status: 404 };

  return { filePath: filePath, ext: ext };
}

function pickEncoding(req) {
  const accept = String(req.headers['accept-encoding'] || '');
  if (/\bbr\b/.test(accept) && typeof zlib.brotliCompress === 'function') return 'br';
  if (/\bgzip\b/.test(accept)) return 'gzip';
  return null;
}

function compress(buffer, encoding, callback) {
  if (encoding === 'br') {
    const params = {};
    params[zlib.constants.BROTLI_PARAM_QUALITY] = 5;
    zlib.brotliCompress(buffer, { params: params }, callback);
  } else {
    zlib.gzip(buffer, { level: 6 }, callback);
  }
}

function handleRequest(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    sendPlain(res, 405, '405 Method Not Allowed', { 'Allow': 'GET, HEAD' });
    return;
  }

  const resolved = resolvePublicPath(req.url);
  if (resolved.status) {
    const text = { 400: '400 Bad Request', 403: '403 Forbidden', 404: '404 Not Found' }[resolved.status];
    sendPlain(res, resolved.status, text);
    return;
  }

  fs.stat(resolved.filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      sendPlain(res, 404, '404 Not Found');
      return;
    }

    const etag = 'W/"' + stats.size.toString(16) + '-' + Math.floor(stats.mtimeMs).toString(16) + '"';
    const isSW = path.basename(resolved.filePath) === 'sw.js';
    const headers = Object.assign({
      'Content-Type': MIME_TYPES[resolved.ext],
      // Always revalidate (cheap 304s) so a new release reaches tablets immediately;
      // the service worker must never be stored by the HTTP cache.
      'Cache-Control': isSW ? 'no-cache, no-store, must-revalidate' : 'no-cache',
      'ETag': etag,
      'Last-Modified': stats.mtime.toUTCString(),
      'Vary': 'Accept-Encoding'
    }, SECURITY_HEADERS);

    if (req.headers['if-none-match'] === etag) {
      res.writeHead(304, headers);
      res.end();
      return;
    }

    const encoding = COMPRESSIBLE.indexOf(resolved.ext) !== -1 ? pickEncoding(req) : null;

    if (!encoding) {
      headers['Content-Length'] = stats.size;
      res.writeHead(200, headers);
      if (req.method === 'HEAD') {
        res.end();
        return;
      }
      const stream = fs.createReadStream(resolved.filePath);
      stream.on('error', () => res.destroy());
      stream.pipe(res);
      return;
    }

    const sendCompressed = (body) => {
      headers['Content-Encoding'] = encoding;
      headers['Content-Length'] = body.length;
      res.writeHead(200, headers);
      res.end(req.method === 'HEAD' ? undefined : body);
    };

    const cacheKey = resolved.filePath + '|' + etag + '|' + encoding;
    const cached = compressedCache.get(cacheKey);
    if (cached) {
      sendCompressed(cached);
      return;
    }

    fs.readFile(resolved.filePath, (readErr, raw) => {
      if (readErr) {
        sendPlain(res, 500, '500 Internal Server Error');
        return;
      }
      compress(raw, encoding, (zipErr, body) => {
        if (zipErr) {
          sendPlain(res, 500, '500 Internal Server Error');
          return;
        }
        // Drop older versions of the same file so the cache cannot grow without bound
        compressedCache.forEach((value, key) => {
          if (key.indexOf(resolved.filePath + '|') === 0 && key.slice(-encoding.length - 1) === '|' + encoding) {
            compressedCache.delete(key);
          }
        });
        compressedCache.set(cacheKey, body);
        sendCompressed(body);
      });
    });
  });
}

function createServer() {
  return http.createServer((req, res) => {
    try {
      handleRequest(req, res);
    } catch (e) {
      // A single bad request must never take the whole server down
      console.error('Request failed:', req.method, req.url, e && e.message);
      if (!res.headersSent) {
        sendPlain(res, 500, '500 Internal Server Error');
      } else {
        res.destroy();
      }
    }
  });
}

if (require.main === module) {
  const server = createServer();

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Stop the other process or run with PORT=<number> node server.js`);
    } else {
      console.error('Server error:', err.message);
    }
    process.exit(1);
  });

  server.listen(PORT, HOST, () => {
    const ip = getNetworkIP();
    console.log('========================================================');
    console.log('🕉️  BALA GOPALA: GURUKUL 16 KALAS & 64 VIDHYAS');
    console.log('========================================================');
    console.log(`💻 Local Browser:   http://localhost:${PORT}`);
    console.log(`📱 Tablet / Phone:  http://${ip}:${PORT}`);
    console.log('========================================================');
  });

  const shutdown = () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 2000).unref();
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

module.exports = { createServer, resolvePublicPath, MIME_TYPES, SECURITY_HEADERS };
