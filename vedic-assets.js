/**
 * Toddler Wonderland - Vedic Character & Sacred Asset Library (Enhanced Edition)
 * Crafted for early childhood Hindu devotional learning (Bala Krishna Leela & Sandipani Gurukul)
 * 100% Scalable Vector Graphics - Zero external image dependencies
 */

const VedicAssets = {
  // Baby Krishna (Bala Gopala) with Peacock Feather and Makhan
  balaKrishna: `
    <svg viewBox="0 0 120 120" class="toddler-svg vedic-krishna">
      <defs>
        <radialGradient id="krishnaSkin" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#A5F3FC"/>
          <stop offset="50%" stop-color="#38BDF8"/>
          <stop offset="100%" stop-color="#0284C7"/>
        </radialGradient>
        <linearGradient id="goldCrown" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FEF08A"/>
          <stop offset="50%" stop-color="#F59E0B"/>
          <stop offset="100%" stop-color="#D97706"/>
        </linearGradient>
        <radialGradient id="morPankhEye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38BDF8"/>
          <stop offset="45%" stop-color="#4338CA"/>
          <stop offset="70%" stop-color="#059669"/>
          <stop offset="100%" stop-color="#D97706"/>
        </radialGradient>
      </defs>

      <!-- Peacock Feather (Mor Pankh) on Topknot -->
      <g transform="translate(68, 8) rotate(22)">
        <path d="M 0 35 C -15 25 -18 5 0 0 C 18 5 15 25 0 35 Z" fill="#059669" stroke="#10B981" stroke-width="1.5"/>
        <path d="M 0 28 C -10 20 -12 8 0 4 C 12 8 10 20 0 28 Z" fill="url(#morPankhEye)"/>
        <ellipse cx="0" cy="14" rx="3.5" ry="5.5" fill="#38BDF8"/>
        <line x1="0" y1="35" x2="0" y2="48" stroke="#047857" stroke-width="2" stroke-linecap="round"/>
      </g>

      <!-- Hair Topknot (Juda) with Pearls -->
      <circle cx="60" cy="30" r="13" fill="#0F172A"/>
      <circle cx="56" cy="24" r="2.5" fill="#FFF"/>
      <circle cx="62" cy="23" r="2.5" fill="#FFF"/>
      <circle cx="66" cy="27" r="2.5" fill="#FFF"/>

      <!-- Baby Krishna Head (Shyama Varna) -->
      <ellipse cx="60" cy="56" rx="33" ry="30" fill="url(#krishnaSkin)"/>

      <!-- Curly Hair Locks -->
      <path d="M 30 46 C 24 55 26 70 34 68 C 30 60 35 52 35 48 Z" fill="#0F172A"/>
      <path d="M 90 46 C 96 55 94 70 86 68 C 90 60 85 52 85 48 Z" fill="#0F172A"/>

      <!-- Golden Tilak with Kasturi / Chandan & Red Kumkum -->
      <path d="M 55 38 L 65 38 L 62 50 C 60 52 58 52 58 50 Z" fill="#FEF08A"/>
      <line x1="60" y1="40" x2="60" y2="48" stroke="#DC2626" stroke-width="2.5" stroke-linecap="round"/>

      <!-- Big Lotus Petal Eyes (Kamala Nayana) -->
      <ellipse cx="48" cy="54" rx="6.5" ry="7.5" fill="#0F172A"/>
      <circle cx="46" cy="52" r="2.6" fill="#FFF"/>
      <circle cx="50" cy="56" r="1.3" fill="#FFF"/>
      <ellipse cx="72" cy="54" rx="6.5" ry="7.5" fill="#0F172A"/>
      <circle cx="70" cy="52" r="2.6" fill="#FFF"/>
      <circle cx="74" cy="56" r="1.3" fill="#FFF"/>

      <!-- Rosy Blessed Cheeks -->
      <ellipse cx="38" cy="62" rx="6" ry="4" fill="#F472B6" opacity="0.6"/>
      <ellipse cx="82" cy="62" rx="6" ry="4" fill="#F472B6" opacity="0.6"/>

      <!-- Sweet Nose & Smiling Mouth (Adharam Madhuram) -->
      <circle cx="60" cy="62" r="2.5" fill="#0284C7"/>
      <path d="M 53 68 Q 60 75 67 68" stroke="#BE123C" stroke-width="2.8" fill="none" stroke-linecap="round"/>
      
      <!-- Butter Smudge on Cheek (Makhan Leep) -->
      <ellipse cx="44" cy="68" rx="4.5" ry="3.5" fill="#FFFBEB" opacity="0.95"/>

      <!-- Golden Kundalas (Earrings) -->
      <circle cx="28" cy="58" r="5" fill="url(#goldCrown)"/>
      <circle cx="92" cy="58" r="5" fill="url(#goldCrown)"/>

      <!-- Pearl Necklace (Vaijayanti Mala) -->
      <path d="M 40 82 Q 60 96 80 82" stroke="#FEF9C3" stroke-width="4" stroke-dasharray="2,6" fill="none" stroke-linecap="round"/>
      <circle cx="60" cy="91" r="5" fill="url(#goldCrown)"/>
    </svg>
  `,

  // Gau-Mata (Sacred Mother Cow of Vrindavan)
  gauMata: `
    <svg viewBox="0 0 120 120" class="toddler-svg vedic-cow">
      <defs>
        <radialGradient id="cowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#FFF7ED"/>
        </radialGradient>
      </defs>
      <!-- Decorated Horns with Golden Tips -->
      <path d="M 38 32 Q 26 14 24 22" stroke="#D97706" stroke-width="7" fill="none" stroke-linecap="round"/>
      <circle cx="24" cy="20" r="4.5" fill="#F59E0B"/>
      <path d="M 82 32 Q 94 14 96 22" stroke="#D97706" stroke-width="7" fill="none" stroke-linecap="round"/>
      <circle cx="96" cy="20" r="4.5" fill="#F59E0B"/>

      <!-- Ears with Flowers -->
      <ellipse cx="26" cy="44" rx="12" ry="7" fill="#FFF7ED" transform="rotate(-15 26 44)"/>
      <ellipse cx="94" cy="44" rx="12" ry="7" fill="#FFF7ED" transform="rotate(15 94 44)"/>

      <!-- Head -->
      <ellipse cx="60" cy="58" rx="38" ry="32" fill="url(#cowGrad)"/>

      <!-- Sacred Chandan & Kumkum Tilak -->
      <circle cx="60" cy="42" r="4" fill="#DC2626"/>
      <ellipse cx="60" cy="43" rx="7" ry="1.5" fill="#F59E0B"/>

      <!-- Loving Gentle Eyes with Long Lashes -->
      <ellipse cx="44" cy="52" rx="6" ry="7.5" fill="#3D2817"/>
      <circle cx="42" cy="50" r="2.8" fill="#FFF"/>
      <ellipse cx="76" cy="52" rx="6" ry="7.5" fill="#3D2817"/>
      <circle cx="74" cy="50" r="2.8" fill="#FFF"/>

      <!-- Pink Muzzle -->
      <ellipse cx="60" cy="76" rx="26" ry="16" fill="#FCE7F3"/>
      <circle cx="51" cy="74" r="3.5" fill="#DB2777"/>
      <circle cx="69" cy="74" r="3.5" fill="#DB2777"/>
      <path d="M 52 82 Q 60 88 68 82" stroke="#DB2777" stroke-width="2.5" fill="none" stroke-linecap="round"/>

      <!-- Golden Bell & Marigold Garland (Genda Phool Mala) -->
      <path d="M 32 86 Q 60 110 88 86" stroke="#F59E0B" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="42" cy="94" r="6" fill="#EA580C"/>
      <circle cx="53" cy="99" r="6" fill="#F59E0B"/>
      <circle cx="67" cy="99" r="6" fill="#EA580C"/>
      <circle cx="78" cy="94" r="6" fill="#F59E0B"/>
      <!-- Hanging Brass Bell -->
      <polygon points="56,104 64,104 68,114 52,114" fill="#FBBF24"/>
      <circle cx="60" cy="116" r="3" fill="#D97706"/>
    </svg>
  `,

  // Mayur (Sacred Peacock of Vrindavan)
  mayur: `
    <svg viewBox="0 0 120 120" class="toddler-svg vedic-peacock">
      <defs>
        <radialGradient id="peacockFan" cx="50%" cy="80%" r="70%">
          <stop offset="0%" stop-color="#0D9488"/>
          <stop offset="70%" stop-color="#047857"/>
          <stop offset="100%" stop-color="#064E3B"/>
        </radialGradient>
      </defs>
      <!-- Radiating Tail Feathers -->
      <g>
        <circle cx="28" cy="38" r="11" fill="#0D9488"/>
        <circle cx="28" cy="38" r="6" fill="#38BDF8"/>
        <circle cx="28" cy="38" r="3" fill="#312E81"/>

        <circle cx="46" cy="24" r="12" fill="#0D9488"/>
        <circle cx="46" cy="24" r="6.5" fill="#38BDF8"/>
        <circle cx="46" cy="24" r="3.2" fill="#312E81"/>

        <circle cx="68" cy="20" r="13" fill="#0D9488"/>
        <circle cx="68" cy="20" r="7" fill="#38BDF8"/>
        <circle cx="68" cy="20" r="3.5" fill="#312E81"/>

        <circle cx="90" cy="26" r="12" fill="#0D9488"/>
        <circle cx="90" cy="26" r="6.5" fill="#38BDF8"/>
        <circle cx="90" cy="26" r="3.2" fill="#312E81"/>

        <circle cx="104" cy="42" r="11" fill="#0D9488"/>
        <circle cx="104" cy="42" r="6" fill="#38BDF8"/>
        <circle cx="104" cy="42" r="3" fill="#312E81"/>
      </g>

      <!-- Peacock Crest (Kalangi) -->
      <line x1="56" y1="42" x2="50" y2="30" stroke="#0284C7" stroke-width="2"/>
      <circle cx="50" cy="29" r="3" fill="#0284C7"/>
      <line x1="60" y1="42" x2="60" y2="28" stroke="#0284C7" stroke-width="2"/>
      <circle cx="60" cy="27" r="3.2" fill="#0284C7"/>
      <line x1="64" y1="42" x2="70" y2="30" stroke="#0284C7" stroke-width="2"/>
      <circle cx="70" cy="29" r="3" fill="#0284C7"/>

      <!-- Peacock Royal Blue Body & Graceful Neck -->
      <path d="M 48 85 C 44 65 52 45 60 45 C 68 45 76 65 72 85 Z" fill="#1D4ED8"/>
      <circle cx="60" cy="50" r="14" fill="#2563EB"/>

      <!-- Eyes -->
      <circle cx="55" cy="48" r="3" fill="#FFF"/>
      <circle cx="55" cy="48" r="1.8" fill="#1E1B4B"/>
      <circle cx="65" cy="48" r="3" fill="#FFF"/>
      <circle cx="65" cy="48" r="1.8" fill="#1E1B4B"/>

      <!-- Golden Beak -->
      <polygon points="56,54 64,54 60,62" fill="#F59E0B"/>
    </svg>
  `,

  // Makhan Matka (Sacred Butter Pot)
  makhanMatka: `
    <svg viewBox="0 0 100 100" class="toddler-svg vedic-matka">
      <defs>
        <radialGradient id="clayPot" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#FB923C"/>
          <stop offset="60%" stop-color="#C2410C"/>
          <stop offset="100%" stop-color="#7C2D12"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="62" rx="34" ry="30" fill="url(#clayPot)"/>
      <ellipse cx="50" cy="36" rx="20" ry="7" fill="#9A3412"/>
      <path d="M 22 62 Q 50 78 78 62" stroke="#FFF" stroke-width="3" stroke-dasharray="4,6" fill="none"/>
      <path d="M 28 50 Q 50 62 72 50" stroke="#FEF08A" stroke-width="2.5" fill="none"/>
      <circle cx="50" cy="68" r="4" fill="#FEF08A"/>
      <ellipse cx="50" cy="34" rx="19" ry="8" fill="#FFFBEB"/>
      <path d="M 38 34 C 36 44 44 48 44 40 C 44 48 52 50 54 38 C 56 46 64 44 62 34 Z" fill="#FFFDF0"/>
      <circle cx="50" cy="30" r="7" fill="#FFFFFF"/>
    </svg>
  `,

  // Sacred Aarti Thali (Brass Puja Plate with Diya, Kapoor & Flowers)
  aartiThali: `
    <svg viewBox="0 0 120 120" class="toddler-svg vedic-aarti-thali">
      <defs>
        <radialGradient id="brassPlate" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFFBEB"/>
          <stop offset="60%" stop-color="#FCD34D"/>
          <stop offset="90%" stop-color="#F59E0B"/>
          <stop offset="100%" stop-color="#B45309"/>
        </radialGradient>
        <radialGradient id="aartiFlame" cx="50%" cy="70%" r="60%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="30%" stop-color="#FEF08A"/>
          <stop offset="70%" stop-color="#F97316"/>
          <stop offset="100%" stop-color="#DC2626"/>
        </radialGradient>
      </defs>
      <!-- Glowing Aarti Aura -->
      <circle cx="60" cy="60" r="56" fill="#FEF08A" opacity="0.3"/>
      <!-- Brass Plate Rim -->
      <circle cx="60" cy="60" r="48" fill="url(#brassPlate)" stroke="#B45309" stroke-width="3"/>
      <circle cx="60" cy="60" r="40" fill="none" stroke="#D97706" stroke-width="1.5" stroke-dasharray="3,3"/>
      
      <!-- Center Brass Diya -->
      <ellipse cx="60" cy="62" rx="18" ry="10" fill="#EA580C"/>
      <!-- Flaming Wick -->
      <path d="M 60 38 C 55 46 54 55 60 60 C 66 55 65 46 60 38 Z" fill="url(#aartiFlame)"/>
      <ellipse cx="60" cy="52" rx="2.5" ry="4.5" fill="#FFFFFF"/>

      <!-- Fresh Marigold & Lotus Petals on Plate -->
      <circle cx="40" cy="46" r="6" fill="#F59E0B"/>
      <circle cx="80" cy="46" r="6" fill="#EA580C"/>
      <circle cx="42" cy="74" r="5" fill="#EC4899"/>
      <circle cx="78" cy="74" r="5" fill="#EC4899"/>

      <!-- Sacred Kumkum Cup & Rice -->
      <circle cx="60" cy="78" r="4.5" fill="#DC2626"/>
      <circle cx="60" cy="78" r="2.5" fill="#FEF08A"/>
    </svg>
  `,

  // Sacred Kamal (Divine Pink Lotus)
  kamal: `
    <svg viewBox="0 0 100 100" class="toddler-svg vedic-lotus">
      <path d="M 50 20 C 35 38 30 65 50 78 C 70 65 65 38 50 20 Z" fill="#F472B6"/>
      <path d="M 50 30 C 22 42 16 70 42 78 C 46 72 48 55 50 30 Z" fill="#EC4899"/>
      <path d="M 50 30 C 78 42 84 70 58 78 C 54 72 52 55 50 30 Z" fill="#EC4899"/>
      <path d="M 50 40 C 10 55 18 84 46 80 Z" fill="#DB2777"/>
      <path d="M 50 40 C 90 55 82 84 54 80 Z" fill="#DB2777"/>
      <circle cx="50" cy="65" r="7" fill="#FDE047"/>
      <ellipse cx="50" cy="84" rx="38" ry="8" fill="#10B981" opacity="0.8"/>
    </svg>
  `,

  // Glowing Diya (Sacred Auspicious Lamp)
  diya: `
    <svg viewBox="0 0 100 100" class="toddler-svg vedic-diya">
      <defs>
        <radialGradient id="flameGrad" cx="50%" cy="70%" r="60%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="30%" stop-color="#FDE047"/>
          <stop offset="70%" stop-color="#EA580C"/>
          <stop offset="100%" stop-color="#DC2626"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="38" r="28" fill="#FEF08A" opacity="0.35"/>
      <path d="M 50 16 C 42 28 40 40 50 48 C 60 40 58 28 50 16 Z" fill="url(#flameGrad)"/>
      <ellipse cx="50" cy="38" rx="4" ry="7" fill="#FFFFFF"/>
      <ellipse cx="50" cy="62" rx="36" ry="15" fill="#F59E0B"/>
      <path d="M 14 62 Q 50 86 86 62 Q 50 72 14 62 Z" fill="#D97706"/>
      <circle cx="50" cy="72" r="3" fill="#FEF3C7"/>
    </svg>
  `,

  // Mandir Ghanti (Sacred Temple Bell)
  templeBell: `
    <svg viewBox="0 0 100 100" class="toddler-svg vedic-bell">
      <rect x="47" y="12" width="6" height="24" rx="3" fill="#D97706"/>
      <circle cx="50" cy="12" r="6" fill="#F59E0B"/>
      <path d="M 46 36 C 40 55 24 66 22 76 L 78 76 C 76 66 60 55 54 36 Z" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
      <ellipse cx="50" cy="76" rx="28" ry="8" fill="#FBBF24"/>
      <circle cx="50" cy="84" r="5" fill="#B45309"/>
      <path d="M 14 74 Q 8 80 14 86" stroke="#F59E0B" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 86 74 Q 92 80 86 86" stroke="#F59E0B" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>
  `,

  // Jal Tarang Water Bowl (Udaka-Vadya Art 12)
  jalTarangBowl: `
    <svg viewBox="0 0 100 100" class="toddler-svg vedic-bowl">
      <defs>
        <radialGradient id="porcelainGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="70%" stop-color="#F1F5F9"/>
          <stop offset="100%" stop-color="#CBD5E1"/>
        </radialGradient>
        <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8"/>
          <stop offset="100%" stop-color="#0284C7"/>
        </linearGradient>
      </defs>
      <!-- Porcelain Bowl Body -->
      <path d="M 18 42 C 18 78 32 86 50 86 C 68 86 82 78 82 42 Z" fill="url(#porcelainGrad)" stroke="#94A3B8" stroke-width="2"/>
      <ellipse cx="50" cy="42" rx="32" ry="12" fill="#E2E8F0"/>
      <!-- Pure Yamuna Water Fill with Ripples -->
      <ellipse cx="50" cy="50" rx="27" ry="9" fill="url(#waterGrad)" opacity="0.85"/>
      <ellipse cx="50" cy="50" rx="14" ry="4.5" fill="#BAE6FD" opacity="0.6"/>
      <!-- Golden Rim Decoration -->
      <ellipse cx="50" cy="42" rx="32" ry="12" fill="none" stroke="#F59E0B" stroke-width="2"/>
    </svg>
  `,

  // Little Vrindavan Calf (Bachhda)
  littleCalf: `
    <svg viewBox="0 0 120 120" class="toddler-svg vedic-calf">
      <ellipse cx="60" cy="62" rx="32" ry="26" fill="#FFF7ED"/>
      <!-- Soft Ears -->
      <ellipse cx="32" cy="48" rx="10" ry="5.5" fill="#FED7AA" transform="rotate(-20 32 48)"/>
      <ellipse cx="88" cy="48" rx="10" ry="5.5" fill="#FED7AA" transform="rotate(20 88 48)"/>
      <!-- Cute Eyes -->
      <ellipse cx="46" cy="56" rx="5" ry="6.5" fill="#3D2817"/>
      <circle cx="44" cy="54" r="2.2" fill="#FFF"/>
      <ellipse cx="74" cy="56" rx="5" ry="6.5" fill="#3D2817"/>
      <circle cx="72" cy="54" r="2.2" fill="#FFF"/>
      <!-- Soft Pink Muzzle -->
      <ellipse cx="60" cy="74" rx="20" ry="13" fill="#FCE7F3"/>
      <circle cx="53" cy="72" r="3" fill="#DB2777"/>
      <circle cx="67" cy="72" r="3" fill="#DB2777"/>
      <path d="M 54 78 Q 60 84 66 78" stroke="#DB2777" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Golden Bell on Red Thread -->
      <path d="M 40 84 Q 60 98 80 84" stroke="#DC2626" stroke-width="3" fill="none"/>
      <circle cx="60" cy="94" r="4.5" fill="#F59E0B"/>
    </svg>
  `
};

