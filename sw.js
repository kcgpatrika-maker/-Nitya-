// sw.js - Nitya Firebase Push Service Worker
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDjAvO2qgVOayDKAD6QJEWsxk10LxTfEg0",
  authDomain: "newsrecordapp.firebaseapp.com",
  projectId: "newsrecordapp",
  storageBucket: "newsrecordapp.firebasestorage.app",
  messagingSenderId: "337331252704",
  appId: "1:337331252704:web:6ca5ea78d6c2668e120f85",
  measurementId: "G-21MEFYPXW3"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// बैकग्राउंड में नोटिफिकेशन आने पर
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification ? payload.notification.title : 'Nitya Reminder';
  const notificationOptions = {
    body: payload.notification ? payload.notification.body : 'आपका समय हो गया है।',
    icon: 'icon.png',
    badge: 'icon.png',
    vibrate: [300, 100, 300, 100, 400],
    tag: 'nitya-notification',
    renotify: true,
    requireInteraction: true
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('/');
    })
  );
});
