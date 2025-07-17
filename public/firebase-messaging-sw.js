importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyADUMoFLERmxV6G3Vtuwrf07EdvXSwzg80",
  authDomain: "lms-panglima-3f500.firebaseapp.com",
  projectId: "lms-panglima-3f500",
  storageBucket: "lms-panglima-3f500.firebasestorage.app",
  messagingSenderId: "1015241124443",
  appId: "1:1015241124443:web:c968577b9b76b5f34f2d7e",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icons/icon-192x192.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
