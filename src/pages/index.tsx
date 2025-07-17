// pages/index.tsx atau pages/home.tsx
import { useEffect } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Home from "@/components/views/Home";
import { messaging } from "@/libs/firebase/firebase";
import { getToken, onMessage } from "firebase/messaging";
import notificationServices from "@/services/notification.service";

const vapidKey = "BGmsAEwr712NpkltGTVSX_oWSMn3vqrSyJN9sY2o5jCQiVUGFDoz2b2VNFCOh3_gD4f_q-pIEynSuEyPrz8c3rg";

const useFCM = () => {

  const addToken = async (currentToken: string) => {
    await notificationServices.token({
      token: currentToken,
    })
  }

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    // ✅ Register service worker
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then(async (registration) => {
        console.log("✅ SW registered:", registration);

        try {
          if (messaging) {
            const currentToken = await getToken(messaging, {
              vapidKey,
              serviceWorkerRegistration: registration,
            });

            if (currentToken) {
              console.log("📲 Push Token:", currentToken);
              addToken(currentToken);
            } else {
              console.warn("⚠️ Token not found. User might have blocked notifications.");
            }
          } else {
            console.warn("⚠️ Firebase messaging is not initialized.");
          }
        } catch (err) {
          console.error("❌ Error getting token:", err);
        }
      })
      .catch((err) => {
        console.error("❌ SW registration failed:", err);
      });

    // ✅ Optional: Handle foreground messages
    if (messaging) {
      onMessage(messaging, (payload) => {
        console.log("📩 Message received in foreground:", payload);
      });
    }
  }, []);
};

const HomePage = () => {
  useFCM();

  return (
    <DashboardLayout type="user" title="LMS Panglima">
      <Home />
    </DashboardLayout>
  );
};

export default HomePage;