if (typeof window !== 'undefined') {
  window.VedicAssets = VedicAssets;
}

// =========================================================================
// ADDITIONAL SACRED SVG ASSETS (Vrindavan Animal Sanctuary & Churner)
// =========================================================================

// Large Interactive Gau-Mata Avatar with Ringing Bell
VedicAssets.gauMataLarge = `
  <svg viewBox="0 0 160 160" class="toddler-svg vedic-cow-large" id="svg-gau-mata">
    <defs>
      <radialGradient id="cowHeadGrad" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="85%" stop-color="#FFF7ED"/>
        <stop offset="100%" stop-color="#FED7AA"/>
      </radialGradient>
      <radialGradient id="goldBellGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FEF08A"/>
        <stop offset="60%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#B45309"/>
      </radialGradient>
    </defs>

    <!-- Golden Horns with Sacred Ornaments -->
    <path d="M 45 42 Q 28 14 24 26" stroke="#D97706" stroke-width="10" fill="none" stroke-linecap="round"/>
    <circle cx="24" cy="24" r="6.5" fill="#FBBF24"/>
    <path d="M 115 42 Q 132 14 136 26" stroke="#D97706" stroke-width="10" fill="none" stroke-linecap="round"/>
    <circle cx="136" cy="24" r="6.5" fill="#FBBF24"/>

    <!-- Soft Drooping Ears with Ear-flowers -->
    <ellipse cx="28" cy="62" rx="16" ry="10" fill="#FFF7ED" stroke="#FED7AA" stroke-width="2" transform="rotate(-15 28 62)"/>
    <circle cx="20" cy="58" r="4.5" fill="#EC4899"/>
    <ellipse cx="132" cy="62" rx="16" ry="10" fill="#FFF7ED" stroke="#FED7AA" stroke-width="2" transform="rotate(15 132 62)"/>
    <circle cx="140" cy="58" r="4.5" fill="#EC4899"/>

    <!-- Gentle Cow Head -->
    <ellipse cx="80" cy="80" rx="52" ry="44" fill="url(#cowHeadGrad)" stroke="#FED7AA" stroke-width="2"/>

    <!-- Sacred Red Chandan & Kumkum Tilak -->
    <circle cx="80" cy="58" r="5" fill="#DC2626"/>
    <ellipse cx="80" cy="60" rx="9" ry="2" fill="#F59E0B"/>

    <!-- Loving Big Eyes with Eyelashes -->
    <ellipse cx="56" cy="72" rx="8" ry="9.5" fill="#2E1805"/>
    <circle cx="53" cy="69" r="3.5" fill="#FFF"/>
    <ellipse cx="104" cy="72" rx="8" ry="9.5" fill="#2E1805"/>
    <circle cx="101" cy="69" r="3.5" fill="#FFF"/>

    <!-- Big Soft Pink Muzzle -->
    <ellipse cx="80" cy="104" rx="36" ry="22" fill="#FCE7F3" stroke="#F472B6" stroke-width="2"/>
    <circle cx="68" cy="100" r="4.5" fill="#DB2777"/>
    <circle cx="92" cy="100" r="4.5" fill="#DB2777"/>
    <path d="M 68 112 Q 80 120 92 112" stroke="#DB2777" stroke-width="3" fill="none" stroke-linecap="round"/>

    <!-- Marigold Garland (Genda Mala) -->
    <path d="M 40 122 Q 80 152 120 122" stroke="#F59E0B" stroke-width="8" fill="none" stroke-linecap="round"/>
    <circle cx="52" cy="132" r="8" fill="#EA580C"/>
    <circle cx="66" cy="139" r="8" fill="#F59E0B"/>
    <circle cx="80" cy="141" r="8.5" fill="#EA580C"/>
    <circle cx="94" cy="139" r="8" fill="#F59E0B"/>
    <circle cx="108" cy="132" r="8" fill="#EA580C"/>

    <!-- Ringing Brass Bell (Clickable!) -->
    <g class="interactive-cow-bell" id="cow-bell-group" style="cursor: pointer;">
      <polygon points="74,142 86,142 92,156 68,156" fill="url(#goldBellGlow)" stroke="#B45309" stroke-width="1.5"/>
      <circle cx="80" cy="158" r="4" fill="#92400E"/>
    </g>
  </svg>
`;

