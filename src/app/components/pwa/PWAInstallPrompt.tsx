/**
 * PWA Install Prompt Component
 * Shows install prompts for different platforms using toast notifications
 */

import { useState, useEffect } from 'react';
import { Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (globalThis.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Detect iOS
    const isAppleDevice = /iPad|iPhone|iPod/.test(globalThis.navigator.userAgent);
    setIsIOS(isAppleDevice);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    globalThis.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      console.log('[PWA] App installed successfully!');
    };

    globalThis.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      globalThis.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      globalThis.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`[PWA] User response: ${outcome}`);
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        toast.success('App installed successfully!', {
          description: 'You can now access the app from your home screen.',
        });
      }
      setShowPrompt(false);
    } catch (error) {
      console.error('[PWA] Installation failed:', error);
      toast.error('Installation failed', {
        description: 'Please try again',
      });
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  // Show toast notification for iOS
  useEffect(() => {
    if (isIOS && !isInstalled && showPrompt) {
      toast.info('Install App', {
        description: 'Tap the Share button, then select "Add to Home Screen"',
        duration: Infinity,
        action: {
          label: <Share2 className="w-4 h-4" />,
          onClick: () => {},
        },
      });
      setShowPrompt(false);
    }
  }, [isIOS, isInstalled, showPrompt]);

  // Show toast notification for Android/Desktop
  useEffect(() => {
    if (deferredPrompt && showPrompt && !isInstalled && !isIOS) {
      toast({
        description: 'Install this app to your device for quick access and offline use.',
        action: {
          label: 'Install',
          onClick: handleInstall,
        },
        duration: Infinity,
      });
      setShowPrompt(false);
    }
  }, [deferredPrompt, showPrompt, isInstalled, isIOS]);

  return null;
}
