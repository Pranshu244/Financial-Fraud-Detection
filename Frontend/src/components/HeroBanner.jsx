import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

/* ========================================================================== */
/* SLIDE 1 ARTWORK: We Detect. We Analyze. We Protect.                        */
/* ========================================================================== */
export function FraudIllustration1() {
  return (
    <div className="relative w-full max-w-lg lg:max-w-xl mx-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-sky-300/20 to-blue-600/10 rounded-full blur-3xl pointer-events-none transform scale-95" />

      <svg viewBox="0 0 620 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-lg relative z-10 select-none overflow-visible">
        <defs>
          <linearGradient id="s1_shieldMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="40%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="s1_shieldRim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="s1_shieldDepth" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="s1_monitorBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#242b35" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          <linearGradient id="s1_monitorBevel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4b5563" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
          <linearGradient id="s1_alertGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <linearGradient id="s1_barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="s1_barSide" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="s1_arrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="s1_cardFront" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="s1_goldTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <linearGradient id="s1_goldSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>
          <pattern id="s1_dotPattern" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="1.5" fill="#93c5fd" opacity="0.4" />
          </pattern>
          <filter id="s1_shadow3D" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0f172a" floodOpacity="0.15" />
          </filter>
          <filter id="s1_glowRed" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#ef4444" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Faint Background Grid & Network Lines */}
        <g opacity="0.8">
          <rect x="0" y="20" width="300" height="240" fill="url(#s1_dotPattern)" opacity="0.6" />
          <path d="M 40 80 L 120 80 L 160 120 M 120 80 L 120 180 M 200 40 L 280 40 L 320 80" stroke="#bfdbfe" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.7" />
          <circle cx="40" cy="80" r="3" fill="#93c5fd" />
          <circle cx="160" cy="120" r="3.5" fill="#60a5fa" />
          <circle cx="200" cy="40" r="3" fill="#93c5fd" />
          <circle cx="320" cy="80" r="3.5" fill="#3b82f6" />
        </g>

        {/* 3D Bar Chart & Arrow */}
        <g transform="translate(430, 70)" filter="url(#s1_shadow3D)">
          {[
            { x: 0, y: 110, h: 40 },
            { x: 26, y: 85, h: 65 },
            { x: 52, y: 60, h: 90 },
            { x: 78, y: 35, h: 115 },
            { x: 104, y: 10, h: 140 }
          ].map((bar, i) => (
            <g key={i} transform={`translate(${bar.x}, ${bar.y})`}>
              <rect x="0" y="0" width="16" height={bar.h} rx="2" fill="url(#s1_barGrad)" />
              <polygon points={`16,0 22,-6 22,${bar.h - 6} 16,${bar.h}`} fill="url(#s1_barSide)" />
              <polygon points="0,0 6,-6 22,-6 16,0" fill="#60a5fa" />
            </g>
          ))}
          <path d="M -35 135 C 10 130, 40 90, 115 -10" fill="none" stroke="url(#s1_arrowGrad)" strokeWidth="10" strokeLinecap="round" />
          <polygon points="124,-24 102,-12 120,8" fill="#1d4ed8" />
        </g>

        {/* 3D Bank Building */}
        <g transform="translate(440, 245)" filter="url(#s1_shadow3D)">
          <rect x="0" y="65" width="120" height="8" rx="2" fill="#e2e8f0" />
          <rect x="6" y="58" width="108" height="7" rx="1.5" fill="#f1f5f9" />
          <rect x="12" y="52" width="96" height="6" rx="1" fill="#ffffff" />
          <g fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8">
            <rect x="18" y="18" width="12" height="34" rx="2" />
            <rect x="42" y="18" width="12" height="34" rx="2" />
            <rect x="66" y="18" width="12" height="34" rx="2" />
            <rect x="90" y="18" width="12" height="34" rx="2" />
          </g>
          <rect x="15" y="15" width="18" height="4" rx="1" fill="#cbd5e1" />
          <rect x="39" y="15" width="18" height="4" rx="1" fill="#cbd5e1" />
          <rect x="63" y="15" width="18" height="4" rx="1" fill="#cbd5e1" />
          <rect x="87" y="15" width="18" height="4" rx="1" fill="#cbd5e1" />
          <rect x="12" y="9" width="96" height="6" rx="1" fill="#94a3b8" />
          <polygon points="60,-12 8,9 112,9" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          <polygon points="60,-6 16,7 104,7" fill="#f8fafc" />
        </g>

        {/* Credit Card & Golden Coins */}
        <g transform="translate(370, 240) rotate(-12)" filter="url(#s1_shadow3D)">
          <rect x="0" y="0" width="90" height="56" rx="6" fill="url(#s1_cardFront)" stroke="#3b82f6" strokeWidth="1" />
          <rect x="10" y="24" width="14" height="11" rx="2" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
          <rect x="10" y="42" width="30" height="3" rx="1.5" fill="#64748b" />
          <rect x="44" y="42" width="20" height="3" rx="1.5" fill="#64748b" />
          <circle cx="72" cy="42" r="6" fill="#ef4444" opacity="0.8" />
          <circle cx="78" cy="42" r="6" fill="#f59e0b" opacity="0.8" />
        </g>

        <g transform="translate(400, 275)" filter="url(#s1_shadow3D)">
          <ellipse cx="20" cy="30" rx="20" ry="8" fill="url(#s1_goldSide)" />
          <ellipse cx="20" cy="26" rx="20" ry="8" fill="url(#s1_goldTop)" stroke="#fef08a" strokeWidth="0.8" />
          <ellipse cx="20" cy="20" rx="20" ry="8" fill="url(#s1_goldSide)" />
          <ellipse cx="20" cy="16" rx="20" ry="8" fill="url(#s1_goldTop)" stroke="#fef08a" strokeWidth="0.8" />
          <ellipse cx="20" cy="10" rx="20" ry="8" fill="url(#s1_goldSide)" />
          <ellipse cx="20" cy="6" rx="20" ry="8" fill="url(#s1_goldTop)" stroke="#fef08a" strokeWidth="0.8" />
          <ellipse cx="44" cy="28" rx="18" ry="7" fill="url(#s1_goldSide)" />
          <ellipse cx="44" cy="24" rx="18" ry="7" fill="url(#s1_goldTop)" stroke="#fef08a" strokeWidth="0.8" />
        </g>

        {/* 3D Security Shield */}
        <g transform="translate(340, 50)" filter="url(#s1_shadow3D)">
          <path d="M 70 0 L 138 34 C 138 110, 115 170, 70 200 C 25 170, 2 110, 2 34 Z" fill="url(#s1_shieldDepth)" />
          <path d="M 70 4 L 134 36 C 134 106, 112 164, 70 192 C 28 164, 6 106, 6 36 Z" fill="url(#s1_shieldMain)" stroke="url(#s1_shieldRim)" strokeWidth="4" />
          <path d="M 70 16 L 124 44 C 124 100, 105 152, 70 178 C 35 152, 16 100, 16 44 Z" fill="none" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.25" />
          <g transform="translate(42, 60)" filter="url(#s1_shadow3D)">
            <path d="M 12 28 V 16 C 12 6, 20 -2, 28 -2 C 36 -2, 44 6, 44 16 V 28" fill="none" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" />
            <path d="M 12 28 V 16 C 12 6, 20 -2, 28 -2 C 36 -2, 44 6, 44 16 V 28" fill="none" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
            <rect x="4" y="24" width="48" height="40" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
            <circle cx="28" cy="40" r="5" fill="#1e3a8a" />
            <polygon points="25,43 31,43 32,54 24,54" fill="#1e3a8a" />
          </g>
        </g>

        {/* 3D Monitor / Screen with FRAUD DETECTED */}
        <g transform="translate(250, 100)" filter="url(#s1_shadow3D)">
          <rect x="-10" y="-8" width="165" height="150" rx="18" fill="url(#s1_monitorBevel)" />
          <rect x="-6" y="-4" width="157" height="142" rx="14" fill="url(#s1_monitorBody)" stroke="#374151" strokeWidth="2" />
          <rect x="4" y="6" width="137" height="122" rx="10" fill="#0f172a" />
          <g transform="translate(24, 20)" filter="url(#s1_glowRed)">
            <polygon points="20,4 38,36 2,36" fill="url(#s1_alertGrad)" />
            <rect x="18" y="14" width="4" height="12" rx="2" fill="#ffffff" />
            <circle cx="20" cy="30" r="2" fill="#ffffff" />
          </g>
          <g transform="translate(68, 30)">
            <text x="0" y="10" fill="#ef4444" fontSize="18" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">FRAUD</text>
            <text x="0" y="28" fill="#ef4444" fontSize="16" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">DETECTED</text>
          </g>
          <rect x="14" y="70" width="115" height="4" rx="2" fill="#ef4444" opacity="0.7" />
          <rect x="14" y="80" width="75" height="3" rx="1.5" fill="#38bdf8" opacity="0.8" />
          <rect x="94" y="80" width="35" height="3" rx="1.5" fill="#475569" />
          <rect x="14" y="88" width="45" height="3" rx="1.5" fill="#475569" />
          <rect x="64" y="88" width="65" height="3" rx="1.5" fill="#38bdf8" opacity="0.6" />
        </g>

        {/* 3D Magnifying Glass */}
        <g transform="translate(200, 115) rotate(-35)" filter="url(#s1_shadow3D)">
          <rect x="0" y="85" width="22" height="75" rx="8" fill="#1f2937" stroke="#111827" strokeWidth="2" />
          <rect x="3" y="87" width="8" height="71" rx="4" fill="#374151" />
          <rect x="-2" y="78" width="26" height="12" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="11" cy="20" r="62" fill="none" stroke="#1f2937" strokeWidth="16" />
          <circle cx="11" cy="20" r="62" fill="none" stroke="#374151" strokeWidth="6" />
          <circle cx="11" cy="20" r="54" fill="#60a5fa" fillOpacity="0.12" stroke="#93c5fd" strokeWidth="2" />
          <path d="M -25 -20 A 46 46 0 0 1 45 -20" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

/* ========================================================================== */
/* SLIDE 2 ARTWORK: Smarter Insights. Faster Decisions. Fraud-Free Future.    */
/* ========================================================================== */
export function FraudIllustration2() {
  return (
    <div className="relative w-full max-w-lg lg:max-w-xl mx-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/20 via-blue-400/20 to-teal-400/10 rounded-full blur-3xl pointer-events-none transform scale-95" />

      <svg viewBox="0 0 640 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-lg relative z-10 select-none overflow-visible">
        <defs>
          <linearGradient id="s2_vShield" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>
          <linearGradient id="s2_vGlyph" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
          <linearGradient id="s2_dbBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="s2_cardLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>
          <linearGradient id="s2_silverCoin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <filter id="s2_shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#0c4a6e" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Faint Background Network Lines */}
        <g opacity="0.6">
          <path d="M 50 60 L 150 60 L 200 100 M 150 60 L 150 160 M 350 40 L 480 40" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          <circle cx="50" cy="60" r="3" fill="#38bdf8" />
          <circle cx="200" cy="100" r="3.5" fill="#0284c7" />
          <circle cx="480" cy="40" r="3" fill="#0284c7" />
        </g>

        {/* Card 1: BEHAVIORAL ANALYTICS (Left) */}
        <g transform="translate(40, 70)" filter="url(#s2_shadow)">
          <rect x="0" y="0" width="165" height="185" rx="14" fill="url(#s2_cardLight)" stroke="#e0f2fe" strokeWidth="1.5" />
          <text x="14" y="24" fill="#0369a1" fontSize="10" fontWeight="800" fontFamily="sans-serif">BEHAVIORAL ANALYTICS</text>
          <line x1="14" y1="32" x2="151" y2="32" stroke="#f1f5f9" strokeWidth="1" />
          
          {/* Analytics Wave Graph */}
          <path d="M 16 85 Q 40 55, 60 75 T 100 80 T 130 50 T 150 38" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="150" cy="38" r="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
          
          {/* Anomaly Score Section */}
          <text x="14" y="118" fill="#64748b" fontSize="9" fontWeight="700" fontFamily="sans-serif">ANOMALY SCORE</text>
          <text x="14" y="148" fill="#0284c7" fontSize="28" fontWeight="900" fontFamily="sans-serif">87%</text>
          
          {/* Progress Bar */}
          <rect x="14" y="160" width="137" height="8" rx="4" fill="#e0f2fe" />
          <rect x="14" y="160" width="115" height="8" rx="4" fill="#0284c7" />
        </g>

        {/* Magnifying Glass with Fingerprint (Left-Center) */}
        <g transform="translate(180, 150)" filter="url(#s2_shadow)">
          <rect x="42" y="42" width="16" height="50" rx="6" fill="#1e293b" transform="rotate(-45 42 42)" />
          <circle cx="25" cy="25" r="42" fill="#ffffff" fillOpacity="0.9" stroke="#0284c7" strokeWidth="6" />
          {/* Fingerprint Icon Lines */}
          <path d="M 12 25 A 13 13 0 0 1 38 25 M 16 25 A 9 9 0 0 1 34 25 M 20 25 A 5 5 0 0 1 30 25 M 25 25 V 32" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Central 3D Blue Shield with Stylized "V" Emblem */}
        <g transform="translate(255, 45)" filter="url(#s2_shadow)">
          <path d="M 60 0 L 118 28 C 118 95, 98 148, 60 175 C 22 148, 2 95, 2 28 Z" fill="url(#s2_vShield)" stroke="#38bdf8" strokeWidth="3" />
          {/* Stylized 3D "V" Logo */}
          <path d="M 32 40 L 60 130 L 88 40 L 74 40 L 60 100 L 46 40 Z" fill="url(#s2_vGlyph)" />
        </g>

        {/* Card 2: TRANSACTION MONITORING (Right-Center) */}
        <g transform="translate(370, 75)" filter="url(#s2_shadow)">
          <rect x="0" y="0" width="160" height="175" rx="14" fill="url(#s2_cardLight)" stroke="#e0f2fe" strokeWidth="1.5" />
          <text x="14" y="24" fill="#334155" fontSize="10" fontWeight="800" fontFamily="sans-serif">TRANSACTION MONITORING</text>
          
          {/* Donut Chart */}
          <g transform="translate(80, 80)">
            <circle cx="0" cy="0" r="38" fill="none" stroke="#22c55e" strokeWidth="12" strokeDasharray="170 240" />
            <circle cx="0" cy="0" r="38" fill="none" stroke="#eab308" strokeWidth="12" strokeDasharray="50 240" strokeDashoffset="-170" />
            <circle cx="0" cy="0" r="38" fill="none" stroke="#ef4444" strokeWidth="12" strokeDasharray="20 240" strokeDashoffset="-220" />
            <text x="0" y="-2" fill="#0f172a" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">1,248</text>
            <text x="0" y="10" fill="#64748b" fontSize="7" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">Total Transactions</text>
          </g>

          {/* Legend */}
          <g transform="translate(14, 140)" fontSize="9" fontWeight="700" fontFamily="sans-serif">
            <circle cx="6" cy="0" r="4" fill="#22c55e" />
            <text x="16" y="3" fill="#475569">Normal</text>
            <text x="120" y="3" fill="#0f172a" textAnchor="end">72%</text>
            
            <circle cx="6" cy="14" r="4" fill="#eab308" />
            <text x="16" y="17" fill="#475569">Suspicious</text>
            <text x="120" y="17" fill="#0f172a" textAnchor="end">21%</text>

            <circle cx="6" cy="28" r="4" fill="#ef4444" />
            <text x="16" y="31" fill="#475569">Fraudulent</text>
            <text x="120" y="31" fill="#0f172a" textAnchor="end">7%</text>
          </g>
        </g>

        {/* Database Cylinder (Far Right Base) */}
        <g transform="translate(480, 220)" filter="url(#s2_shadow)">
          <rect x="0" y="10" width="38" height="60" fill="url(#s2_dbBody)" rx="4" />
          <ellipse cx="19" cy="10" rx="19" ry="8" fill="#334155" />
          <ellipse cx="19" cy="30" rx="19" ry="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <ellipse cx="19" cy="50" rx="19" ry="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          {/* LED indicators */}
          <circle cx="10" cy="22" r="2" fill="#38bdf8" />
          <circle cx="10" cy="42" r="2" fill="#22c55e" />
        </g>

        {/* Smartphone: Transaction Secure */}
        <g transform="translate(490, 75)" filter="url(#s2_shadow)">
          <rect x="0" y="0" width="80" height="150" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <rect x="4" y="6" width="72" height="138" rx="10" fill="#ffffff" />
          {/* Screen content */}
          <g transform="translate(40, 50)" textAnchor="middle">
            <path d="M 0 -22 L 20 -12 C 20 12, 12 28, 0 36 C -12 28, -20 12, -20 -12 Z" fill="#0284c7" />
            <path d="M -6 0 L -1 5 L 8 -4" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
            <text x="0" y="52" fill="#0f172a" fontSize="9" fontWeight="900" fontFamily="sans-serif">Transaction</text>
            <text x="0" y="63" fill="#0f172a" fontSize="9" fontWeight="900" fontFamily="sans-serif">Secure</text>
            <circle cx="0" cy="78" r="8" fill="#22c55e" />
            <path d="M -3 78 L -1 80 L 4 76" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        </g>

        {/* Stacked Coins with Green Plant */}
        <g transform="translate(545, 200)" filter="url(#s2_shadow)">
          {/* Coin stack */}
          <ellipse cx="20" cy="50" rx="20" ry="8" fill="url(#s2_silverCoin)" />
          <ellipse cx="20" cy="42" rx="20" ry="8" fill="url(#s2_silverCoin)" stroke="#cbd5e1" strokeWidth="1" />
          <ellipse cx="20" cy="34" rx="20" ry="8" fill="url(#s2_silverCoin)" stroke="#cbd5e1" strokeWidth="1" />
          <ellipse cx="20" cy="26" rx="20" ry="8" fill="url(#s2_silverCoin)" stroke="#cbd5e1" strokeWidth="1" />
          
          {/* Green Plant Sprout */}
          <path d="M 20 26 Q 20 10, 10 2 Q 22 10, 20 26 Z" fill="#22c55e" />
          <path d="M 20 20 Q 25 5, 36 2 Q 26 12, 20 20 Z" fill="#16a34a" />
        </g>
      </svg>
    </div>
  );
}

/* ========================================================================== */
/* SLIDE 3 ARTWORK: Intelligent Detection. Continuous Monitoring...          */
/* ========================================================================== */
export function FraudIllustration3() {
  return (
    <div className="relative w-full max-w-lg lg:max-w-xl mx-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-indigo-400/20 to-violet-600/10 rounded-full blur-3xl pointer-events-none transform scale-95" />

      <svg viewBox="0 0 640 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-lg relative z-10 select-none overflow-visible">
        <defs>
          <linearGradient id="s3_pShield" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#6d28d9" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
          <linearGradient id="s3_pMonitor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="s3_pCard" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b0764" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <linearGradient id="s3_pChartBar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <filter id="s3_shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#3b0764" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Faint Purple Network Connections */}
        <g opacity="0.6">
          <path d="M 60 70 L 160 70 L 220 110 M 340 50 L 460 50" stroke="#ddd0fe" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          <circle cx="60" cy="70" r="3" fill="#a78bfa" />
          <circle cx="220" cy="110" r="3.5" fill="#7c3aed" />
          <circle cx="460" cy="50" r="3" fill="#7c3aed" />
        </g>

        {/* Left Purple 3D Shield with Padlock */}
        <g transform="translate(260, 140)" filter="url(#shadow3D)">
          <path d="M 60 0 L 118 28 C 118 98, 98 152, 60 180 C 22 152, 2 98, 2 28 Z" fill="url(#s3_pShield)" stroke="#c084fc" strokeWidth="3" />
          <g transform="translate(42, 55)">
            <path d="M 8 22 V 12 C 8 4, 14 -2, 20 -2 C 26 -2, 32 4, 32 12 V 22" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <rect x="0" y="20" width="40" height="32" rx="6" fill="#ffffff" />
            <circle cx="20" cy="34" r="4" fill="#5b21b6" />
          </g>
        </g>

        {/* Center-Right Monitor: RISK MONITORING */}
        <g transform="translate(315, 55)" filter="url(#s3_shadow)">
          <rect x="0" y="0" width="220" height="150" rx="12" fill="#334155" />
          <rect x="4" y="4" width="212" height="142" rx="10" fill="url(#s3_pMonitor)" />
          <text x="16" y="24" fill="#a78bfa" fontSize="10" fontWeight="800" fontFamily="sans-serif">RISK MONITORING</text>
          
          {/* World map topology points */}
          <path d="M 30 70 Q 70 50, 100 70 T 180 60" fill="none" stroke="#6d28d9" strokeWidth="1.5" />
          <circle cx="30" cy="70" r="4" fill="#c084fc" />
          <circle cx="100" cy="70" r="4" fill="#c084fc" />
          <circle cx="180" cy="60" r="4" fill="#c084fc" />

          {/* Risk Score Pill */}
          <g transform="translate(16, 90)">
            <rect x="0" y="0" width="130" height="42" rx="8" fill="#1e1b4b" stroke="#4c1d95" strokeWidth="1" />
            <text x="10" y="14" fill="#94a3b8" fontSize="8" fontWeight="700">RISK SCORE</text>
            <text x="10" y="34" fill="#ffffff" fontSize="20" fontWeight="900">92 <tspan fontSize="10" fill="#94a3b8">/100</tspan></text>
            <rect x="80" y="22" width="42" height="14" rx="7" fill="#5b21b6" />
            <text x="101" y="32" fill="#f5f3ff" fontSize="8" fontWeight="800" textAnchor="middle">High Risk</text>
          </g>
        </g>

        {/* Card: SUSPICIOUS ACTIVITY Alert Card */}
        <g transform="translate(425, 130)" filter="url(#s3_shadow)">
          <rect x="0" y="0" width="165" height="85" rx="12" fill="#ffffff" stroke="#f472b6" strokeWidth="1.5" />
          <text x="36" y="24" fill="#dc2626" fontSize="10" fontWeight="900" fontFamily="sans-serif">SUSPICIOUS ACTIVITY</text>
          {/* Warning Icon */}
          <polygon points="20,12 30,30 10,30" fill="#ef4444" />
          <text x="20" y="27" fill="#ffffff" fontSize="10" fontWeight="900" textAnchor="middle">!</text>

          <text x="14" y="46" fill="#334155" fontSize="9" fontWeight="700">High Risk Transaction Detected</text>
          <text x="14" y="60" fill="#64748b" fontSize="8">Account: ACC00077</text>
          <text x="14" y="72" fill="#64748b" fontSize="8">Amount: ₹47,300.16</text>
        </g>

        {/* Upward 3D Purple Bar Chart & Arrow */}
        <g transform="translate(500, 70)" filter="url(#s3_shadow)">
          {[
            { x: 0, y: 100, h: 50 },
            { x: 24, y: 80, h: 70 },
            { x: 48, y: 55, h: 95 },
            { x: 72, y: 30, h: 120 }
          ].map((bar, i) => (
            <rect key={i} x={bar.x} y={bar.y} width="16" height={bar.h} rx="3" fill="url(#s3_pChartBar)" />
          ))}
          <path d="M -20 120 L 80 0" fill="none" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" />
          <polygon points="90,-8 72,0 84,16" fill="#7c3aed" />
        </g>

        {/* Purple Credit Card */}
        <g transform="translate(435, 235)" filter="url(#s3_shadow)">
          <rect x="0" y="0" width="85" height="52" rx="6" fill="url(#s3_pCard)" stroke="#6d28d9" strokeWidth="1" />
          <rect x="10" y="20" width="12" height="10" rx="2" fill="#fbbf24" />
          <rect x="10" y="38" width="30" height="3" rx="1.5" fill="#a78bfa" />
        </g>

        {/* 3D Purple Bank Building */}
        <g transform="translate(490, 205)" filter="url(#s3_shadow)">
          <rect x="0" y="55" width="90" height="6" fill="#ddd0fe" />
          <rect x="6" y="16" width="10" height="39" rx="1" fill="#ede9fe" />
          <rect x="28" y="16" width="10" height="39" rx="1" fill="#ede9fe" />
          <rect x="50" y="16" width="10" height="39" rx="1" fill="#ede9fe" />
          <rect x="72" y="16" width="10" height="39" rx="1" fill="#ede9fe" />
          <polygon points="45,-6 4,16 86,16" fill="#a78bfa" />
        </g>

        {/* Mini Purple Shield Badge */}
        <g transform="translate(555, 270)" filter="url(#s3_shadow)">
          <circle cx="16" cy="16" r="16" fill="#7c3aed" />
          <path d="M 16 8 L 23 12 C 23 18, 20 22, 16 25 C 12 22, 9 18, 9 12 Z" fill="#ffffff" />
          <path d="M 13 16 L 15 18 L 19 14" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
}

/* ========================================================================== */
/* SLIDES DEFINITION DATA                                                     */
/* ========================================================================== */
const SLIDES = [
  {
    id: 'slide-1',
    bgGradient: 'from-[#eaf2ff] via-[#e4efff] to-[#dceaff]',
    borderColor: 'border-[#cbe0ff]',
    headlineColor: 'text-[#192a68]',
    highlightColor: 'text-[#1d4ed8]',
    badgeBg: 'bg-white/90 border-[#b9d3ff] text-[#1a388b]',
    badgeText: 'Smart Analytics. Stronger Protection.',
    headline: (
      <>
        We Detect. We Analyze.<br />
        <span className="text-[#1d4ed8]">We Protect.</span>
      </>
    ),
    description: 'VittRakshak uses advanced GNN & Behavioral Analytics to detect financial fraud, identify hidden risks, and safeguard institutions and communities.',
    illustration: <FraudIllustration1 />
  },
  {
    id: 'slide-2',
    bgGradient: 'from-[#e0f2fe] via-[#f0f9ff] to-[#dbefe5]',
    borderColor: 'border-[#bae6fd]',
    headlineColor: 'text-[#0f172a]',
    badgeBg: 'bg-white/90 border-[#7dd3fc] text-[#0369a1]',
    badgeText: 'AI-Powered. Trust-Driven. Future-Ready.',
    headline: (
      <>
        Smarter Insights.<br />
        Faster Decisions.<br />
        <span className="text-[#0284c7]">Fraud-Free Future.</span>
      </>
    ),
    description: 'Empowering financial institutions with AI-driven insights, automated risk scoring, and intelligent fraud prevention across every transaction.',
    illustration: <FraudIllustration2 />
  },
  {
    id: 'slide-3',
    bgGradient: 'from-[#f5f0ff] via-[#eee4ff] to-[#e4d5ff]',
    borderColor: 'border-[#ddd0fe]',
    headlineColor: 'text-[#1e1b4b]',
    badgeBg: 'bg-white/90 border-[#c084fc] text-[#5b21b6]',
    badgeText: 'Real-time Protection. Real Impact.',
    headline: (
      <>
        Intelligent Detection.<br />
        Continuous Monitoring.<br />
        <span className="text-[#7c3aed]">Stronger Institutions.</span>
      </>
    ),
    description: 'VittRakshak combines GNN intelligence with behavioral analytics to detect complex fraud patterns in real-time and prevent financial crime before it impacts.',
    illustration: <FraudIllustration3 />
  }
];

/* ========================================================================== */
/* MAIN HERO BANNER CAROUSEL COMPONENT WITH AUTO-SCROLL                       */
/* ========================================================================== */
export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll effect: advances slide every 5 seconds if not paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + SLIDES.length) % SLIDES.length);
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative overflow-hidden bg-gradient-to-r ${currentSlide.bgGradient} border ${currentSlide.borderColor} rounded-3xl shadow-sm hover:shadow-md transition-all duration-500 group`}
    >
      {/* Background Decorator Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent pointer-events-none" />

      {/* Main Slide Content with Framer Motion Fade/Slide */}
      <div className="relative z-10 p-8 sm:p-10 lg:p-12 min-h-[360px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Column: Headline, Subtitle, Security Badge */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <h1 className={`text-3xl sm:text-4xl lg:text-[40px] font-extrabold ${currentSlide.headlineColor} tracking-tight leading-[1.16]`}>
                {currentSlide.headline}
              </h1>

              <p className="text-[#334155] text-sm sm:text-base leading-relaxed max-w-md font-normal mt-4">
                {currentSlide.description}
              </p>

              <div className={`mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur border ${currentSlide.badgeBg} rounded-xl font-semibold text-xs sm:text-sm shadow-2xs`}>
                <Shield className="w-4 h-4" />
                <span>{currentSlide.badgeText}</span>
              </div>
            </div>

            {/* Right Column: Interactive Vector Artwork */}
            <div className="lg:col-span-6 w-full flex justify-center items-center">
              {currentSlide.illustration}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* SIDE SCROLL ARROW BUTTONS (LEFT & RIGHT)                            */}
      {/* -------------------------------------------------------------------- */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 shadow-md border border-slate-200/80 transition-all opacity-70 hover:opacity-100 focus:outline-none active:scale-95"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 shadow-md border border-slate-200/80 transition-all opacity-70 hover:opacity-100 focus:outline-none active:scale-95"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* -------------------------------------------------------------------- */}
      {/* BOTTOM CONTROLS BAR: DOT INDICATORS & AUTO-PLAY STATUS INDICATOR    */}
      {/* -------------------------------------------------------------------- */}
      <div className="absolute bottom-4 right-6 z-20 flex items-center gap-3 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/60 shadow-2xs">
        {/* Play/Pause Indicator Icon */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          title={isPaused ? "Resume Auto-Play" : "Pause Auto-Play"}
          className="text-slate-500 hover:text-slate-900 transition-colors"
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>

        <span className="w-px h-3 bg-slate-300" />

        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'w-7 bg-blue-900 shadow-2xs'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