// Yashoda Maiya's Butter Churner (Dahi Mathani in Earthen Pot)
VedicAssets.dahiMathani = `
  <svg viewBox="0 0 120 120" class="toddler-svg vedic-churner">
    <!-- Earthen Pot Body -->
    <ellipse cx="60" cy="80" rx="42" ry="34" fill="#C2410C" stroke="#7C2D12" stroke-width="2"/>
    <ellipse cx="60" cy="52" rx="26" ry="9" fill="#9A3412"/>
    <!-- Fresh Frothy White Butter -->
    <ellipse cx="60" cy="50" rx="25" ry="8" fill="#FFFDF0"/>
    <circle cx="52" cy="46" r="6" fill="#FFFFFF"/>
    <circle cx="68" cy="47" r="5" fill="#FFFFFF"/>
    <circle cx="60" cy="44" r="7" fill="#FFFFFF"/>

    <!-- Wooden Churner Rod (Mathani) -->
    <rect x="56" y="10" width="8" height="52" rx="4" fill="#EAB308" stroke="#A16207" stroke-width="1.5"/>
    <ellipse cx="60" cy="12" rx="7" ry="3" fill="#CA8A04"/>

    <!-- Churning Ropes (Neti) -->
    <path d="M 40 32 Q 56 36 60 32 Q 64 28 80 32" stroke="#DC2626" stroke-width="3" fill="none"/>
    <path d="M 38 36 Q 56 40 60 36 Q 64 32 82 36" stroke="#FEF08A" stroke-width="2.5" fill="none"/>

    <!-- Butter Splatters -->
    <circle cx="34" cy="52" r="3" fill="#FFFDF0"/>
    <circle cx="86" cy="52" r="3" fill="#FFFDF0"/>
  </svg>
`;

