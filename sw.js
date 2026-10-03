// sw.js - Nitya Web Push Service Worker
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// सर्वर या बैकग्राउंड से पुश मैसेज आने पर
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : { title: 'Nitya', body: 'आपका रिमाइंडर समय हो गया है।' };
    
    const options = {
        body: data.body,
        icon: 'icon.png',
        badge: 'icon.png',
        vibrate: [300, 100, 300, 100, 400],
        tag: 'nitya-notification',
        renotify: true,
        requireInteraction: true,
        data: { url: data.url || '/' }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// नोटिफिकेशन पर टैप/क्लिक करने पर ऐप खोलना
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
