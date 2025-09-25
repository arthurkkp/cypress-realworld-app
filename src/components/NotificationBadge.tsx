import React from "react";
import { Badge } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";

interface NotificationBadgeProps {
  count?: number;
  className?: string;
  "data-test"?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  className,
  "data-test": dataTest,
}) => {
  return (
    <Badge
      badgeContent={count && count > 0 ? count : undefined}
      data-test={dataTest}
      classes={{ badge: className }}
    >
      <NotificationsIcon />
    </Badge>
  );
};

export default NotificationBadge;