// Baby Krishna's Golden Lotus Footprints (Charan Paduka)
VedicAssets.goldenFootprint = `
  <svg viewBox="0 0 80 80" class="toddler-svg vedic-footprint">
    <!-- Heel and Sole -->
    <path d="M 36 34 C 28 34 26 50 30 62 C 34 72 46 72 48 62 C 52 48 44 34 36 34 Z" fill="#F59E0B" opacity="0.85"/>
    <!-- Toes -->
    <circle cx="28" cy="26" r="4.5" fill="#F59E0B"/>
    <circle cx="36" cy="24" r="5" fill="#F59E0B"/>
    <circle cx="44" cy="25" r="4.5" fill="#F59E0B"/>
    <circle cx="50" cy="28" r="4" fill="#F59E0B"/>
    <circle cx="55" cy="33" r="3.2" fill="#F59E0B"/>
    <!-- Sacred Lotus Mark on Sole -->
    <circle cx="39" cy="52" r="3" fill="#DC2626"/>
  </svg>
`;

// Shuka (Sacred Vrindavan Green Parrot - Vidhya 42)
VedicAssets.shukaParrot = `
  <svg viewBox="0 0 100 100" class="toddler-svg vedic-parrot">
    <!-- Body -->
    <ellipse cx="50" cy="54" rx="24" ry="28" fill="#10B981"/>
    <!-- Tail Feathers -->
    <path d="M 44 76 L 38 98 L 52 82 Z" fill="#059669"/>
    <path d="M 52 76 L 56 100 L 60 82 Z" fill="#047857"/>
    <!-- Wing -->
    <path d="M 32 48 C 28 62 36 74 48 72 C 38 68 36 56 38 48 Z" fill="#059669"/>
    <!-- Head -->
    <circle cx="58" cy="38" r="18" fill="#10B981"/>
    <!-- Red Neck Ring (Kanthi) -->
    <path d="M 46 44 Q 58 52 70 44" stroke="#DC2626" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Eye -->
    <circle cx="64" cy="34" r="4" fill="#FFF"/>
    <circle cx="64" cy="34" r="2.2" fill="#1F2937"/>
    <!-- Curved Red Beak -->
    <path d="M 72 32 C 84 32 86 44 74 46 C 76 40 76 36 72 32 Z" fill="#EF4444"/>
    <path d="M 72 44 C 78 44 78 48 72 48 Z" fill="#DC2626"/>
  </svg>
`;

