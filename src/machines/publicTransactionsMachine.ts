import { isEmpty, omit } from "lodash/fp";
import gql from "graphql-tag";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";
import { backendPort } from "../utils/portUtils";

const publicTransactionsQuery = gql`
  query TransactionsPublic($page: Int, $limit: Int, $q: String) {
    transactionsPublic(page: $page, limit: $limit, q: $q) {
      results {
        id
        uuid
        source
        amount
        description
        privacyLevel
        receiverId
        senderId
        balanceAtCompletion
        status
        requestStatus
        requestResolvedAt
        createdAt
        modifiedAt
        likes {
          id
          userId
          transactionId
        }
        comments {
          id
          content
          userId
          transactionId
        }
        receiverName
        receiverAvatar
        senderName
        senderAvatar
      }
      pageData {
        page
        limit
        hasNextPages
        totalPages
      }
    }
  }
`;

export const publicTransactionsMachine = dataMachine("publicTransactions").withConfig({
  services: {
    fetchData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const resp = await httpClient.post(`http://localhost:${backendPort}/graphql`, {
        operationName: "TransactionsPublic",
        query: publicTransactionsQuery.loc?.source.body,
        variables: !isEmpty(payload) ? payload : undefined,
      });
      return resp.data.data.transactionsPublic;
    },
  },
});
