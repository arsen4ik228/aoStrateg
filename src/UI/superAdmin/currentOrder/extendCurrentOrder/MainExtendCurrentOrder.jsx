import React, {useState} from 'react'
import Header from './Header'
import ExtendCurrent from './ExtendCurrent'
import Orders from './Orders'
import NotificationPrompt from '../../../Notification/NotificationPromt'
export default function MainExtendCurrentOrder() {
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);

  return (
    <>
    <Header></Header>
    <Header onNotificationClick={() => setShowNotificationPrompt(true)} />
            {showNotificationPrompt && <NotificationPrompt onClose={() => setShowNotificationPrompt(false)} />}
    {/* <ExtendCurrent></ExtendCurrent> */}
    <Orders></Orders>
    </>
  )
}
