import { validationResult } from "express-validator";
import createApplication from "../use_cases/createApplication";
import deleteApplication from "../use_cases/deleteApplication";
import getApplication from "../use_cases/getApplication";
import CreateApplicationRequest from "../types/requests/createApplicationRequest";
import DeleteApplicationRequest from "../types/requests/deleteApplicationRequest";
import GetApplicationRequest from "../types/requests/getApplicationRequest";


export default {
  createApplication: async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const request: CreateApplicationRequest = {
      name: req.body.name,
      description: req.body.description,
    };

    return res.status(200).json((await createApplication(request))._id);
  },

  deleteApplication: async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const request: DeleteApplicationRequest = {
      id: req.params.id
    }

    if (await deleteApplication(request)) {
      return res.sendStatus(204);
    }
    return res.sendStatus(404);

  },

  getApplication: async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const request: GetApplicationRequest = {
      id: req.params.id
    };

    const result = await getApplication(request);
    if (result) {
      return res.status(200).json(result);
    }
    return res.sendStatus(404);

  }

};
