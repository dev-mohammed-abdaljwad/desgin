/**
 * Service Worker Registration
 * Handles registration and lifecycle of the service worker
 */

export interface ServiceWorkerOptions {
  onSuccess?: () => void;
  onUpdate?: () => void;
  onError?: (error: Error) => void;
}

let registration: ServiceWorkerRegistration | null = null;

/**
 * Register the service worker
 */
export async function registerServiceWorker(options: ServiceWorkerOptions = {}) {
  const { onSuccess, onUpdate, onError } = options;

  // Check if service workers are supported
  if (!('serviceWorker' in navigator)) {
    console.warn('[PWA] Service Workers are not supported in this browser');
    return;
  }

  try {
    // Register the service worker
    registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
    });

    console.log('[PWA] Service Worker registered successfully');

    // Check for updates periodically
    const checkForUpdates = () => {
      registration?.update().catch((err) => {
        console.error('[PWA] Error checking for SW updates:', err);
      });
    };

    // Check for updates every hour
    setInterval(checkForUpdates, 60 * 60 * 1000);

    // Listen for service worker updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration!.installing;

      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (
            newWorker.state === 'installed' &&
            navigator.serviceWorker.controller
          ) {
            // New service worker is ready
            console.log('[PWA] New Service Worker is ready for activation');
            onUpdate?.();
            promptUserToRefresh();
          }
        });
      }
    });

    // Service worker is active
    if (registration.active) {
      onSuccess?.();
    }
  } catch (error) {
    console.error('[PWA] Service Worker registration failed:', error);
    const err =
      error instanceof Error
        ? error
        : new Error('Service Worker registration failed');
    onError?.(err);
  }
}

/**
 * Unregister the service worker
 */
export async function unregisterServiceWorker() {
  if (!registration) {
    return;
  }

  try {
    const success = await registration.unregister();
    if (success) {
      console.log('[PWA] Service Worker unregistered successfully');
      registration = null;
    }
  } catch (error) {
    console.error('[PWA] Error unregistering Service Worker:', error);
  }
}

/**
 * Check if app is installed as PWA
 */
export function isPWAInstalled(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.warn('[PWA] Notifications are not supported');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

/**
 * Send a notification
 */
export async function sendNotification(title: string, options?: NotificationOptions) {
  if (!('serviceWorker' in navigator) || !registration) {
    console.warn('[PWA] Cannot send notification - Service Worker not available');
    return;
  }

  try {
    if ('showNotification' in registration) {
      await registration.showNotification(title, {
        icon: '/icons/icon-192x192.png',
        ...options,
      });
    }
  } catch (error) {
    console.error('[PWA] Error sending notification:', error);
  }
}

/**
 * Clear cached data
 */
export async function clearCache() {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map((cacheName) => caches.delete(cacheName))
    );
    console.log('[PWA] Cache cleared successfully');
  } catch (error) {
    console.error('[PWA] Error clearing cache:', error);
  }
}

/**
 * Get cache size
 */
export async function getCacheSize(): Promise<number> {
  try {
    const cacheNames = await caches.keys();
    let totalSize = 0;

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      totalSize += keys.length;
    }

    return totalSize;
  } catch (error) {
    console.error('[PWA] Error getting cache size:', error);
    return 0;
  }
}

/**
 * Prompt user to refresh for new version
 */
function promptUserToRefresh() {
  // Create a simple toast/notification
  const message = document.createElement('div');
  message.id = 'pwa-update-prompt';
  message.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #3B82F6;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    z-index: 9999;
    display: flex;
    gap: 12px;
    align-items: center;
  `;

  const text = document.createElement('span');
  text.textContent = 'A new version is available!';

  const refreshBtn = document.createElement('button');
  refreshBtn.textContent = 'Refresh';
  refreshBtn.style.cssText = `
    background: white;
    color: #3B82F6;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    font-size: 12px;
  `;

  refreshBtn.addEventListener('click', () => {
    window.location.reload();
  });

  message.appendChild(text);
  message.appendChild(refreshBtn);
  document.body.appendChild(message);

  // Auto-remove after 10 seconds
  setTimeout(() => {
    message.remove();
  }, 10000);
}

/**
 * Get service worker registration
 */
export function getServiceWorkerRegistration(): ServiceWorkerRegistration | null {
  return registration;
}

/**
 * Update the service worker
 */
export async function updateServiceWorker() {
  if (registration) {
    try {
      await registration.update();
      console.log('[PWA] Checked for Service Worker updates');
    } catch (error) {
      console.error('[PWA] Error updating Service Worker:', error);
    }
  }
}

export {};
