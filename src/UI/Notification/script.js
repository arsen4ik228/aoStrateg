// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {  
//       navigator.serviceWorker.register('/PWA/sw.js').then(
//         function(registration) {
//           // Registration was successful
//           console.log('ServiceWorker registration successful with scope: ', registration.scope); },
//         function(err) {
//           // registration failed :(
//           console.log('ServiceWorker registration failed: ', err);
//         });
//     });
//    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// В вашем основном JavaScript файле
// if ('serviceWorker' in navigator && 'PushManager' in window) {
//     navigator.serviceWorker.register('/PWA/sw.js')
//     .then(function(registration) {
//         console.log('ServiceWorker registration successful with scope: ', registration.scope); 
//         return registration.pushManager;
//       })
//     .then(function(pushManager) {
//         if (pushManager) {
//             // Теперь мы уверены, что pushManager существует
//             return pushManager.requestPermission();
//         } else {
//             throw new Error('pushManager is not available');
//         }
//       })
//     .then(function(permission) {
//         if (permission === 'granted') {
//           console.log('Разрешено показывать уведомления');
//           // Здесь вы можете добавить логику для отправки уведомлений через Service Worker
//         } else {
//           console.log('Не разрешено показывать уведомления');
//         }
//       })
//     .catch(function(error) {
//         console.error('Ошибка при запросе разрешения на уведомления:', error);
//       });
// }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("No support for service worker!");
    }

    if (!('Notification' in window)) {
        throw new Error("No support for notification API");
    }

    if (!('PushManager' in window)) {
        throw new Error("No support for Push API");
    }
};
const registerSW = async () => {
    console.log('Registering Service Worker...');

    try {
        // Получаем список всех зарегистрированных Service Worker'ов
        const registrations = await navigator.serviceWorker.getRegistrations();

        // Проходимся по всем зарегистрированным Service Worker'ов и удаляем их
        for (const registration of registrations.values()) {
            await registration.unregister();
        }

        // Регистрируем новый Service Worker
        const registration = await navigator.serviceWorker.register('https://24academy.ru/PWA/sw.js');
        
        console.log('Service Worker registered with scope:', registration.scope);

        // Ожидаем активации Service Worker
        const registrationReady = await navigator.serviceWorker.ready;
        console.log('Service Worker is ready.');

        return registrationReady;
    } catch (err) {
        console.error('Service Worker registration failed:', err);
    }
};

// const registerSW = async () => {
//     console.log('Registering Service Worker...');
//     try {
//         const registration = await navigator.serviceWorker.register('https://24academy.ru/PWA/sw.js');
//         console.log('Service Worker registered with scope:', registration.scope);

//         // Ожидаем активации Service Worker
//         const registrationReady = await navigator.serviceWorker.ready;
//         console.log('Service Worker is ready.');

//         return registrationReady;
//     } catch (err) {
//         console.error('Service Worker registration failed:', err);
//     }
// };
const sendMessageToSW = async (accountId) => {
    console.log(`Отправка сообщения ${accountId}`);
    try {
        // Получаем все зарегистрированные Service Worker
        const registrations = await navigator.serviceWorker.getRegistrations();

        // Проверяем, есть ли среди них активные
        let activeSWFound = false;
        registrations.forEach(registration => {
            if (registration.active) {
                activeSWFound = true;
                console.log('Найден активный сервис воркер');
                console.log(`значение перед отправкой ${accountId}`);
                // Отправляем сообщение в активный Service Worker
                registration.active.postMessage({
                    type: 'SET_ACCOUNT_ID',
                    data: { accountId },
                });
            }
        });

        if (!activeSWFound) {
            console.log('Не нашла активного сервис воркера');
        }
        
    } catch (err) {
        console.error('Ошибка при отправке сообщения в Service Worker:', err);
    }
};




const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission!== 'granted') {
        throw new Error("Notification permission not granted");
    }
};

const main = async (accountId) => {
    checkPermission();
    await requestNotificationPermission();
    console.log(`in Main ${accountId}`);
    // Передаем accountId в registerSW
    sendMessageToSW(accountId);
};

export { main };


