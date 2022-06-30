import { FC, useContext } from "react";
import NotificationContext from "../../store/notificationContext";
import Notification from "../UI/Notification";
import MainHeader from "./MainHeader";

const Layout: FC = ({ children }) => {
  const { showNotification, hideNotification, notification } =
    useContext(NotificationContext);

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {notification ? (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      ) : null}
    </>
  );
};

export default Layout;
