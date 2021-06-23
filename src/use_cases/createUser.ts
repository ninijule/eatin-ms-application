import User from "../repositories/user";
import CreateUserRequest from "../types/requests/createUserRequest";

export default async (user: CreateUserRequest) => {
  return await User.create(user);
};
