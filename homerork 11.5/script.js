const chatbox = document.getElementById('chatbox');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const locationButton = document.getElementById('locationButton');
let websocket;

// Подключение к WebSocket серверу
window.onload = function () {
    websocket = new WebSocket('wss://echo-ws-service.herokuapp.com');
    websocket.onmessage = function (event) {
        const message = event.data;
        addToChat(message, 'server-response');
    };
}

// Отправка сообщения на сервер при нажатии кнопки "Отправить"
sendButton.onclick = function () {
    const message = messageInput.value;
    websocket.send(message);
    addToChat(message, 'message');
    messageInput.value = '';
};

// Отправка геолокации на сервер при нажатии кнопки "Геолокация"
locationButton.onclick = function () {
    if (!navigator.geolocation) {
        addToChat('Геолокация не поддержается вашим браузером', 'server-response');
    } 
    
    else {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const locationURL = 'https://www.openstreetmap.org/#map=18/' + latitude + '/' + longitude;
            const locationLink = document.createElement('a');
            locationLink.textContent = 'Геолокация';
            locationLink.href = locationURL;
            locationLink.target = '_blank'; 
            locationLink.style.color =('yellow');
            const messageElement = document.createElement('p');
            messageElement.classList.add('message');
            messageElement.appendChild(locationLink);
            chatbox.appendChild(messageElement);
        }, error => {
            addToChat(`Ошибка при получении геолокации: ${error.message}`, 'server-response');
        });
    }
};


// Функция добавления сообщения в чат с указанием класса для стилей
function addToChat(message, className) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.className = className;
    chatbox.appendChild(messageElement);
}
