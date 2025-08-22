import React from "react";
import { Badge } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";

export interface NotificationBadgeProps {
  count?: number;
  className?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count, className }) => {
  return (
    <Badge
      badgeContent={count && count > 0 ? count : undefined}
      data-test="nav-top-notifications-count"
      classes={{ badge: className }}
    >
      <NotificationsIcon />
    </Badge>
  );
};

export default NotificationBadge;
