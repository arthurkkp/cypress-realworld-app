import { isEmpty, omit } from "lodash/fp";
import gql from "graphql-tag";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";
import { backendPort } from "../utils/portUtils";

const contactsTransactionsQuery = gql`
  query TransactionsContacts(
    $page: Int
    $limit: Int
    $status: TransactionStatus
    $dateRangeStart: String
    $dateRangeEnd: String
    $amountMin: Float
    $amountMax: Float
  ) {
    transactionsContacts(
      page: $page
      limit: $limit
      status: $status
      dateRangeStart: $dateRangeStart
      dateRangeEnd: $dateRangeEnd
      amountMin: $amountMin
      amountMax: $amountMax
    ) {
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

export const contactsTransactionsMachine = dataMachine("contactsTransactions").withConfig({
  services: {
    fetchData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const resp = await httpClient.post(`http://localhost:${backendPort}/graphql`, {
        operationName: "TransactionsContacts",
        query: contactsTransactionsQuery.loc?.source.body,
        variables: !isEmpty(payload) ? payload : undefined,
      });
      return resp.data.data.transactionsContacts;
    },
  },
});
