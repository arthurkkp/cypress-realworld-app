import {
  createBankAccountForUser,
  removeBankAccountById,
  createUser,
  updateUserById,
  createTransaction,
  updateTransactionById,
  createContactForUser,
  removeContactById,
  getContactsByUsername,
  createLikes,
  createComments,
  createNotifications,
  updateNotificationById,
} from "../../database";
import { remove } from "lodash/fp";

const Mutation = {
  createBankAccount: (obj: any, args: any, ctx: any) => {
    return createBankAccountForUser(ctx.user.id, args);
  },
  deleteBankAccount: (obj: any, args: any, ctx: any) => {
    removeBankAccountById(args.id);
    return true;
  },

  createUser: (obj: any, args: any, ctx: any) => {
    /* istanbul ignore next */
    try {
      const { input } = args;
      const user = createUser(input);
      return { user };
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  updateUser: (obj: any, args: any, ctx: any) => {
    /* istanbul ignore next */
    try {
      const { id, input } = args;
      if (id !== ctx.user?.id) {
        throw new Error("Unauthorized");
      }
      updateUserById(id, input);
      return true;
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  createTransaction: (obj: any, args: any, ctx: any) => {
    /* istanbul ignore next */
    try {
      const { input } = args;
      const { transactionType, ...transactionPayload } = input;
      const transaction = createTransaction(ctx.user?.id!, transactionType, transactionPayload);
      return { transaction };
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  updateTransaction: (obj: any, args: any, ctx: any) => {
    /* istanbul ignore next */
    try {
      const { id, input } = args;
      updateTransactionById(id, input);
      return true;
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  createContact: (obj: any, args: any, ctx: any) => {
    /* istanbul ignore next */
    try {
      const { contactUserId } = args;
      const contact = createContactForUser(ctx.user?.id!, contactUserId);
      return { contact };
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  deleteContact: (obj: any, args: any, ctx: any) => {
    /* istanbul ignore next */
    try {
      const { id } = args;
      removeContactById(id);
      const contacts = getContactsByUsername(ctx.user?.username!);
      return { contacts };
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  createLike: (obj: any, args: any, ctx: any) => {
    /* istanbul ignore next */
    try {
      const { transactionId } = args;
      createLikes(ctx.user?.id!, transactionId);
      return true;
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  createComment: (obj: any, args: any, ctx: any) => {
    /* istanbul ignore next */
    try {
      const { transactionId, content } = args;
      createComments(ctx.user?.id!, transactionId, content);
      return true;
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  createNotifications: (obj: any, args: any, ctx: any) => {
    /* istanbul ignore next */
    try {
      const { items } = args;
      const notifications = createNotifications(ctx.user?.id!, items);
      return { results: notifications };
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },

  updateNotification: (obj: any, args: any, ctx: any) => {
    /* istanbul ignore next */
    try {
      const { id, input } = args;
      updateNotificationById(ctx.user?.id!, id, input);
      return true;
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },
};

export default Mutation;
