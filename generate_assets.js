import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const outDir1 = path.join(process.cwd(), 'src/imagens');
const outDir2 = path.join(process.cwd(), 'public/src/imagens');

[outDir1, outDir2].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// 1. Assga_foto.jpg - Official Crest SVG
const svgAssgaLogo = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="600" height="750">
  <defs>
    <linearGradient id="shieldBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b2866"/>
      <stop offset="100%" stop-color="#001845"/>
    </linearGradient>
    <linearGradient id="redGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#d90429"/>
      <stop offset="100%" stop-color="#9d0208"/>
    </linearGradient>
    <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0077b6"/>
      <stop offset="100%" stop-color="#023e8a"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Base Shield Outline -->
  <path d="M 80,40 L 520,40 C 520,380 460,560 300,640 C 140,560 80,380 80,40 Z" fill="url(#shieldBg)" stroke="#ffffff" stroke-width="12" filter="url(#shadow)"/>

  <!-- Top Red Header Bar with ASSGA -->
  <path d="M 80,40 L 520,40 L 520,130 L 80,130 Z" fill="url(#redGrad)" stroke="#ffffff" stroke-width="4"/>
  <text x="300" y="112" font-family="Arial Black, Impact, sans-serif" font-size="78" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="8">ASSGA</text>

  <!-- Central Red Column with White Borders -->
  <rect x="250" y="130" width="100" height="380" fill="url(#redGrad)" stroke="#ffffff" stroke-width="8"/>

  <!-- Rooster of São Gonçalo do Amarante (Galo estilizado) -->
  <g transform="translate(300, 240)">
    <!-- Rooster Body -->
    <path d="M -30,-45 C -45,-30 -40,10 -15,30 C 0,40 20,35 30,15 C 38,-5 30,-30 15,-40 C 5,-50 -15,-55 -30,-45 Z" fill="#ffffff" stroke="#111" stroke-width="2"/>
    <!-- Crest / Crista -->
    <path d="M -15,-58 C -18,-70 -5,-72 0,-62 C 5,-72 15,-68 12,-55 Z" fill="#d90429"/>
    <!-- Beak -->
    <path d="M 28,-38 L 46,-32 L 28,-24 Z" fill="#ffb703"/>
    <!-- Floral ornament on rooster -->
    <circle cx="2" cy="-5" r="7" fill="#d90429"/>
    <circle cx="-12" cy="5" r="6" fill="#0077b6"/>
    <circle cx="12" cy="12" r="5" fill="#d90429"/>
  </g>

  <!-- Hands signing in Libras (Configuração manual do sinal) -->
  <!-- Left Hand (pointing thumb to right) -->
  <g transform="translate(200, 410)">
    <path d="M -90,130 L -90,20 C -90,-20 -20,-20 -20,20 L -20,130 Z" fill="#ffddb0" stroke="#111" stroke-width="4"/>
    <path d="M -30,40 L 50,40 C 65,40 65,70 50,70 L -30,70 Z" fill="#ffddb0" stroke="#111" stroke-width="4"/>
    <!-- Fingers folded -->
    <rect x="-85" y="-10" width="60" height="40" rx="10" fill="#f4c997" stroke="#111" stroke-width="3"/>
    <line x1="-70" y1="5" x2="-35" y2="5" stroke="#333" stroke-width="3"/>
    <line x1="-70" y1="20" x2="-35" y2="20" stroke="#333" stroke-width="3"/>
  </g>

  <!-- Right Hand (pinching / pointing in Libras) -->
  <g transform="translate(390, 410)">
    <path d="M 90,130 L 90,20 C 90,-20 20,-20 20,20 L 20,130 Z" fill="#ffddb0" stroke="#111" stroke-width="4"/>
    <!-- Pointing index and thumb forming G / S sign in Libras -->
    <path d="M 15,-10 L -45,-30 C -60,-35 -65,-5 -45,5 L 15,20 Z" fill="#ffddb0" stroke="#111" stroke-width="4"/>
    <path d="M 20,20 L -30,35 C -45,40 -40,65 -20,60 L 20,45 Z" fill="#ffddb0" stroke="#111" stroke-width="4"/>
  </g>

  <!-- Water Waves at the Bottom of the Shield -->
  <g transform="translate(80, 480)">
    <path d="M 0,0 C 70,-20 140,20 210,0 C 280,-20 350,20 440,0 L 440,160 C 370,120 220,160 220,160 C 220,160 70,120 0,160 Z" fill="url(#waterGrad)"/>
    <!-- Wave ripples in white -->
    <path d="M 40,30 Q 70,10 100,30 Q 130,50 160,30" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
    <path d="M 180,30 Q 210,10 240,30 Q 270,50 300,30" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
    <path d="M 320,30 Q 350,10 380,30 Q 410,50 440,30" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
    <path d="M 80,70 Q 120,50 160,70 Q 200,90 240,70" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
    <path d="M 260,70 Q 300,50 340,70 Q 380,90 420,70" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
  </g>

  <!-- Lower Ribbon / Faixa Vermelha Curvada -->
  <g transform="translate(300, 680)">
    <!-- Ribbon ends -->
    <path d="M -290,-30 L -240,-70 L -240,0 L -290,-10 Z" fill="#7a0105"/>
    <path d="M 290,-30 L 240,-70 L 240,0 L 290,-10 Z" fill="#7a0105"/>
    <!-- Ribbon Main Body -->
    <path d="M -260,-45 Q 0,20 260,-45 L 250,20 Q 0,85 -250,20 Z" fill="url(#redGrad)" stroke="#ffffff" stroke-width="4"/>
    <text x="0" y="-12" font-family="Arial, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle">Fundada em 23/07/2024</text>
    <text x="0" y="16" font-family="Arial Black, Impact, sans-serif" font-size="14" font-weight="800" fill="#ffd700" text-anchor="middle" letter-spacing="1">ASSOCIAÇÃO DE SURDOS DE SÃO GONÇALO DO AMARANTE</text>
  </g>
