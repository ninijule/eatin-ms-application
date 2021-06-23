import { validationResult } from "express-validator";
import createUser from "../use_cases/createUser";
import CreateUserRequest from "../types/requests/createUserRequest";

export default {
  addUser: async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user: CreateUserRequest = {
      name: req.body.name,
      email: req.body.email,
    };

    return res.status(200).json((await createUser(user))._id);
  },
};