// Sacred Tulsi Dal (Holy Basil Leaves)
VedicAssets.tulsiLeaf = `
  <svg viewBox="0 0 100 100" class="toddler-svg vedic-tulsi">
    <!-- Stem -->
    <path d="M 50 85 Q 50 50 50 20" stroke="#047857" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <!-- Center Top Leaves -->
    <path d="M 50 20 C 42 12 50 2 50 2 C 50 2 58 12 50 20 Z" fill="#10B981"/>
    <circle cx="50" cy="8" r="2" fill="#84CC16"/>
    <!-- Left Leaves -->
    <path d="M 50 36 C 36 30 30 40 32 46 C 38 48 46 44 50 36 Z" fill="#059669"/>
    <path d="M 50 56 C 32 50 24 64 28 72 C 36 74 46 68 50 56 Z" fill="#10B981"/>
    <!-- Right Leaves -->
    <path d="M 50 36 C 64 30 70 40 68 46 C 62 48 54 44 50 36 Z" fill="#059669"/>
    <path d="M 50 56 C 68 50 76 64 72 72 C 64 74 54 68 50 56 Z" fill="#10B981"/>
    <!-- Tulsi Manjari (Seed Spikes) -->
    <circle cx="50" cy="14" r="2" fill="#D97706"/>
    <circle cx="50" cy="18" r="2" fill="#D97706"/>
  </svg>
`;