</svg>
`;

// 2. halloween-assga.jpeg - Poster Oficial
const svgHalloween = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 1050" width="700" height="1050">
  <defs>
    <radialGradient id="moonGlow" cx="70%" cy="15%" r="60%">
      <stop offset="0%" stop-color="#fff8cc"/>
      <stop offset="25%" stop-color="#ffd166"/>
      <stop offset="50%" stop-color="#e06d00"/>
      <stop offset="80%" stop-color="#2a0845"/>
      <stop offset="100%" stop-color="#0d0221"/>
    </radialGradient>
    <linearGradient id="woodSign" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7f4f24"/>
      <stop offset="50%" stop-color="#936639"/>
      <stop offset="100%" stop-color="#582f0e"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background Sky with Spooky Castle & Glowing Moon -->
  <rect width="700" height="1050" fill="url(#moonGlow)"/>

  <!-- Big Glowing Moon -->
  <circle cx="530" cy="170" r="110" fill="#fffbe0" opacity="0.9" filter="url(#glow)"/>
  
  <!-- Spider Web in corners -->
  <path d="M 0,0 L 150,0 M 0,0 L 120,60 M 0,0 L 60,120 M 0,0 L 0,150" stroke="#ffffff" stroke-width="2" opacity="0.3"/>
  <path d="M 700,0 L 550,0 M 700,0 L 580,60 M 700,0 L 640,120 M 700,0 L 700,150" stroke="#ffffff" stroke-width="2" opacity="0.3"/>

  <!-- Bats flying in the moonlight -->
  <path d="M 450,120 Q 465,100 480,120 Q 495,100 510,120 Q 480,140 450,120 Z" fill="#000"/>
  <path d="M 520,80 Q 532,65 545,80 Q 557,65 570,80 Q 545,95 520,80 Z" fill="#000"/>

  <!-- Spooky Haunted Castle Silhouette -->
  <g transform="translate(560, 240)" fill="#10051a">
    <rect x="-40" y="0" width="80" height="180"/>
    <polygon points="-40,0 0,-90 40,0"/>
    <rect x="-80" y="40" width="40" height="140"/>
    <polygon points="-80,40 -60,-20 -40,40"/>
    <rect x="40" y="60" width="30" height="120"/>
    <polygon points="40,60 55,0 70,60"/>
    <!-- Yellow glowing windows -->
    <rect x="-15" y="40" width="30" height="40" rx="15" fill="#ffd166"/>
    <rect x="-70" y="80" width="20" height="30" rx="10" fill="#ffd166"/>
  </g>

  <!-- Top Left Badge: ASSGA Crest -->
  <g transform="translate(40, 30) scale(0.24)">
    <rect width="400" height="500" rx="30" fill="#002855" stroke="#ffffff" stroke-width="12"/>
    <rect width="400" height="120" fill="#d90429"/>
    <text x="200" y="90" font-family="Arial Black, sans-serif" font-size="75" fill="#fff" text-anchor="middle">ASSGA</text>
    <text x="200" y="320" font-family="Arial, sans-serif" font-size="110" fill="#fff" text-anchor="middle">🤟</text>
    <rect y="420" width="400" height="80" fill="#d90429"/>
    <text x="200" y="470" font-family="Arial, sans-serif" font-size="32" fill="#fff" text-anchor="middle">23/07/2024</text>
  </g>

  <!-- Title: FESTA DE HALLOWEEN DO ASSGA -->
  <text x="450" y="85" font-family="Impact, Arial Black, sans-serif" font-size="44" fill="#ffffff" text-anchor="middle" letter-spacing="3" filter="url(#glow)">FESTA DE</text>
  
  <g transform="translate(450, 190)">
    <text x="0" y="0" font-family="Impact, Arial Black, sans-serif" font-size="94" fill="#ff7b00" stroke="#000000" stroke-width="6" text-anchor="middle" letter-spacing="2">HALLOWEEN</text>
    <text x="0" y="70" font-family="Impact, Arial Black, sans-serif" font-size="48" fill="#ffd166" stroke="#000000" stroke-width="4" text-anchor="middle" letter-spacing="4">DO</text>
    <text x="0" y="160" font-family="Impact, Arial Black, sans-serif" font-size="98" fill="#ff5400" stroke="#000000" stroke-width="8" text-anchor="middle" letter-spacing="4">ASSGA</text>
  </g>

  <!-- Friendly Ghost with Libras Sign (🤟) -->
  <g transform="translate(130, 420)">
    <!-- Ghost Body -->
    <path d="M -60,0 C -60,-80 60,-80 60,0 C 60,70 80,100 60,110 C 40,120 20,95 0,110 C -20,95 -40,120 -60,110 C -80,100 -60,70 -60,0 Z" fill="#ffffff" filter="url(#glow)"/>
    <!-- Ghost Face -->
    <ellipse cx="-20" cy="-20" rx="10" ry="16" fill="#111"/>
    <ellipse cx="20" cy="-20" rx="10" ry="16" fill="#111"/>
    <ellipse cx="-16" cy="-24" rx="4" ry="5" fill="#fff"/>
    <ellipse cx="24" cy="-24" rx="4" ry="5" fill="#fff"/>
    <ellipse cx="0" cy="15" rx="14" ry="20" fill="#d90429"/>
    <!-- Pink Cheeks -->
    <circle cx="-38" cy="0" r="10" fill="#ffb4a2" opacity="0.8"/>
    <circle cx="38" cy="0" r="10" fill="#ffb4a2" opacity="0.8"/>
    <!-- Ghost Hands doing Libras ILY Sign (🤟) -->
    <text x="-90" y="-10" font-size="54">🤟</text>
    <text x="60" y="-10" font-size="54">🤟</text>
  </g>

  <!-- Event Dates Banner -->
  <g transform="translate(350, 430)">
    <rect x="-310" y="-20" width="620" height="90" rx="20" fill="#000814" stroke="#ff7b00" stroke-width="4"/>
    <text x="0" y="24" font-family="Arial Black, sans-serif" font-size="34" font-weight="900" fill="#ffffff" text-anchor="middle">DIA 28 E 29 DE NOVEMBRO DE 2026</text>
    <text x="0" y="58" font-family="Arial, sans-serif" font-size="24" font-weight="900" fill="#ffd166" text-anchor="middle">21 HORAS ÀS 5HS DA TARDE</text>
  </g>

  <!-- Price Tag / Wooden Plaque: R$ 100,00 -->
  <g transform="translate(190, 580)">
    <rect x="-150" y="-40" width="300" height="110" rx="14" fill="url(#woodSign)" stroke="#3d1e03" stroke-width="6"/>
    <text x="-90" y="20" font-size="44">🎃</text>
    <text x="25" y="15" font-family="Impact, Arial Black, sans-serif" font-size="54" fill="#ffd166">R$ 100,00</text>
    <rect x="-130" y="30" width="260" height="30" rx="8" fill="#ffbe0b"/>
    <text x="0" y="52" font-family="Arial Black, sans-serif" font-size="18" fill="#000814" text-anchor="middle">11/08 ATÉ 15/09</text>
  </g>

  <!-- Call to action: VAMOS VAMOS VAMOS 🤟 -->
  <g transform="translate(520, 580)">
    <text x="0" y="-10" font-family="Impact, sans-serif" font-size="46" fill="#70e000" stroke="#000" stroke-width="2">VAMOS ⚡</text>
    <text x="0" y="32" font-family="Impact, sans-serif" font-size="46" fill="#ffffff" stroke="#000" stroke-width="2">VAMOS 🤟</text>
    <text x="0" y="74" font-family="Impact, sans-serif" font-size="46" fill="#ff5400" stroke="#000" stroke-width="2">VAMOS =</text>
  </g>

  <!-- Location Signboard -->
  <g transform="translate(240, 720)">
    <rect x="-180" y="-30" width="360" height="70" rx="14" fill="url(#woodSign)" stroke="#2b1402" stroke-width="5"/>
    <text x="-140" y="18" font-size="36">📍</text>
    <text x="15" y="1" font-family="Arial Black, sans-serif" font-size="22" fill="#ffffff" text-anchor="middle">LOCALIZAÇÃO:</text>
    <text x="15" y="28" font-family="Arial Black, sans-serif" font-size="20" fill="#ffd166" text-anchor="middle">BREVEMENTE...</text>
  </g>

  <!-- Jack-o'-lantern (Glowing Pumpkin) -->
  <g transform="translate(560, 810)">
    <!-- Pumpkin Hat -->
    <path d="M -100, -20 Q 0,-40 100,-20 L 50,-80 L -30,-80 Z" fill="#2b2d42"/>
    <!-- Pumpkin Body -->
    <ellipse cx="0" cy="40" rx="110" ry="85" fill="#f77f00"/>
    <ellipse cx="-40" cy="40" rx="90" ry="80" fill="#ff8800"/>
    <ellipse cx="40" cy="40" rx="90" ry="80" fill="#ff8800"/>
    <ellipse cx="0" cy="40" rx="60" ry="75" fill="#ffa200"/>
    <!-- Carved Eyes -->
    <polygon points="-50,15 -20,25 -35,-5" fill="#ffd166" filter="url(#glow)"/>
    <polygon points="50,15 20,25 35,-5" fill="#ffd166" filter="url(#glow)"/>
    <!-- Carved Mouth -->
    <path d="M -60,55 Q 0,105 60,55 Q 40,75 20,60 Q 0,80 -20,60 Q -40,75 -60,55 Z" fill="#ffd166" filter="url(#glow)"/>
  </g>

  <!-- Payment Card notice: PARCELAMOS EM ATÉ 2X NO CARTÃO -->
  <g transform="translate(250, 830)">
    <text x="-80" y="0" font-size="44">💳</text>
    <text x="40" y="-12" font-family="Arial Black, sans-serif" font-size="18" fill="#ffffff">PARCELAMOS EM</text>
    <text x="40" y="22" font-family="Impact, Arial Black, sans-serif" font-size="38" fill="#ffd166">ATÉ 2 X</text>
    <text x="40" y="52" font-family="Arial Black, sans-serif" font-size="22" fill="#ffffff">NO CARTÃO</text>
  </g>

  <!-- Bottom Bar: PIX CNPJ 57.242.499/0001-60 -->
  <g transform="translate(350, 975)">
    <rect x="-320" y="-45" width="640" height="75" rx="16" fill="#1b120c" stroke="#ff7b00" stroke-width="4"/>
    <circle cx="-270" cy="-7" r="18" fill="#2ec4b6"/>
    <text x="-270" y="0" font-size="22" fill="#fff" text-anchor="middle" font-weight="bold">❖</text>
    <text x="-235" y="2" font-family="Arial Black, sans-serif" font-size="28" fill="#2ec4b6">PIX CNPJ:</text>
    <text x="80" y="2" font-family="Arial Black, monospace, sans-serif" font-size="34" font-weight="900" fill="#ffffff">57.242.499/0001-60</text>
  </g>
</svg>
`;

