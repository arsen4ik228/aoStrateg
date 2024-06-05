import React,{useState, useEffect} from 'react'
import style from './Main.module.css'
import logo from './src/logo.svg'
import telegram from './src/telegram.svg'
import { Link } from 'react-router-dom'
import axios from "axios";
export default function Main() {
 
  const [data, setData] = useState({ token: "", sessionId: "" });
  const [ws, setWs] = useState(null); // Добавляем состояние для WebSocket соединения

  useEffect(() => {
    // Функция для выполнения GET запроса
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/homepage"
        );
        // Обновляем состояние с полученными данными
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Вызываем функцию fetchData при монтировании компонента
    fetchData();
  }, []); // Убрано зависимость от data.sessionId, так как fetchData вызывается один раз при монтировании

  useEffect(() => {
    // Устанавливаем WebSocket соединение после получения данных
    if (data.sessionId) {
      const wsUrl = `ws://localhost:3002?sessionId=${data.sessionId}`;
      const wsConnection = new WebSocket(wsUrl);

      setWs(wsConnection); // Сохраняем WebSocket соединение в состоянии

      // Обработка событий WebSocket соединения
      wsConnection.onopen = () => {
        console.log("WebSocket соединение открыто");
      };

      wsConnection.onmessage = (event) => {
        console.log("Получено сообщение:", event.data);
        // Анализируем полученное сообщение
        const message = JSON.parse(event.data);

        console.log(message.message);
        if (message !== "false") {
          // Если сообщение не равно 'false', выполняем редирект
          window.location.href = `#/${message.message}`;
        } else {
          // Если сообщение равно 'false', выводим ошибку
          alert("Ошибка аутентификации");
        }
      };

      wsConnection.onclose = () => {
        console.log("WebSocket соединение закрыто");
      };

      // Очистка при размонтировании компонента
      return () => {
        wsConnection.close();
      };
    }
  }, [data.sessionId]); // Зависимость от sessionId, чтобы обновлять соединение при изменении sessionId

  const qrUrl = `https://t.me/AcademyStrategBot?start=${data.token}-${data.sessionId}`;
 

  return (

    <div className={style.Container}>
      <div className={style.background}></div>
      <div className={style.logoContainer}>
        <img src={logo} alt="Логотип компании" />
      </div>

      <div className={style.textContainer}>
        <img src={telegram} alt="Telegram" />
        {/* <a href={qrUrl} target="_blank" rel="noopener noreferrer" className={style.link}>Войти через Telegram</a> */}
       <Link to="6ac81119-f508-48ec-9d4a-6fb3328731c6"> <div>ВОЙТИ</div> </Link>
      </div>
    </div>
  )
}