// Auspicious Sudarshana Chakra (Divine Discus)
VedicAssets.sudarshanChakra = `
  <svg viewBox="0 0 100 100" class="toddler-svg vedic-chakra">
    <defs>
      <radialGradient id="chakraGold" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FEF08A"/>
        <stop offset="40%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#D97706"/>
      </radialGradient>
    </defs>
    <!-- Outer Flame Halo -->
    <circle cx="50" cy="50" r="46" fill="#FEF08A" opacity="0.3"/>
    <!-- Outer Rim with Teeth -->
    <circle cx="50" cy="50" r="40" fill="url(#chakraGold)" stroke="#B45309" stroke-width="2"/>
    <circle cx="50" cy="50" r="32" fill="#FFFDF5" stroke="#D97706" stroke-width="2"/>
    <!-- 8 Spokes -->
    <g stroke="#EA580C" stroke-width="3" stroke-linecap="round">
      <line x1="50" y1="18" x2="50" y2="82"/>
      <line x1="18" y1="50" x2="82" y2="50"/>
      <line x1="27" y1="27" x2="73" y2="73"/>
      <line x1="27" y1="73" x2="73" y2="27"/>
    </g>
    <!-- Center Gem -->
    <circle cx="50" cy="50" r="10" fill="#DC2626"/>
    <circle cx="50" cy="50" r="5" fill="#FEF08A"/>
  </svg>
`;

// Mangal Kalash (Auspicious Pot with Coconut and Mango Leaves)
VedicAssets.mangalKalash = `
  <svg viewBox="0 0 100 100" class="toddler-svg vedic-kalash">
    <!-- Mango Leaves Behind Coconut -->
    <path d="M 50 36 L 30 18 C 34 26 40 34 50 36 Z" fill="#10B981"/>
    <path d="M 50 36 L 70 18 C 66 26 60 34 50 36 Z" fill="#10B981"/>
    <path d="M 50 36 L 50 10 C 46 20 48 28 50 36 Z" fill="#059669"/>
    <!-- Coconut (Nariyal) -->
    <ellipse cx="50" cy="30" rx="14" ry="16" fill="#78350F"/>
    <circle cx="48" cy="26" r="1.5" fill="#451A03"/>
    <circle cx="53" cy="26" r="1.5" fill="#451A03"/>
    <circle cx="50" cy="32" r="1.5" fill="#451A03"/>
    <!-- Brass/Copper Kalash Pot -->
    <ellipse cx="50" cy="72" rx="32" ry="22" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
    <ellipse cx="50" cy="46" rx="20" ry="7" fill="#FBBF24" stroke="#B45309" stroke-width="1.5"/>
    <!-- Red Sacred Thread (Mauli) & Swastik -->
    <path d="M 24 70 Q 50 82 76 70" stroke="#DC2626" stroke-width="3" fill="none"/>
    <circle cx="50" cy="68" r="4" fill="#DC2626"/>
  </svg>
`;

