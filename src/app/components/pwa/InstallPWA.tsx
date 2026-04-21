/**
 * Premium PWA Install Prompt Component
 * Bilingual (Arabic/English) with smooth animations
 * Auto-detects installability and handles browser/iOS prompts
 */

import { useState, useEffect, useRef } from 'react';
import { X, Download, Zap, Bell, Wifi } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISSAL_KEY = 'pwa-install-dismissed';
const DISMISSAL_DAYS = 3;

export function InstallPWA() {
  const { t, dir } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Check if prompt was dismissed recently
  const isDismissedRecently = () => {
    const dismissedAt = localStorage.getItem(DISMISSAL_KEY);
    if (!dismissedAt) return false;
    const dismissTime = Number.parseInt(dismissedAt, 10);
    const now = Date.now();
    const dayInMs = DISMISSAL_DAYS * 24 * 60 * 60 * 1000;
    return now - dismissTime < dayInMs;
  };

  // Mark prompt as dismissed for N days
  const markAsDismissed = () => {
    localStorage.setItem(DISMISSAL_KEY, Date.now().toString());
  };

  // Check device type and OS
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isApple = /iphone|ipad|ipod/.test(userAgent);
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);

    setIsIOS(isApple);
    setIsMobile(isMobileDevice);

    // Check if already installed as PWA
    if (globalThis.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }
  }, []);

  // Listen for beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      
      // Don't show if recently dismissed
      if (isDismissedRecently()) {
        return;
      }

      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Use requestAnimationFrame for smooth entrance
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(() => {
        setIsVisible(true);
      });
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
      markAsDismissed();
    };

    globalThis.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    globalThis.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      globalThis.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      globalThis.removeEventListener('appinstalled', handleAppInstalled);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      setIsAnimatingOut(true);
      await new Promise(resolve => setTimeout(resolve, 300)); // Exit animation

      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsVisible(false);
        markAsDismissed();
      } else {
        setIsAnimatingOut(false);
      }
    } catch (error) {
      console.error('[PWA] Installation failed:', error);
      setIsAnimatingOut(false);
    }
  };

  const handleDismiss = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsAnimatingOut(false);
      markAsDismissed();
    }, 300);
  };

  // Handle iOS install prompt
  useEffect(() => {
    if (isIOS && isVisible && !isInstalled) {
      handleDismiss();
      // iOS users can still use "Add to Home Screen" from Safari menu
      console.log('[PWA] iOS detected - use Safari Share > Add to Home Screen');
    }
  }, [isIOS, isVisible, isInstalled]);

  // Don't render if not installable or already installed
  if (!isVisible || isInstalled || !deferredPrompt) {
    return null;
  }

  const isDesktop = !isMobile;

  return (
    <div className={`fixed inset-0 pointer-events-none z-50 ${isAnimatingOut ? 'animate-fade-out' : ''}`}>
      {/* Backdrop */}
      <button
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isAnimatingOut ? 'opacity-0' : 'opacity-20'
        } cursor-default`}
        onClick={handleDismiss}
        aria-label="Close install prompt"
        type="button"
      />

      {/* Mobile: Bottom Sheet */}
      {isMobile && (
        <div
          className={`absolute bottom-0 left-0 right-0 pointer-events-auto transition-all duration-400 ease-out ${
            isAnimatingOut ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <div className="w-full rounded-t-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-black border-t border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* Frosted glass effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative p-6 space-y-6">
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>

              {/* Header with icon */}
              <div className="flex items-start gap-4 pr-8">
                {/* App Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    📚
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-white mb-1">
                    {t('Install App', 'ثبّت التطبيق')}
                  </h2>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {t(
                      'Quick access from your home screen',
                      'وصول سريع من شاشتك الرئيسية'
                    )}
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3 bg-white/5 rounded-2xl p-4 border border-white/10">
                <Feature
                  icon={<Wifi className="w-4 h-4" />}
                  text={t('Works offline', 'يعمل بدون إنترنت')}
                />
                <Feature
                  icon={<Zap className="w-4 h-4" />}
                  text={t('Fast & lightweight', 'سريع وخفيف')}
                />
                <Feature
                  icon={<Bell className="w-4 h-4" />}
                  text={t('Push notifications', 'إشعارات فورية')}
                />
              </div>

              {/* Buttons */}
              <div className={`flex gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={handleInstall}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Download className="w-4 h-4" />
                  {t('Install Now', 'تثبيت الآن')}
                </button>
                <button
                  onClick={handleDismiss}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-all duration-200 border border-white/20 hover:border-white/30"
                >
                  {t('Maybe Later', 'لاحقاً')}
                </button>
              </div>

              {/* Bottom accent */}
              <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-50" />
            </div>
          </div>
        </div>
      )}

      {/* Desktop: Floating Card */}
      {isDesktop && (
        <div
          className={`fixed bottom-6 right-6 w-64 pointer-events-auto transition-all duration-400 ease-out ${
            isAnimatingOut ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl hover:shadow-indigo-500/20 hover:shadow-2xl transition-all duration-300">
            {/* Frosted glass effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative p-4 space-y-3">
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5 text-white/70" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-2 pr-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                  📚
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {t('Install App', 'ثبّت التطبيق')}
                  </h3>
                  <p className="text-xs text-white/60">
                    {t('Quick access', 'وصول سريع')}
                  </p>
                </div>
              </div>

              {/* Mini features */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-white/70">
                  <Wifi className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                  <span className="truncate">{t('Works offline', 'يعمل بدون إنترنت')}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Zap className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                  <span className="truncate">{t('Fast & light', 'سريع وخفيف')}</span>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={handleInstall}
                className="w-full px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-xs font-semibold rounded-md transition-all duration-200 transform hover:scale-95 active:scale-90"
              >
                {t('Install', 'تثبيت')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Feature item component with icon and text
 */
function Feature({ icon, text }: Readonly<{ icon: React.ReactNode; text: string }>) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-indigo-400 flex-shrink-0">{icon}</div>
      <span className="text-white/80 text-sm">{text}</span>
    </div>
  );
}
