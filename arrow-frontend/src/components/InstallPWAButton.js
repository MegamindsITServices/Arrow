import React, { useState, useEffect } from "react";
import { LuDownload } from "react-icons/lu";
const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("PWA installed");
      } else {
        console.log("PWA installation rejected");
      }
      // Clear the deferred prompt
      setDeferredPrompt(null);
      // Hide the install button
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <button onClick={handleInstallClick} className="install-app">
        <img src="/logo-new.png" />
        Download App Here
      </button>
    </>
  );
};

export default InstallPWAButton;
