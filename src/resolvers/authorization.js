import { ForbiddenError } from "apollo-server";
import { combineResolvers, skip } from "graphql-resolvers";

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) => {
    console.log("hit isAdmin resolver");
    return role === "ADMIN"
      ? skip
      : new ForbiddenError("Not authorized as admin.");
  }
);

export const isAuthenticated = (parent, args, { me }) => {
  console.log("is authenticated");
  return me ? skip : new ForbiddenError("Not authenticated as user.");
};

export const isMessageOwner = async (parent, { id }, { models, me }) => {
  const message = await models.Message.findByPk(id, { raw: true });
  if (message.userId !== me.id) {
    throw new ForbiddenError("Not authenticated as owner.");
  }
  return skip;
};
