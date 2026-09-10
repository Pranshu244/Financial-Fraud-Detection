import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  User,
  RefreshCw,
  KeyRound,
  ArrowRight,
  ShieldAlert,
  Shield,
  Wifi
} from 'lucide-react';

/* Vector 3D Artwork for Login Left Side Card */
function LoginHeroIllustration() {
  return (
    <div className="relative w-full max-w-[260px] sm:max-w-[320px] mx-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-blue-400/15 rounded-full blur-2xl pointer-events-none transform scale-90" />

      <svg viewBox="0 0 540 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-md select-none overflow-visible">
        <defs>
          <linearGradient id="lh_shieldMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="40%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="lh_shieldDepth" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="lh_monitorBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#242b35" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          <linearGradient id="lh_barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="lh_goldTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          <filter id="lh_shadow3D" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0f172a" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* 3D Bar Chart & Curve Arrow */}
        <g transform="translate(370, 60)" filter="url(#lh_shadow3D)">
          <rect x="0" y="100" width="16" height="40" rx="2" fill="url(#lh_barGrad)" />
          <rect x="24" y="75" width="16" height="65" rx="2" fill="url(#lh_barGrad)" />
          <rect x="48" y="50" width="16" height="90" rx="2" fill="url(#lh_barGrad)" />
          <rect x="72" y="25" width="16" height="115" rx="2" fill="url(#lh_barGrad)" />
          <rect x="96" y="0" width="16" height="140" rx="2" fill="url(#lh_barGrad)" />
          <path d="M -30 120 C 10 120, 30 70, 105 -20" fill="none" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" />
          <polygon points="114,-32 94,-22 110,-2" fill="#1d4ed8" />
        </g>

        {/* 3D Bank Building */}
        <g transform="translate(390, 230)" filter="url(#lh_shadow3D)">
          <rect x="0" y="65" width="110" height="8" rx="2" fill="#cbd5e1" />
          <rect x="6" y="58" width="98" height="7" rx="1.5" fill="#f1f5f9" />
          <g fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8">
            <rect x="14" y="18" width="12" height="34" rx="2" />
            <rect x="38" y="18" width="12" height="34" rx="2" />
            <rect x="62" y="18" width="12" height="34" rx="2" />
            <rect x="86" y="18" width="12" height="34" rx="2" />
          </g>
          <polygon points="55,-12 4,9 106,9" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        </g>

        {/* Credit Card & Coins */}
        <g transform="translate(320, 225) rotate(-10)" filter="url(#lh_shadow3D)">
          <rect x="0" y="0" width="85" height="52" rx="6" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" />
          <rect x="10" y="20" width="14" height="10" rx="2" fill="#fbbf24" />
        </g>

        <g transform="translate(350, 260)" filter="url(#lh_shadow3D)">
          <ellipse cx="18" cy="24" rx="18" ry="7" fill="#b45309" />
          <ellipse cx="18" cy="20" rx="18" ry="7" fill="url(#lh_goldTop)" stroke="#fef08a" strokeWidth="0.8" />
          <ellipse cx="18" cy="14" rx="18" ry="7" fill="#b45309" />
          <ellipse cx="18" cy="10" rx="18" ry="7" fill="url(#lh_goldTop)" stroke="#fef08a" strokeWidth="0.8" />
        </g>

        {/* Central 3D Blue Security Shield */}
        <g transform="translate(300, 40)" filter="url(#lh_shadow3D)">
          <path d="M 60 0 L 118 28 C 118 95, 98 148, 60 175 C 22 148, 2 95, 2 28 Z" fill="url(#lh_shieldDepth)" />
          <path d="M 60 4 L 114 30 C 114 90, 96 142, 60 168 C 24 142, 6 90, 6 30 Z" fill="url(#lh_shieldMain)" stroke="#60a5fa" strokeWidth="3" />
          <g transform="translate(36, 50)">
            <path d="M 10 24 V 14 C 10 5, 17 -2, 24 -2 C 31 -2, 38 5, 38 14 V 24" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
            <rect x="2" y="20" width="44" height="36" rx="6" fill="#ffffff" />
            <circle cx="24" cy="36" r="4" fill="#1e3a8a" />
          </g>
        </g>

        {/* 3D Monitor with FRAUD DETECTED Alert */}
        <g transform="translate(200, 90)" filter="url(#lh_shadow3D)">
          <rect x="-6" y="-6" width="145" height="132" rx="12" fill="#374151" />
          <rect x="2" y="2" width="129" height="116" rx="8" fill="url(#lh_monitorBody)" />
          <polygon points="18,18 32,46 4,46" fill="#ef4444" />
          <text x="18" y="42" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">!</text>
          <text x="42" y="30" fill="#ef4444" fontSize="14" fontWeight="900" fontFamily="sans-serif">FRAUD</text>
          <text x="42" y="44" fill="#ef4444" fontSize="12" fontWeight="900" fontFamily="sans-serif">DETECTED</text>
          <rect x="12" y="65" width="105" height="3" rx="1.5" fill="#ef4444" opacity="0.8" />
          <rect x="12" y="74" width="65" height="3" rx="1.5" fill="#38bdf8" />
          <rect x="82" y="74" width="35" height="3" rx="1.5" fill="#475569" />
        </g>

        {/* 3D Magnifying Glass */}
        <g transform="translate(155, 105) rotate(-35)" filter="url(#lh_shadow3D)">
          <rect x="0" y="70" width="18" height="60" rx="6" fill="#1f2937" />
          <circle cx="9" cy="15" r="50" fill="none" stroke="#1f2937" strokeWidth="12" />
          <circle cx="9" cy="15" r="44" fill="#60a5fa" fillOpacity="0.15" stroke="#93c5fd" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

export default function LoginPage({ onLogin }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7B9X2M');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const refreshCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!userId.trim()) {
      setErrorMessage('Please enter your Corporate Analyst ID.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your secure password.');
      return;
    }
    if (captchaInput.toUpperCase().trim() !== captchaCode) {
      setErrorMessage('Invalid security CAPTCHA code. Please try again.');
      refreshCaptcha();
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        userId: userId,
        name: 'Officer ' + userId,
        role: 'Certified Anti-Money Laundering Officer',
        bank: 'State Bank of India',
      });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col justify-between font-sans">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200 shadow-2xs py-3.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-900 text-white rounded-xl shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                VittRakshak Portal
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full">
                  RBI FIU Compliant
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">GNN &amp; Behavioral Analytics Fraud Engine</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Security Server Active</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 my-2">
        <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* ================================================================ */}
          {/* LEFT SIDE: Brand Showcase & Clean Simple Hero Showcase Card      */}
          {/* ================================================================ */}
          <div className="lg:col-span-6 bg-gradient-to-br from-white via-slate-50 to-blue-50/50 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/80 space-y-6">
            
            {/* Top Row Badges */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-blue-900 border border-blue-200/80 rounded-full text-xs font-semibold shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-blue-800" />
                <span>VittRakshak Portal</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200/90 rounded-full text-xs font-semibold text-slate-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live</span>
              </div>
            </div>

            {/* Hero Headline & 3D Vector Artwork */}
            <div className="space-y-4 my-auto py-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Detect. Analyze.<br />
                <span className="text-blue-600">Protect.</span>
              </h2>
              <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
              <p className="text-slate-600 text-sm leading-relaxed font-normal max-w-md">
                AI &amp; GNN-powered intelligence to detect financial fraud and reduce risk in real time.
              </p>

              <div className="pt-2 flex justify-center">
                <LoginHeroIllustration />
              </div>
            </div>

            {/* Footer Row inside Left Card */}
            <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block">Secure • Intelligent • Reliable</span>
                  <span className="text-[10px] text-slate-500">Protecting Institutions. Preventing Fraud.</span>
                </div>
              </div>
            </div>

          </div>

          {/* ================================================================ */}
          {/* RIGHT SIDE: Analyst Single Sign-On Form Controls                 */}
          {/* ================================================================ */}
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-6 bg-white flex flex-col justify-center">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Analyst Single Sign-On</h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your assigned corporate analyst credentials to access the fraud intelligence console.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User ID Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Analyst ID / Email</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="e.g. SBI_ANALYST_99"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Security Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                  />
                </div>
              </div>

              {/* Security CAPTCHA Box */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Security Verification Code</label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Enter code"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-900 font-mono uppercase tracking-wider placeholder-slate-400 focus:outline-none focus:border-blue-700"
                    />
                  </div>

                  {/* CAPTCHA Code Display */}
                  <div className="bg-slate-900 text-white font-mono font-bold text-base px-4 py-2 rounded-lg tracking-widest select-none flex items-center justify-between gap-2 border border-slate-800 shadow-inner">
                    <span className="text-amber-400 italic line-through decoration-rose-500">{captchaCode}</span>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      title="Refresh Captcha"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm rounded-lg transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying Credentials &amp; Granting Access...</span>
                  </>
                ) : (
                  <>
                    <span>Secure Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 text-center">
              <span className="text-[11px] text-slate-400">
                Protected by 256-bit SSL Financial Grade Encryption
              </span>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Security Notice */}
      <footer className="bg-white border-t border-slate-200 py-3 text-center text-xs text-slate-500 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 VittRakshak Financial Intelligence System. All rights reserved.</span>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <span className="hover:underline cursor-pointer">Security Protocol</span>
            <span className="hover:underline cursor-pointer font-bold text-blue-900">VittRakshak Portal</span>
            <span className="hover:underline cursor-pointer">RBI FIU Directives</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
