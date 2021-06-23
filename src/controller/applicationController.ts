import { validationResult } from "express-validator";
import createApplication from "../use_cases/createApplication";
import CreateApplicationRequest from "../types/requests/createApplicationRequest";

export default {
  createApplication: async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let application: CreateApplicationRequest = {

    };

    return res.status(201).json((await createApplication(application))._id);
  },
};
