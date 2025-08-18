import React from "react";
import { Badge, IconButton } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

export interface NotificationBadgeProps {
  count: number;
  classes?: {
    badge?: string;
  };
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count, classes }) => {
  return (
    <IconButton
      color="inherit"
      component={RouterLink as any}
      to="/notifications"
      data-test="nav-top-notifications-link"
      size="large"
    >
      <Badge
        badgeContent={count > 0 ? count : undefined}
        data-test="nav-top-notifications-count"
        classes={classes}
      >
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};

export default NotificationBadge;
