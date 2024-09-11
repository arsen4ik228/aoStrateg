import React, {useState} from 'react'
import Header from './Header';
import Work from './Work';
import NotificationPrompt from "../../Notification/NotificationPromt";
 function MainCurrentOrder() {

     const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);
  return (
    <>
        <Header onNotificationClick={() => setShowNotificationPrompt(true)}></Header>
        {showNotificationPrompt && <NotificationPrompt onClose={() => setShowNotificationPrompt(false)} />}
    <Work></Work>
    
    </>
  )
}
export default MainCurrentOrder;