// 3. foto1.jpg - Mascote e Brasão Aprovado
const svgFoto1 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#48cae4"/>
      <stop offset="100%" stop-color="#0077b6"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bgGrad)"/>
  
  <!-- Crest Card Container -->
  <rect x="180" y="40" width="440" height="520" rx="24" fill="#ffffff" filter="drop-shadow(0 10px 25px rgba(0,0,0,0.25))"/>
  
  <!-- Crest Representation -->
  <g transform="translate(400, 240) scale(0.65)">
    <path d="M -180,-200 L 180,-200 C 180,100 120,240 0,300 C -120,240 -180,100 -180,-200 Z" fill="#002855" stroke="#d90429" stroke-width="12"/>
    <rect x="-180" y="-200" width="360" height="80" fill="#d90429"/>
    <text x="0" y="-140" font-family="Arial Black, sans-serif" font-size="54" fill="#fff" text-anchor="middle">ASSGA</text>
    <text x="0" y="80" font-size="120" text-anchor="middle">🤟</text>
    <rect x="-180" y="160" width="360" height="60" fill="#0077b6"/>
    <text x="0" y="200" font-family="Arial Black, sans-serif" font-size="20" fill="#ffd700" text-anchor="middle">SÃO GONÇALO DO AMARANTE</text>
  </g>

  <!-- Big Banner "APROVADO!" -->
  <g transform="translate(400, 480)">
    <polygon points="-250,-40 250,-40 230,35 -270,35" fill="#0077b6"/>
    <text x="-15" y="15" font-family="Arial Black, Impact, sans-serif" font-size="56" font-weight="900" fill="#ffd700" text-anchor="middle" letter-spacing="2">APROVADO!</text>
    <!-- Green Checkmark -->
    <path d="M 180,-50 L 210,0 L 270,-80" fill="none" stroke="#70e000" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- Rooster Mascot in corner -->
  <circle cx="710" cy="510" r="70" fill="#d90429" stroke="#fff" stroke-width="6"/>
  <text x="710" y="535" font-size="70" text-anchor="middle">🐓</text>
