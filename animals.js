/**
 * Toddler Wonderland - SVG Character & Object Library
 * Vibrant, friendly vector artwork specially styled for 2-year-olds
 */

const SVGLibrary = {
  // Puppy
  puppy: `
    <svg viewBox="0 0 100 100" class="toddler-svg animal-puppy">
      <ellipse cx="50" cy="56" rx="34" ry="30" fill="#E89B5F"/>
      <!-- Floppy Ears -->
      <path d="M 22 35 C 10 38, 8 65, 18 68 C 26 70, 28 50, 28 40 Z" fill="#B36529"/>
      <path d="M 78 35 C 90 38, 92 65, 82 68 C 74 70, 72 50, 72 40 Z" fill="#B36529"/>
      <!-- Eyes -->
      <ellipse cx="38" cy="50" rx="6" ry="7" fill="#222"/>
      <circle cx="36" cy="48" r="2.5" fill="#FFF"/>
      <ellipse cx="62" cy="50" rx="6" ry="7" fill="#222"/>
      <circle cx="60" cy="48" r="2.5" fill="#FFF"/>
      <!-- Rosy Cheeks -->
      <ellipse cx="28" cy="58" rx="5" ry="3" fill="#FF8BA7" opacity="0.6"/>
      <ellipse cx="72" cy="58" rx="5" ry="3" fill="#FF8BA7" opacity="0.6"/>
      <!-- Snout & Nose -->
      <ellipse cx="50" cy="62" rx="14" ry="10" fill="#FFF5EB"/>
      <polygon points="46,57 54,57 50,62" fill="#3D2314"/>
      <!-- Mouth & Tongue -->
      <path d="M 46 63 Q 50 67 54 63" stroke="#3D2314" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M 48 65 Q 50 72 52 65" fill="#FF5376"/>
    </svg>
  `,

  // Kitten
  kitten: `
    <svg viewBox="0 0 100 100" class="toddler-svg animal-kitten">
      <!-- Ears -->
      <polygon points="20,45 28,15 45,35" fill="#FFAA5A"/>
      <polygon points="25,40 30,22 42,34" fill="#FFB7C5"/>
      <polygon points="80,45 72,15 55,35" fill="#FFAA5A"/>
      <polygon points="75,40 70,22 58,34" fill="#FFB7C5"/>
      <!-- Head -->
      <ellipse cx="50" cy="56" rx="34" ry="29" fill="#FFAA5A"/>
      <!-- Whiskers -->
      <line x1="15" y1="58" x2="32" y2="58" stroke="#D37515" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="64" x2="33" y2="62" stroke="#D37515" stroke-width="2" stroke-linecap="round"/>
      <line x1="85" y1="58" x2="68" y2="58" stroke="#D37515" stroke-width="2" stroke-linecap="round"/>
      <line x1="84" y1="64" x2="67" y2="62" stroke="#D37515" stroke-width="2" stroke-linecap="round"/>
      <!-- Eyes -->
      <ellipse cx="38" cy="52" rx="6" ry="7.5" fill="#1C5D99"/>
      <circle cx="36" cy="50" r="2.5" fill="#FFF"/>
      <circle cx="40" cy="54" r="1.2" fill="#FFF"/>
      <ellipse cx="62" cy="52" rx="6" ry="7.5" fill="#1C5D99"/>
      <circle cx="60" cy="50" r="2.5" fill="#FFF"/>
      <circle cx="64" cy="54" r="1.2" fill="#FFF"/>
      <!-- Nose & Mouth -->
      <polygon points="48,60 52,60 50,63" fill="#FF758F"/>
      <path d="M 46 64 Q 50 68 54 64" stroke="#3D2314" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Cheeks -->
      <ellipse cx="28" cy="60" rx="5" ry="3.5" fill="#FF8BA7" opacity="0.6"/>
      <ellipse cx="72" cy="60" rx="5" ry="3.5" fill="#FF8BA7" opacity="0.6"/>
    </svg>
  `,

  // Friendly Cow
  cow: `
    <svg viewBox="0 0 100 100" class="toddler-svg animal-cow">
      <!-- Horns -->
      <path d="M 32 30 Q 22 18 20 25" stroke="#E0A96D" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 68 30 Q 78 18 80 25" stroke="#E0A96D" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Ears -->
      <ellipse cx="22" cy="38" rx="10" ry="6" fill="#FFF" transform="rotate(-20 22 38)"/>
      <ellipse cx="78" cy="38" rx="10" ry="6" fill="#FFF" transform="rotate(20 78 38)"/>
      <!-- Head -->
      <ellipse cx="50" cy="50" rx="32" ry="28" fill="#F8F9FA"/>
      <!-- Cow Spots -->
      <path d="M 28 32 Q 40 28 42 42 Q 35 48 26 42 Z" fill="#3D3A45"/>
      <path d="M 68 36 Q 78 32 75 48 Q 65 46 64 38 Z" fill="#3D3A45"/>
      <!-- Eyes -->
      <ellipse cx="37" cy="46" rx="5" ry="6" fill="#222"/>
      <circle cx="35" cy="44" r="2.2" fill="#FFF"/>
      <ellipse cx="63" cy="46" rx="5" ry="6" fill="#222"/>
      <circle cx="61" cy="44" r="2.2" fill="#FFF"/>
      <!-- Big Pink Muzzle -->
      <ellipse cx="50" cy="66" rx="22" ry="14" fill="#FFCCD5"/>
      <!-- Nostrils -->
      <circle cx="43" cy="65" r="3" fill="#D63384"/>
      <circle cx="57" cy="65" r="3" fill="#D63384"/>
      <!-- Smile -->
      <path d="M 45 73 Q 50 77 55 73" stroke="#D63384" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>
  `,

  // Duckling
  duck: `
    <svg viewBox="0 0 100 100" class="toddler-svg animal-duck">
      <!-- Body & Head -->
      <ellipse cx="50" cy="54" rx="32" ry="30" fill="#FFD129"/>
      <!-- Hair Tuft -->
      <path d="M 48 24 Q 50 16 54 22 Q 56 18 60 25" stroke="#FFD129" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- Eyes -->
      <ellipse cx="40" cy="48" rx="6" ry="7" fill="#1E293B"/>
      <circle cx="38" cy="46" r="2.5" fill="#FFF"/>
      <ellipse cx="64" cy="48" rx="6" ry="7" fill="#1E293B"/>
      <circle cx="62" cy="46" r="2.5" fill="#FFF"/>
      <!-- Rosy Cheeks -->
      <ellipse cx="30" cy="56" rx="5" ry="3" fill="#FF70A6" opacity="0.7"/>
      <ellipse cx="70" cy="56" rx="5" ry="3" fill="#FF70A6" opacity="0.7"/>
      <!-- Orange Bill -->
      <ellipse cx="52" cy="62" rx="15" ry="8" fill="#FF7A00"/>
      <ellipse cx="52" cy="65" rx="12" ry="5" fill="#E65100"/>
      <circle cx="48" cy="60" r="1.2" fill="#7A2E00"/>
      <circle cx="56" cy="60" r="1.2" fill="#7A2E00"/>
    </svg>
  `,

  // Froggy
  frog: `
    <svg viewBox="0 0 100 100" class="toddler-svg animal-frog">
      <!-- Big Round Eye Bumps -->
      <circle cx="32" cy="36" r="15" fill="#70E000"/>
      <circle cx="68" cy="36" r="15" fill="#70E000"/>
      <!-- Head -->
      <ellipse cx="50" cy="58" rx="36" ry="26" fill="#70E000"/>
      <ellipse cx="50" cy="64" rx="24" ry="16" fill="#CCFF33"/>
      <!-- Eyes -->
      <circle cx="32" cy="36" r="11" fill="#FFF"/>
      <ellipse cx="33" cy="36" rx="5.5" ry="6.5" fill="#1B4332"/>
      <circle cx="31" cy="33" r="2.2" fill="#FFF"/>
      <circle cx="68" cy="36" r="11" fill="#FFF"/>
      <ellipse cx="67" cy="36" rx="5.5" ry="6.5" fill="#1B4332"/>
      <circle cx="65" cy="33" r="2.2" fill="#FFF"/>
      <!-- Rosy Cheeks -->
      <ellipse cx="25" cy="58" rx="5" ry="3.5" fill="#FF8BA7" opacity="0.7"/>
      <ellipse cx="75" cy="58" rx="5" ry="3.5" fill="#FF8BA7" opacity="0.7"/>
      <!-- Big Happy Grin -->
      <path d="M 34 60 Q 50 74 66 60" stroke="#1B4332" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="46" cy="53" r="1.5" fill="#38B000"/>
      <circle cx="54" cy="53" r="1.5" fill="#38B000"/>
    </svg>
  `,

  // Fluffy Sheep
  sheep: `
    <svg viewBox="0 0 100 100" class="toddler-svg animal-sheep">
      <!-- Fluffy Cloud Body Backing -->
      <circle cx="30" cy="40" r="14" fill="#F8F9FA"/>
      <circle cx="70" cy="40" r="14" fill="#F8F9FA"/>
      <circle cx="22" cy="55" r="13" fill="#F8F9FA"/>
      <circle cx="78" cy="55" r="13" fill="#F8F9FA"/>
      <circle cx="35" cy="70" r="14" fill="#F8F9FA"/>
      <circle cx="65" cy="70" r="14" fill="#F8F9FA"/>
      <circle cx="50" cy="72" r="14" fill="#F8F9FA"/>
      <!-- Ears -->
      <ellipse cx="22" cy="46" rx="8" ry="4" fill="#4A4E69" transform="rotate(20 22 46)"/>
      <ellipse cx="78" cy="46" rx="8" ry="4" fill="#4A4E69" transform="rotate(-20 78 46)"/>
      <!-- Face -->
      <ellipse cx="50" cy="54" rx="20" ry="22" fill="#4A4E69"/>
      <!-- Wool Hair Tuft -->
      <circle cx="44" cy="32" r="7" fill="#F8F9FA"/>
      <circle cx="56" cy="32" r="7" fill="#F8F9FA"/>
      <circle cx="50" cy="28" r="8" fill="#F8F9FA"/>
      <!-- Eyes -->
      <ellipse cx="42" cy="50" rx="4" ry="5" fill="#FFF"/>
      <circle cx="43" cy="50" r="2.5" fill="#1B1B1E"/>
      <ellipse cx="58" cy="50" rx="4" ry="5" fill="#FFF"/>
      <circle cx="57" cy="50" r="2.5" fill="#1B1B1E"/>
      <!-- Cheeks -->
      <ellipse cx="36" cy="59" rx="3.5" ry="2" fill="#FF8BA7" opacity="0.8"/>
      <ellipse cx="64" cy="59" rx="3.5" ry="2" fill="#FF8BA7" opacity="0.8"/>
      <!-- Smile -->
      <path d="M 46 64 Q 50 68 54 64" stroke="#FFF" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>
  `,

  // Smiling Sun
  sun: `
    <svg viewBox="0 0 100 100" class="toddler-svg sun-art">
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF275"/>
          <stop offset="100%" stop-color="#FF9F1C"/>
        </radialGradient>
      </defs>
      <!-- Sun Rays -->
      <g stroke="#FFBF00" stroke-width="5" stroke-linecap="round" opacity="0.9">
        <line x1="50" y1="10" x2="50" y2="18"/>
        <line x1="50" y1="82" x2="50" y2="90"/>
        <line x1="10" y1="50" x2="18" y2="50"/>
        <line x1="82" y1="50" x2="90" y2="50"/>
        <line x1="22" y1="22" x2="28" y2="28"/>
        <line x1="72" y1="72" x2="78" y2="78"/>
        <line x1="22" y1="78" x2="28" y2="72"/>
        <line x1="72" y1="28" x2="78" y2="22"/>
      </g>
      <!-- Center Circle -->
      <circle cx="50" cy="50" r="26" fill="url(#sunGrad)"/>
      <!-- Cheerful Face -->
      <circle cx="42" cy="46" r="3" fill="#5A2E00"/>
      <circle cx="58" cy="46" r="3" fill="#5A2E00"/>
      <ellipse cx="37" cy="52" rx="4" ry="2" fill="#FF5722" opacity="0.5"/>
      <ellipse cx="63" cy="52" rx="4" ry="2" fill="#FF5722" opacity="0.5"/>
      <path d="M 42 54 Q 50 63 58 54" stroke="#5A2E00" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    </svg>
  `
};

window.SVGLibrary = SVGLibrary;
