import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => {
      // If more than 10 notifications, remove the oldest
      const updatedNotifications = [...prevNotifications, notification];
      if (updatedNotifications.length > 3) {
        updatedNotifications.shift(); // Remove the first (oldest) notification
      }
      return updatedNotifications;
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        anchorEl,
        addNotification,
        handleClick,
        handleClose,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
