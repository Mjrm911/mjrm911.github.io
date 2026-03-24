// هذا الكود يجبر المتصفح على تحديث نفسه فوراً
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'حان وقت الذكر',
        icon: 'icon.png',
        badge: 'icon.png'
    };
    event.waitUntil(self.registration.showNotification('تطبيق الأذكار', options));
});