// Chandan Tilak (Urdhva Pundra with Kasturi Kumkum)
VedicAssets.chandanTilak = `
  <svg viewBox="0 0 100 100" class="toddler-svg vedic-tilak">
    <!-- Aura Glow -->
    <circle cx="50" cy="50" r="42" fill="#FEF08A" opacity="0.3"/>
    <!-- White / Yellow Sandalwood U-shape -->
    <path d="M 38 20 L 44 20 L 46 64 C 48 74 52 74 54 64 L 56 20 L 62 20 L 60 66 C 58 84 42 84 40 66 Z" fill="#FEF08A" stroke="#F59E0B" stroke-width="2"/>
    <!-- Center Red Kumkum Line -->
    <line x1="50" y1="24" x2="50" y2="70" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>
    <!-- Lotus Base Leaf -->
    <path d="M 40 76 Q 50 88 60 76 Q 50 80 40 76 Z" fill="#F59E0B"/>
  </svg>
`;

// Agarbatti (Sacred Incense Stick with Fragrant Smoke)
VedicAssets.agarbatti = `
  <svg viewBox="0 0 100 100" class="toddler-svg vedic-agarbatti">
    <!-- Stand -->
    <ellipse cx="50" cy="85" rx="28" ry="8" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
    <circle cx="50" cy="84" r="5" fill="#D97706"/>
    <!-- Stick -->
    <line x1="50" y1="84" x2="50" y2="35" stroke="#78350F" stroke-width="3.5" stroke-linecap="round"/>
    <!-- Burning Ember -->
    <circle cx="50" cy="34" r="3" fill="#EF4444"/>
    <circle cx="50" cy="34" r="1.5" fill="#FEF08A"/>
    <!-- Fragrant Swirling Smoke -->
    <path d="M 50 32 Q 42 22 54 14 Q 44 6 52 2" stroke="#E2E8F0" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.75"/>
  </svg>
`;

// Manjira / Khartal (Sacred Brass Hand Cymbals)
VedicAssets.manjira = `
  <svg viewBox="0 0 100 100" class="toddler-svg vedic-manjira">
    <defs>
      <radialGradient id="brassCymbal" cx="45%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#FEF08A"/>
        <stop offset="60%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#B45309"/>
      </radialGradient>
    </defs>
    <!-- Left Cymbal -->
    <g transform="translate(10, 20) rotate(-15)">
      <ellipse cx="30" cy="40" rx="20" ry="14" fill="url(#brassCymbal)" stroke="#B45309" stroke-width="1.5"/>
      <ellipse cx="30" cy="38" rx="8" ry="5" fill="#FEF08A"/>
      <circle cx="30" cy="38" r="2.5" fill="#78350F"/>
    </g>
    <!-- Right Cymbal -->
    <g transform="translate(45, 25) rotate(15)">
      <ellipse cx="30" cy="40" rx="20" ry="14" fill="url(#brassCymbal)" stroke="#B45309" stroke-width="1.5"/>
      <ellipse cx="30" cy="38" rx="8" ry="5" fill="#FEF08A"/>
      <circle cx="30" cy="38" r="2.5" fill="#78350F"/>
    </g>
    <!-- Red Connecting Ribbon / Tassel -->
    <path d="M 38 42 Q 52 24 66 45" stroke="#DC2626" stroke-width="3" fill="none"/>
    <circle cx="52" cy="29" r="4" fill="#EF4444"/>
  </svg>
`;

