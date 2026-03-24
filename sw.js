// Service Worker لإدارة الإشعارات
self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
    event.waitUntil(clients.claim());
});

// استقبال الإشعارات
self.addEventListener('push', (event) => {
    console.log('Push received:', event);
    
    let notificationData = {
        title: '📢 إشعار جديد',
        body: 'لديك رسالة جديدة',
        icon: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
        vibrate: [200, 100, 200]
    };
    
    if (event.data) {
        try {
            const data = event.data.json();
            notificationData.title = data.title || notificationData.title;
            notificationData.body = data.body || notificationData.body;
            if (data.icon) notificationData.icon = data.icon;
        } catch (e) {
            // إذا كانت البيانات نص عادي
            notificationData.body = event.data.text();
        }
    }
    
    event.waitUntil(
        self.registration.showNotification(notificationData.title, {
            body: notificationData.body,
            icon: notificationData.icon,
            badge: notificationData.badge,
            vibrate: notificationData.vibrate,
            requireInteraction: true
        })
    );
});

// الضغط على الإشعار
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