</svg>
`;

// 4. foto2.jpg - Confraternização de Natal ASSGA
const svgFoto2 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="natalBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#003566"/>
      <stop offset="100%" stop-color="#001d3d"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#natalBg)"/>
  
  <!-- Christmas String Lights -->
  <path d="M 0,50 Q 200,90 400,50 Q 600,90 800,50" fill="none" stroke="#ffb703" stroke-width="3"/>
  <circle cx="100" cy="65" r="8" fill="#d90429"/>
  <circle cx="200" cy="72" r="8" fill="#ffd60a"/>
  <circle cx="300" cy="65" r="8" fill="#52b788"/>
  <circle cx="400" cy="50" r="8" fill="#d90429"/>
  <circle cx="500" cy="65" r="8" fill="#ffd60a"/>
  <circle cx="600" cy="72" r="8" fill="#52b788"/>
  <circle cx="700" cy="65" r="8" fill="#d90429"/>

  <!-- "FELIZ NATAL ASSGA" Banner -->
  <g transform="translate(400, 110)">
    <text x="0" y="0" font-family="Arial Black, Impact, sans-serif" font-size="44" fill="#ffd60a" text-anchor="middle" letter-spacing="3">★ FELIZ NATAL ASSGA ★</text>
    <text x="0" y="35" font-family="Arial, sans-serif" font-size="20" fill="#ffffff" text-anchor="middle">Confraternização dos Sócios e Amigos da Comunidade Surda</text>
  </g>

  <!-- Illustrated silhouettes of members with Santa hats signing in Libras -->
  <g transform="translate(80, 200)">
    <!-- Floor tiles -->
    <rect x="-80" y="320" width="800" height="80" fill="#adb5bd" opacity="0.3"/>
    
    <!-- Group of 8 members celebrating -->
    <g transform="translate(40, 60)">
      <!-- Member 1 -->
      <circle cx="40" cy="90" r="28" fill="#ffddb0"/>
      <polygon points="15,70 40,30 65,70" fill="#d90429"/>
      <circle cx="40" cy="30" r="8" fill="#fff"/>
      <rect x="15" y="120" width="50" height="120" rx="10" fill="#1b4965"/>
      <text x="40" y="70" font-size="34" text-anchor="middle">🤟</text>
    </g>

    <g transform="translate(130, 40)">
      <!-- Member 2 -->
      <circle cx="40" cy="90" r="28" fill="#f4c997"/>
      <polygon points="15,70 40,30 65,70" fill="#d90429"/>
      <circle cx="40" cy="30" r="8" fill="#fff"/>
      <rect x="15" y="120" width="50" height="140" rx="10" fill="#ffffff"/>
      <text x="40" y="70" font-size="34" text-anchor="middle">🤟</text>
    </g>

    <g transform="translate(220, 50)">
      <!-- Member 3 -->
      <circle cx="40" cy="90" r="28" fill="#e0ac69"/>
      <polygon points="15,70 40,30 65,70" fill="#d90429"/>
      <circle cx="40" cy="30" r="8" fill="#fff"/>
      <rect x="15" y="120" width="50" height="130" rx="10" fill="#d90429"/>
      <text x="40" y="70" font-size="34" text-anchor="middle">✌️</text>
    </g>

    <g transform="translate(310, 30)">
      <!-- Member 4 -->
      <circle cx="40" cy="90" r="28" fill="#ffddb0"/>
      <polygon points="15,70 40,30 65,70" fill="#d90429"/>
      <circle cx="40" cy="30" r="8" fill="#fff"/>
      <rect x="15" y="120" width="50" height="150" rx="10" fill="#000814"/>
      <text x="40" y="70" font-size="34" text-anchor="middle">🤟</text>
    </g>

    <g transform="translate(400, 45)">
      <!-- Member 5 -->
      <circle cx="40" cy="90" r="28" fill="#f4c997"/>
      <polygon points="15,70 40,30 65,70" fill="#d90429"/>
      <circle cx="40" cy="30" r="8" fill="#fff"/>
      <rect x="15" y="120" width="50" height="135" rx="10" fill="#e63946"/>
      <text x="40" y="70" font-size="34" text-anchor="middle">👍</text>
    </g>

    <g transform="translate(490, 40)">
      <!-- Member 6 -->
      <circle cx="40" cy="90" r="28" fill="#ffddb0"/>
      <polygon points="15,70 40,30 65,70" fill="#d90429"/>
      <circle cx="40" cy="30" r="8" fill="#fff"/>
      <rect x="15" y="120" width="50" height="140" rx="10" fill="#3a5a40"/>
      <text x="40" y="70" font-size="34" text-anchor="middle">🤟</text>
    </g>

    <g transform="translate(580, 55)">
      <!-- Member 7 -->
      <circle cx="40" cy="90" r="28" fill="#e0ac69"/>
      <polygon points="15,70 40,30 65,70" fill="#d90429"/>
      <circle cx="40" cy="30" r="8" fill="#fff"/>
      <rect x="15" y="120" width="50" height="125" rx="10" fill="#582f0e"/>
      <text x="40" y="70" font-size="34" text-anchor="middle">🙌</text>
    </g>
  </g>
</svg>
`;

