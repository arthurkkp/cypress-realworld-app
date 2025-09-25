import {
  getBankAccountsByUserId,
  getAllUsers,
  removeUserFromResults,
  searchUsers,
  getUserById,
  getUserByUsername,
  getTransactionsForUserForApi,
  getTransactionsForUserContacts,
  getPublicTransactionsDefaultSort,
  getPublicTransactionsByQuery,
  getTransactionByIdForApi,
  getContactsByUsername,
  getLikesByTransactionId,
  getCommentsByTransactionId,
  getUnreadNotificationsByUserId,
  getBankTransfersByUserId,
} from "../../database";
import { getPaginatedItems } from "../../../src/utils/transactionUtils";
import { pick } from "lodash/fp";

const Query = {
  listBankAccount(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      return getBankAccountsByUserId(ctx.user.id);
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  users(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const users = removeUserFromResults(ctx.user?.id!, getAllUsers());
      return { results: users };
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  searchUsers(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const { q } = args;
      const users = removeUserFromResults(ctx.user?.id!, searchUsers(q));
      return { results: users };
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  user(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const { id } = args;
      if (id !== ctx.user?.id) {
        throw new Error("Unauthorized");
      }
      return getUserById(id);
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  userProfile(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const { username } = args;
      const user = getUserByUsername(username);
      return pick(["firstName", "lastName", "avatar"], user);
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  transactions(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const transactions = getTransactionsForUserForApi(ctx.user?.id!, args);
      const { totalPages, data: paginatedItems } = getPaginatedItems(
        args.page || 1,
        args.limit || 10,
        transactions
      );
      return {
        results: paginatedItems,
        pageData: {
          page: args.page || 1,
          limit: args.limit || 10,
          hasNextPages: (args.page || 1) < totalPages,
          totalPages,
        },
      };
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  transactionsContacts(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const transactions = getTransactionsForUserContacts(ctx.user?.id!, args);
      const { totalPages, data: paginatedItems } = getPaginatedItems(
        args.page || 1,
        args.limit || 10,
        transactions
      );
      return {
        results: paginatedItems,
        pageData: {
          page: args.page || 1,
          limit: args.limit || 10,
          hasNextPages: (args.page || 1) < totalPages,
          totalPages,
        },
      };
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  transactionsPublic(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const { q } = args;
      let transactions;
      if (q) {
        transactions = getPublicTransactionsByQuery(ctx.user?.id!, args);
      } else {
        transactions = getPublicTransactionsDefaultSort(ctx.user?.id!);
      }

      const { contactsTransactions, publicTransactions } = transactions;
      const isFirstPage = (args.page || 1) === 1;

      let publicTransactionsWithContacts;
      if (isFirstPage) {
        const firstFiveContacts = contactsTransactions.slice(0, 5);
        publicTransactionsWithContacts = [...firstFiveContacts, ...publicTransactions];
      }

      const { totalPages, data: paginatedItems } = getPaginatedItems(
        args.page || 1,
        args.limit || 10,
        isFirstPage ? publicTransactionsWithContacts : publicTransactions
      );

      return {
        results: paginatedItems,
        pageData: {
          page: args.page || 1,
          limit: args.limit || 10,
          hasNextPages: (args.page || 1) < totalPages,
          totalPages,
        },
      };
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  transaction(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const { id } = args;
      return getTransactionByIdForApi(id);
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  contacts(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const { username } = args;
      const contacts = getContactsByUsername(username);
      return { contacts };
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  likes(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const { transactionId } = args;
      const likes = getLikesByTransactionId(transactionId);
      return { likes };
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  comments(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const { transactionId } = args;
      const comments = getCommentsByTransactionId(transactionId);
      return { comments };
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  notifications(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const notifications = getUnreadNotificationsByUserId(ctx.user?.id!);
      return { results: notifications };
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  bankTransfers(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const transfers = getBankTransfersByUserId(ctx.user?.id!);
      return { transfers };
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },
};

export default Query;
