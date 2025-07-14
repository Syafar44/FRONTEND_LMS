import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { MdOutlineInstallMobile } from "react-icons/md";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler as EventListener);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Cast ke BeforeInstallPromptEvent
    const promptEvent = deferredPrompt as any;
    promptEvent.prompt();

    const { outcome } = await promptEvent.userChoice;
    if (outcome === "accepted") {
      console.log("PWA installed");
    } else {
      console.log("PWA install dismissed");
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  // Optional: tampilkan hanya di layar kecil (mobile)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (!isInstallable || !isMobile) return null;

  return (
    <Button
      startContent={<MdOutlineInstallMobile size={20} />}
      onPress={handleInstall}
      color="primary"
      fullWidth
      variant="light"
      className="flex justify-start rounded-lg px-2 py-1.5 bg-black/70"
      size="lg"
    >
      Install Aplikasi
    </Button>
  );
};

export default InstallButton;