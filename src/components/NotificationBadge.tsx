import React from "react";
import { Badge, IconButton } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { NotificationResponseItem } from "../models";

export interface NotificationBadgeProps {
  notifications?: NotificationResponseItem[];
  className?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  notifications,
  className,
}) => {
  const notificationCount = notifications ? notifications.length : 0;

  return (
    <IconButton
      color="inherit"
      component={RouterLink as any}
      to="/notifications"
      data-test="nav-top-notifications-link"
      size="large"
      className={className}
    >
      <Badge
        badgeContent={notificationCount > 0 ? notificationCount : undefined}
        data-test="nav-top-notifications-count"
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "red",
            color: "white",
          },
        }}
      >
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};

export default NotificationBadge;
