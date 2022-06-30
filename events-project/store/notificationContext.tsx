import { createContext, FC, useState } from "react";

export interface Notification {
  title: string;
  message: string;
  status: string;
}

interface NotificationContextValue {
  notification: Notification | null;
  showNotification: (notification: Notification) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextValue>({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
});

export const NotificationProvider: FC = ({ children }) => {
  const [activeNotification, setActiveNotification] =
    useState<Notification | null>(null);

  const showNotification = (notification: Notification) => {
    setActiveNotification(notification);
  };

  const hideNotification = () => {
    setActiveNotification(null);
  };

  const context: NotificationContextValue = {
    notification: activeNotification,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
