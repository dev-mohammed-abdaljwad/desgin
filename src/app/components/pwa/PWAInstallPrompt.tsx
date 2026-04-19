/**
 * PWA Install Prompt Component
 * Shows install prompts for different platforms
 */

import { useState, useEffect } from 'react';
import { X, Download, Share2 } from 'lucide-react';

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
      }
      setShowPrompt(false);
    } catch (error) {
      console.error('[PWA] Installation failed:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  // iOS Installation Instructions
  if (isIOS && !isInstalled && showPrompt) {
    return (
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-50 border border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Install App</h3>
          <button
            onClick={handleDismiss}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Tap <Share2 className="w-4 h-4 inline" /> then "Add to Home Screen"
        </p>
        <button
          onClick={handleDismiss}
          className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition-colors text-sm font-medium"
        >
          Got it
        </button>
      </div>
    );
  }

  // Android/Desktop Installation Prompt
  if (deferredPrompt && showPrompt && !isInstalled && !isIOS) {
    return (
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-50 border border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Install App</h3>
          <button
            onClick={handleDismiss}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Install this app to your device for quick access and offline use.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDismiss}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            Later
          </button>
          <button
            onClick={handleInstall}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Install
          </button>
        </div>
      </div>
    );
  }

  // Success message
  if (isInstalled && !showPrompt) {
    return null; // Don't show if already installed
  }

  return null;
}
