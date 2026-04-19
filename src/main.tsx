
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
  import { registerServiceWorker } from "./utils/pwa.ts";

  createRoot(document.getElementById("root")!).render(<App />);

  // Register PWA service worker
  if (import.meta.env.PROD) {
    registerServiceWorker({
      onSuccess: () => {
        console.log('PWA ready for offline use!');
      },
      onUpdate: () => {
        console.log('New version available!');
      },
      onError: (error) => {
        console.error('PWA registration failed:', error);
      },
    });
  }
  