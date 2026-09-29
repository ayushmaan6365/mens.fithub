import React, { useState, useEffect } from 'react';

export interface AuthScreenProps {
  initialMode?: 'login' | 'register';
  onSuccess?: (user: { email: string; name?: string }) => void;
  onClose?: () => void;
  brandName?: string;
  returnUrl?: string;
}

/**
 * Decorative Flower2 icon (Lucide equivalent)
 */
export const Flower2Icon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5 text-white/80' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1m0 3a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1m-3-3a3 3 0 1 1-3-3m3 3a3 3 0 1 0-3 3m3-3h1m3 0a3 3 0 1 1 3 3m-3-3a3 3 0 1 0 3-3m-3 3h1"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

/**
 * Standard 4-Color Google 'G' Mark
 */
export const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"/>
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.27 21.36 7.35 24 12 24z"/>
    <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.13z"/>
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"/>
  </svg>
);

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialMode = 'login',
  onSuccess,
  onClose,
  brandName = "Men's Fit Hub",
  returnUrl = '/'
}) => {
  const [isRegister, setIsRegister] = useState<boolean>(initialMode === 'register');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    // Entrance animation trigger
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = { email, name: email.split('@')[0] };
      try {
        localStorage.setItem('mfh_customer_user', JSON.stringify(user));
      } catch (err) {
        console.warn('Storage unavailable', err);
      }

      if (onSuccess) {
        onSuccess(user);
      } else {
        window.location.href = returnUrl;
      }
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const googleUser = { email: 'alex.morgan@gmail.com', name: 'Alex Morgan' };
      try {
        localStorage.setItem('mfh_customer_user', JSON.stringify(googleUser));
      } catch (err) {
        console.warn('Storage unavailable', err);
      }

      if (onSuccess) {
        onSuccess(googleUser);
      } else {
        window.location.href = returnUrl;
      }
    }, 700);
  };

  return (
    <div className="relative w-full h-screen min-h-[640px] overflow-hidden flex flex-col justify-between select-none">
      {/* =======================================================
          1. MOTION VIDEO BACKDROP & AMBIENT OVERLAY
          ======================================================= */}
      <div 
        className={`fixed inset-0 w-full h-full transition-all duration-[1400ms] ${
          isMounted ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260819_212700_3bb9329b-5c50-4257-a09b-ca85cf3654a3.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Soft dark tint with backdrop blur */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
      </div>

      {/* =======================================================
          2. MINIMAL BRAND HEADER
          ======================================================= */}
      <header className="h-16 md:h-20 w-full max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between z-10 relative">
        <a 
          href={returnUrl} 
          className="text-white text-xl md:text-2xl font-semibold tracking-tight hover:opacity-90 transition-opacity"
        >
          {brandName}
        </a>

        <div className="flex items-center gap-4">
          {/* Subtle accent Flower2 icon */}
          <div className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
            <Flower2Icon className="w-5 h-5 text-white/90" />
          </div>

          {onClose && (
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              title="Close and return to store"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* =======================================================
          3. AUTHENTICATION CARD (CENTERED VIEWPORT)
          ======================================================= */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 z-10 relative py-8">
        <div 
          className={`w-full max-w-[420px] bg-white rounded-3xl p-8 sm:p-10 shadow-2xl transition-all duration-700 ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {/* Header Block */}
          <div className="mb-6">
            <h1 className="text-[30px] font-bold text-gray-900 tracking-tight leading-tight mb-2">
              {isRegister ? 'Create Account' : 'Welcome Back!'}
            </h1>
            <p className="text-gray-500 text-sm">
              {isRegister ? (
                <>
                  <span className="font-semibold text-gray-800">Sign up</span> to continue monitoring your signals.
                </>
              ) : (
                <>
                  <span className="font-semibold text-gray-800">Log in</span> to continue monitoring your signals.
                </>
              )}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Eg. johndoe@gmail.com"
                required
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/70 text-gray-900 placeholder-gray-400 text-sm outline-none focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
              />
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 rounded-full bg-[#1e2530] hover:bg-[#151a22] text-white text-sm font-medium flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isRegister ? 'Sign Up' : 'Login'}</span>
                  <span>-&gt;</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <span className="relative text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-white px-3">
              OR
            </span>
          </div>

          {/* Social Sign-In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all active:scale-[0.99] cursor-pointer"
          >
            <GoogleIcon className="w-4 h-4" />
            <span>Sign in with Google</span>
          </button>

          {/* Footer Switch Link */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setErrorMsg('');
              }}
              className="text-xs text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              {isRegister ? (
                <>
                  Already have an account? <span className="underline font-bold text-gray-900">Log In</span>
                </>
              ) : (
                <>
                  Don't have an account? <span className="underline font-bold text-gray-900">Start Free</span>
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Empty bottom spacer for symmetrical vertical balance */}
      <footer className="h-6 w-full z-10" />
    </div>
  );
};

export default AuthScreen;
