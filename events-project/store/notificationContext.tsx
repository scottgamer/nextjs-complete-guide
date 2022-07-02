import { createContext, FC, useEffect, useState } from "react";

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

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

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
