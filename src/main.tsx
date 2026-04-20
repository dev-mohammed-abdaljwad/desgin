
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
  import { registerServiceWorker } from "./utils/pwa.ts";

  createRoot(document.getElementById("root")!).render(<App />);

  // Register PWA service worker
  if (import.meta.env.PROD) {
    registerServiceWorker({
      onSuccess: () => {
        if (import.meta.env.DEV) console.log('PWA ready for offline use!');
      },
      onUpdate: () => {
        if (import.meta.env.DEV) console.log('New version available!');
      },
      onError: (error) => {
        if (import.meta.env.DEV) console.error('PWA registration failed:', error);
      },
    });
  }
  