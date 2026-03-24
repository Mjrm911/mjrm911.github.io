self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: 'icon.png', // حط أي صورة تبيها أيقونة
        badge: 'icon.png'
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
