import { isEmpty, omit } from "lodash/fp";
import gql from "graphql-tag";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";
import { backendPort } from "../utils/portUtils";

const notificationsQuery = gql`
  query Notifications {
    notifications {
      results {
        id
        uuid
        userId
        transactionId
        isRead
        createdAt
        modifiedAt
      }
    }
  }
`;

const updateNotificationMutation = gql`
  mutation UpdateNotification($id: ID!, $input: NotificationUpdateInput!) {
    updateNotification(id: $id, input: $input)
  }
`;

export const notificationsMachine = dataMachine("notifications").withConfig({
  services: {
    fetchData: async (ctx, event: any) => {
      const resp = await httpClient.post(`http://localhost:${backendPort}/graphql`, {
        operationName: "Notifications",
        query: notificationsQuery.loc?.source.body,
      });
      return resp.data.data.notifications;
    },
    updateData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const { id, ...input } = payload;
      const resp = await httpClient.post(`http://localhost:${backendPort}/graphql`, {
        operationName: "UpdateNotification",
        query: updateNotificationMutation.loc?.source.body,
        variables: { id, input },
      });
      return resp.data.data.updateNotification;
    },
  },
});