// 5. foto3.jpg - Time de Futsal ASSGA Campeão no Ginásio
const svgFoto3 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="900" height="600">
  <defs>
    <linearGradient id="gymWall" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#e9ecef"/>
      <stop offset="70%" stop-color="#dee2e6"/>
      <stop offset="100%" stop-color="#ced4da"/>
    </linearGradient>
    <linearGradient id="gymFloor" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffdda1"/>
      <stop offset="100%" stop-color="#e9c46a"/>
    </linearGradient>
    <linearGradient id="jerseyBlueRed" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#002855"/>
      <stop offset="50%" stop-color="#d90429"/>
      <stop offset="100%" stop-color="#002855"/>
    </linearGradient>
  </defs>

  <!-- Gymnasium Wall & Arches -->
  <rect width="900" height="380" fill="url(#gymWall)"/>
  
  <!-- Gymnasium architectural arches and windows -->
  <path d="M 150,50 Q 250,0 350,50 L 350,220 L 150,220 Z" fill="#ced4da" stroke="#adb5bd" stroke-width="4"/>
  <path d="M 550,50 Q 650,0 750,50 L 750,220 L 550,220 Z" fill="#ced4da" stroke="#adb5bd" stroke-width="4"/>
  <line x1="0" y1="220" x2="900" y2="220" stroke="#495057" stroke-width="6"/>
  <!-- Safety Railing -->
  <line x1="0" y1="210" x2="900" y2="210" stroke="#000" stroke-width="2"/>
  <line x1="0" y1="200" x2="900" y2="200" stroke="#000" stroke-width="2"/>

  <!-- Gymnasium Varnished Wood Court Floor -->
  <polygon points="0,380 900,380 900,600 0,600" fill="url(#gymFloor)"/>
  <line x1="50" y1="420" x2="850" y2="420" stroke="#ffffff" stroke-width="4" opacity="0.7"/>
  <line x1="0" y1="520" x2="900" y2="520" stroke="#ffffff" stroke-width="6" opacity="0.8"/>

  <!-- Futsal Goal Net in background -->
  <rect x="360" y="280" width="180" height="100" fill="none" stroke="#2b2d42" stroke-width="8"/>
  <line x1="360" y1="310" x2="540" y2="310" stroke="#ffffff" stroke-width="2" stroke-dasharray="8,8"/>
  <line x1="360" y1="340" x2="540" y2="340" stroke="#ffffff" stroke-width="2" stroke-dasharray="8,8"/>

  <!-- Team of 10 Futsal Players standing proudly in row -->
  <!-- Player positions with numbers and medals -->
  ${[
    { x: 90, num: 1, gk: false, cap: false },
    { x: 170, num: 4, gk: false, cap: false },
    { x: 250, num: 7, gk: false, cap: false },
    { x: 330, num: 6, gk: false, cap: false },
    { x: 410, num: 23, gk: false, cap: true }, // Captain
    { x: 490, num: 1, gk: true, cap: false },  // Goalkeeper in Cyan
    { x: 570, num: 9, gk: false, cap: false },
    { x: 650, num: 19, gk: false, cap: false },
    { x: 730, num: 28, gk: true, cap: false }, // 2nd Goalkeeper in Cyan
    { x: 810, num: 11, gk: false, cap: false },
  ].map(p => `
    <g transform="translate(${p.x}, 240)">
      <!-- Head -->
      <circle cx="0" cy="60" r="22" fill="#ffddb0"/>
      <!-- Hair/Beard -->
      <path d="M -20,50 Q 0,32 20,50 L 18,65 L -18,65 Z" fill="#212529"/>
      <!-- Medal Ribbon -->
      <path d="M -10,80 L 0,115 L 10,80" stroke="#0077b6" stroke-width="4" fill="none"/>
      <!-- Gold Medal -->
      <circle cx="0" cy="118" r="7" fill="#ffd700" stroke="#b7950b" stroke-width="1.5"/>
      <!-- Jersey -->
      <rect x="-24" y="82" width="48" height="95" rx="8" fill="${p.gk ? '#00b4d8' : 'url(#jerseyBlueRed)'}"/>
      <!-- "ASSGA" written on jersey -->
      <text x="0" y="145" font-family="Arial Black, sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">ASSGA</text>
      <!-- Jersey Number -->
      <text x="0" y="128" font-family="Impact, Arial Black, sans-serif" font-size="24" fill="${p.gk ? '#002855' : '#ffffff'}" text-anchor="middle">${p.num}</text>
      <!-- Shorts -->
      <rect x="-22" y="177" width="44" height="40" rx="4" fill="${p.gk ? '#0077b6' : '#001845'}"/>
      <!-- Legs & Futsal Shoes -->
      <rect x="-18" y="217" width="12" height="55" fill="#ffddb0"/>
      <rect x="6" y="217" width="12" height="55" fill="#ffddb0"/>
      <rect x="-20" y="272" width="16" height="12" rx="3" fill="#ffb703"/>
      <rect x="4" y="272" width="16" height="12" rx="3" fill="#ffb703"/>
    </g>
  `).join('')}

  <!-- Championship Trophy & Soccer Ball in Foreground Center -->
  <g transform="translate(450, 520)">
    <!-- Soccer Ball -->
    <circle cx="0" cy="10" r="24" fill="#ffffff" stroke="#000" stroke-width="3"/>
    <polygon points="0,0 12,8 7,22 -7,22 -12,8" fill="#000"/>
    <!-- Trophy Base -->
    <rect x="-28" y="25" width="56" height="20" rx="4" fill="#1b120c"/>
    <polygon points="-20,25 0,-15 20,25" fill="#ffd700" stroke="#b7950b" stroke-width="2"/>
    <path d="M -25, -5 Q -40,-15 -25,-25" fill="none" stroke="#ffd700" stroke-width="5"/>
    <path d="M 25, -5 Q 40,-15 25,-25" fill="none" stroke="#ffd700" stroke-width="5"/>
    <circle cx="0" cy="-22" r="10" fill="#ffd700"/>
  </g>

  <!-- Banner overlay on bottom -->
  <rect x="0" y="550" width="900" height="50" fill="#002855" opacity="0.95"/>
  <text x="450" y="582" font-family="Arial Black, Impact, sans-serif" font-size="22" fill="#ffd700" text-anchor="middle" letter-spacing="1">
    ASSGA FUTSAL DE SURDOS • CAMPEONATO REGIONAL CBDS
  </text>
