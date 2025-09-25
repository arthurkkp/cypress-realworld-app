import { omit } from "lodash/fp";
import { Machine, assign } from "xstate";
import gql from "graphql-tag";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";
import { User, TransactionCreatePayload } from "../models";
import { authService } from "./authMachine";
import { backendPort } from "../utils/portUtils";

export interface CreateTransactionMachineSchema {
  states: {
    stepOne: {};
    stepTwo: {};
    stepThree: {};
  };
}

const createTransactionMutation = gql`
  mutation CreateTransaction($input: TransactionInput!) {
    createTransaction(input: $input) {
      transaction {
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
    }
  }
`;

const transactionDataMachine = dataMachine("transactionData").withConfig({
  services: {
    createData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const resp = await httpClient.post(`http://localhost:${backendPort}/graphql`, {
        operationName: "CreateTransaction",
        query: createTransactionMutation.loc?.source.body,
        variables: { input: payload },
      });
      authService.send("REFRESH");
      return resp.data.data.createTransaction;
    },
  },
});

export type CreateTransactionMachineEvents =
  | { type: "SET_USERS" }
  | { type: "CREATE" }
  | { type: "RESET" };

export interface CreateTransactionMachineContext {
  sender: User;
  receiver: User;
  transactionDetails: TransactionCreatePayload;
}

export const createTransactionMachine = Machine<
  CreateTransactionMachineContext,
  CreateTransactionMachineSchema,
  CreateTransactionMachineEvents
>(
  {
    id: "createTransaction",
    initial: "stepOne",
    states: {
      stepOne: {
        entry: "clearContext",
        on: {
          SET_USERS: "stepTwo",
        },
      },
      stepTwo: {
        entry: "setSenderAndReceiver",
        invoke: {
          id: "transactionDataMachine",
          src: transactionDataMachine,
          autoForward: true,
        },
        on: {
          CREATE: "stepThree",
        },
      },
      stepThree: {
        entry: "setTransactionDetails",
        on: {
          RESET: "stepOne",
        },
      },
    },
  },
  {
    actions: {
      setSenderAndReceiver: assign((ctx, event: any) => ({
        sender: event.sender,
        receiver: event.receiver,
      })),
      setTransactionDetails: assign((ctx, event: any) => ({
        transactionDetails: event,
      })),
      clearContext: assign((ctx, event: any) => ({})),
    },
  }
);