// Large Interactive Baby Krishna Avatar for Shringar & Dressing Leela
VedicAssets.krishnaShringarAvatar = `
  <svg viewBox="0 0 200 220" class="toddler-svg vedic-shringar-krishna" id="shringar-avatar-svg">
    <defs>
      <radialGradient id="krishnaBodyGrad" cx="45%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#BAE6FD"/>
        <stop offset="50%" stop-color="#38BDF8"/>
        <stop offset="100%" stop-color="#0284C7"/>
      </radialGradient>
      <radialGradient id="shringarGold" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FEF08A"/>
        <stop offset="60%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#D97706"/>
      </radialGradient>
    </defs>

    <!-- Divine Golden Aura Behind Kanha -->
    <circle cx="100" cy="90" r="82" fill="#FEF08A" opacity="0.35"/>
    <circle cx="100" cy="90" r="72" fill="#FDE047" opacity="0.2"/>

    <!-- Yellow Pitambara Dhoti Body -->
    <path d="M 65 140 C 50 170 55 205 78 210 C 95 212 105 195 100 175 C 95 195 105 212 122 210 C 145 205 150 170 135 140 Z" fill="#FBBF24" stroke="#D97706" stroke-width="2.5"/>
    <path d="M 75 160 Q 100 175 125 160" stroke="#DC2626" stroke-width="3" fill="none"/>

    <!-- Toddler Little Arms -->
    <g id="arm-left">
      <path d="M 68 128 C 45 135 38 152 48 162 C 58 170 68 152 75 142 Z" fill="url(#krishnaBodyGrad)"/>
      <ellipse cx="46" cy="158" rx="7" ry="6" fill="#38BDF8"/>
      <circle cx="70" cy="135" r="4.5" fill="url(#shringarGold)"/> <!-- Bajuband -->
    </g>

    <g id="arm-right">
      <path d="M 132 128 C 155 135 162 152 152 162 C 142 170 132 152 125 142 Z" fill="url(#krishnaBodyGrad)"/>
      <ellipse cx="154" cy="158" rx="7" ry="6" fill="#38BDF8"/>
      <circle cx="130" cy="135" r="4.5" fill="url(#shringarGold)"/> <!-- Bajuband -->
    </g>

    <!-- Chubby Baby Torso -->
    <ellipse cx="100" cy="136" rx="34" ry="28" fill="url(#krishnaBodyGrad)"/>
    <!-- Cute Navel (Tundila) -->
    <circle cx="100" cy="144" r="2.5" fill="#0369A1"/>

    <!-- Topknot Hair Juda -->
    <circle cx="100" cy="42" r="22" fill="#0F172A"/>
    <circle cx="94" cy="34" r="3.5" fill="#FFF"/>
    <circle cx="102" cy="32" r="3.5" fill="#FFF"/>
    <circle cx="108" cy="36" r="3.5" fill="#FFF"/>

    <!-- Head -->
    <ellipse cx="100" cy="85" rx="46" ry="42" fill="url(#krishnaBodyGrad)"/>

    <!-- Soft Curly Locks on Shoulders -->
    <path d="M 58 70 C 48 85 52 108 62 104 C 56 94 62 80 64 74 Z" fill="#0F172A"/>
    <path d="M 142 70 C 152 85 148 108 138 104 C 144 94 138 80 136 74 Z" fill="#0F172A"/>

    <!-- Big Sparkly Lotus Eyes -->
    <ellipse cx="82" cy="82" rx="9" ry="10" fill="#0F172A"/>
    <circle cx="79" cy="78" r="3.6" fill="#FFF"/>
    <circle cx="85" cy="84" r="1.8" fill="#FFF"/>
    <ellipse cx="118" cy="82" rx="9" ry="10" fill="#0F172A"/>
    <circle cx="115" cy="78" r="3.6" fill="#FFF"/>
    <circle cx="121" cy="84" r="1.8" fill="#FFF"/>

    <!-- Rosy Cheeks -->
    <ellipse cx="68" cy="94" rx="9" ry="6" fill="#F472B6" opacity="0.6"/>
    <ellipse cx="132" cy="94" rx="9" ry="6" fill="#F472B6" opacity="0.6"/>

    <!-- Cute Nose & Big Sweet Smile -->
    <circle cx="100" cy="94" r="3.2" fill="#0284C7"/>
    <path d="M 90 102 Q 100 114 110 102" stroke="#BE123C" stroke-width="3.5" fill="none" stroke-linecap="round"/>

    <!-- ADORNMENT LAYERS (Toggled by class active) -->
    
    <!-- 1. Mor Pankh (Feather) -->
    <g id="layer-mor-pankh" class="shringar-layer hidden" transform="translate(112, 10) rotate(22)">
      <path d="M 0 45 C -20 32 -24 6 0 0 C 24 6 20 32 0 45 Z" fill="#059669" stroke="#10B981" stroke-width="2"/>
      <ellipse cx="0" cy="20" rx="9" ry="14" fill="#38BDF8"/>
      <ellipse cx="0" cy="20" rx="5" ry="8" fill="#4338CA"/>
      <circle cx="0" cy="20" r="3" fill="#D97706"/>
      <line x1="0" y1="45" x2="0" y2="60" stroke="#047857" stroke-width="2.5" stroke-linecap="round"/>
    </g>

    <!-- 2. Chandan Tilak -->
    <g id="layer-tilak" class="shringar-layer hidden">
      <path d="M 94 60 L 106 60 L 103 76 C 100 79 97 79 97 76 Z" fill="#FEF08A"/>
      <line x1="100" y1="62" x2="100" y2="74" stroke="#DC2626" stroke-width="3.5" stroke-linecap="round"/>
    </g>

    <!-- 3. Kundalas (Earrings) -->
    <g id="layer-kundal" class="shringar-layer hidden">
      <circle cx="56" cy="88" r="7" fill="url(#shringarGold)" stroke="#B45309" stroke-width="1.5"/>
      <circle cx="56" cy="98" r="4" fill="#FEF08A"/>
      <circle cx="144" cy="88" r="7" fill="url(#shringarGold)" stroke="#B45309" stroke-width="1.5"/>
      <circle cx="144" cy="98" r="4" fill="#FEF08A"/>
    </g>

    <!-- 4. Vaijayanti Mala (Necklace) -->
    <g id="layer-mala" class="shringar-layer hidden">
      <path d="M 72 120 Q 100 148 128 120" stroke="#FEF9C3" stroke-width="6" stroke-dasharray="3,7" fill="none" stroke-linecap="round"/>
      <circle cx="100" cy="140" r="7.5" fill="url(#shringarGold)"/>
      <circle cx="100" cy="140" r="3" fill="#DC2626"/>
      <circle cx="86" cy="132" r="5" fill="#EC4899"/>
      <circle cx="114" cy="132" r="5" fill="#EC4899"/>
    </g>

    <!-- 5. Divya Bansuri (Flute in hands) -->
    <g id="layer-bansuri" class="shringar-layer hidden" transform="translate(42, 132) rotate(-12)">
      <rect x="0" y="0" width="125" height="11" rx="5.5" fill="#D97706" stroke="#92400E" stroke-width="1.5"/>
      <circle cx="20" cy="5.5" r="2" fill="#78350F"/>
      <circle cx="40" cy="5.5" r="2" fill="#78350F"/>
      <circle cx="60" cy="5.5" r="2" fill="#78350F"/>
      <circle cx="80" cy="5.5" r="2" fill="#78350F"/>
      <circle cx="100" cy="5.5" r="2" fill="#78350F"/>
      <!-- Peacock Feather Tassel on Flute -->
      <path d="M 120 5 L 132 18 L 126 22 Z" fill="#10B981"/>
      <circle cx="127" cy="14" r="3" fill="#DC2626"/>
    </g>

    <!-- 6. Makhan Smudge on Cheek -->
    <g id="layer-makhan" class="shringar-layer hidden">
      <ellipse cx="78" cy="98" rx="7" ry="5.5" fill="#FFFDF0" opacity="0.95"/>
      <circle cx="84" cy="94" r="3" fill="#FFFFFF"/>
    </g>
  </svg>
`;

// Attach to window object for global access across scripts
if (typeof window !== 'undefined') {
  window.VedicAssets = VedicAssets;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VedicAssets;
}