</svg>
`;

// 6. avatar-padrao.jpg
const svgAvatar = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
  <rect width="300" height="300" fill="#e6f0fa"/>
  <circle cx="150" cy="115" r="55" fill="#90a4ae"/>
  <path d="M 60,270 C 60,200 100,180 150,180 C 200,180 240,200 240,270 Z" fill="#90a4ae"/>
</svg>
`;

// Write SVGs to temporary files and convert to JPG/JPEG
const items = [
  { svg: svgAssgaLogo, name: 'Assga_foto.jpg' },
  { svg: svgHalloween, name: 'halloween-assga.jpeg' },
  { svg: svgFoto1, name: 'foto1.jpg' },
  { svg: svgFoto2, name: 'foto2.jpg' },
  { svg: svgFoto3, name: 'foto3.jpg' },
  { svg: svgFoto3, name: 'foto3 (1).jpg' },
  { svg: svgAvatar, name: 'avatar-padrao.jpg' },
];

items.forEach(item => {
  const tmpSvg = `/tmp/${item.name}.svg`;
  fs.writeFileSync(tmpSvg, item.svg.trim());
  
  const dest1 = path.join(outDir1, item.name);
  const dest2 = path.join(outDir2, item.name);
  
  try {
    execSync(`ffmpeg -i "${tmpSvg}" -y "${dest1}" 2>/dev/null`);
    fs.copyFileSync(dest1, dest2);
    console.log(`Generated: ${item.name}`);
  } catch (err) {
    console.error(`Failed to convert ${item.name}:`, err);
  }
});
