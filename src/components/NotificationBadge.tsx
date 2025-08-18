import React from "react";
import { styled } from "@mui/material/styles";
import { Badge } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";

const PREFIX = "NotificationBadge";

const classes = {
  customBadge: `${PREFIX}-customBadge`,
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  [`& .${classes.customBadge}`]: {
    backgroundColor: "red",
    color: "white",
  },
}));

interface NotificationBadgeProps {
  count?: number;
  "data-test"?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  "data-test": dataTest = "nav-top-notifications-count",
}) => {
  return (
    <StyledBadge badgeContent={count} data-test={dataTest} classes={{ badge: classes.customBadge }}>
      <NotificationsIcon />
    </StyledBadge>
  );
};

export default NotificationBadge;
