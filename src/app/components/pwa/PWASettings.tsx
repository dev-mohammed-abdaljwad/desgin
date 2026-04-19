/**
 * PWA Settings Component
 * Show PWA status and provide app management options
 */

import React, { useState, useEffect } from 'react';
import { Trash2, RefreshCw, Info, Download, Wifi, WifiOff } from 'lucide-react';
import {
  isPWAInstalled,
  getServiceWorkerRegistration,
  clearCache,
  getCacheSize,
  updateServiceWorker,
  requestNotificationPermission,
  sendNotification,
} from '@/utils/pwa';

export function PWASettings() {
  const [isInstalled, setIsInstalled] = useState(false);
  const [cacheSize, setCacheSize] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasNotificationPermission, setHasNotificationPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check installation status
    setIsInstalled(isPWAInstalled());

    // Load cache size
    loadCacheSize();

    // Listen for online/offline
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    // Check notification permission
    if ('Notification' in window) {
      setHasNotificationPermission(Notification.permission === 'granted');
    }

    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    };
  }, []);

  const loadCacheSize = async () => {
    const size = await getCacheSize();
    setCacheSize(size);
  };

  const handleClearCache = async () => {
    if (!confirm('Clear all cached data? This will remove offline content.')) {
      return;
    }

    setIsLoading(true);
    try {
      await clearCache();
      setCacheSize(0);
      alert('Cache cleared successfully');
    } catch (error) {
      alert('Failed to clear cache');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckUpdates = async () => {
    setIsLoading(true);
    try {
      const registration = getServiceWorkerRegistration();
      if (registration) {
        await registration.update();
        alert('Checked for updates');
      }
    } catch (error) {
      alert('Failed to check for updates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestNotifications = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setHasNotificationPermission(true);
      // Send test notification
      sendNotification('Notifications Enabled!', {
        body: 'You will now receive notifications from EduPlatform',
      });
    }
  };

  const handleTestNotification = async () => {
    await sendNotification('Test Notification', {
      body: 'This is a test notification from EduPlatform',
      tag: 'test',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-6">App Settings</h2>

      {/* Installation Status */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Installation</h3>
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <Download className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-gray-900">
              {isInstalled ? 'Installed as App' : 'Not Installed'}
            </p>
            <p className="text-sm text-gray-600">
              {isInstalled
                ? 'Running as a standalone application'
                : 'Install from your browser menu'}
            </p>
          </div>
        </div>
      </div>

      {/* Online Status */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Connection</h3>
        <div
          className={`flex items-center gap-3 p-3 rounded-lg ${
            isOnline ? 'bg-green-50' : 'bg-red-50'
          }`}
        >
          {isOnline ? (
            <Wifi className="w-5 h-5 text-green-600" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-600" />
          )}
          <div>
            <p className="font-medium text-gray-900">
              {isOnline ? 'Online' : 'Offline'}
            </p>
            <p className="text-sm text-gray-600">
              {isOnline
                ? 'Connected to the internet'
                : 'Using cached content'}
            </p>
          </div>
        </div>
      </div>

      {/* Cache Management */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Storage</h3>
        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <p className="text-sm text-gray-600">Cached Items</p>
          <p className="text-2xl font-bold text-gray-900">{cacheSize}</p>
        </div>
        <button
          onClick={handleClearCache}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear Cache
        </button>
      </div>

      {/* Update Check */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Updates</h3>
        <button
          onClick={handleCheckUpdates}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Check for Updates
        </button>
      </div>

      {/* Notifications */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Notifications</h3>
        {!hasNotificationPermission ? (
          <button
            onClick={handleRequestNotifications}
            className="w-full px-4 py-2 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg font-medium transition-colors"
          >
            Enable Notifications
          </button>
        ) : (
          <button
            onClick={handleTestNotification}
            className="w-full px-4 py-2 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg font-medium transition-colors"
          >
            Send Test Notification
          </button>
        )}
      </div>

      {/* App Info */}
      <div className="border-t pt-6">
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <Info className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900 mb-1">About</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Offline support enabled</li>
              <li>• Smart caching system</li>
              <li>• Installable app</li>
              <li>• Fast load times</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
