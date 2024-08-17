
import React, { useState } from 'react';
import Header from './Header';
import TabsComponent from './Tabs';
import NotificationPrompt from '../Notification/NotificationPromt';

export default function New(props) {
    const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);

    return (
        <div>
            <Header onNotificationClick={() => setShowNotificationPrompt(true)} />
            {showNotificationPrompt && <NotificationPrompt onClose={() => setShowNotificationPrompt(false)} />}
            <TabsComponent />
            {props.children}
        </div>
    );
}
