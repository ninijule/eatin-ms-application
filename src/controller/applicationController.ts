import { validationResult } from "express-validator";
import createApplication from "../use_cases/createApplication";
import deleteApplication from "../use_cases/deleteApplication";
import getApplication from "../use_cases/getApplications";
import getAllApplications from "../use_cases/getAllApplications";
import searchApplication from "../use_cases/searchApplication";
import CreateApplicationRequest from "../types/requests/createApplicationRequest";
import DeleteApplicationRequest from "../types/requests/deleteApplicationRequest";
import GetApplicationRequest from "../types/requests/getApplicationRequest";
import UpdateApplicationRequest from "../types/requests/updateApplicationRequest";
import updateApplication from "../use_cases/updateApplication";
import SearchApplicationRequest from "../types/requests/searchApplicationRequest";

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
      id: req.params.id,
    };

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
      id: req.params.id,
    };

    const result = await getApplication(request);
    if (result) {
      return res.status(200).json(result);
    }
    return res.sendStatus(404);
  },

  getAllApplicationsOrSearch: async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (Object.keys(req.query).length > 0) {
      const request: SearchApplicationRequest = {};

      if (req.query.token != undefined) {
        request.token = req.query.token;
      }

      if (Object.keys(request).length > 0) {
        try {
          return res.status(200).json(await searchApplication(request));
        } catch (err) {
          console.log(err);
          return res.sendStatus(404);
        }
      }
    }

    try {
      return res.status(200).json(await getAllApplications());
    } catch {
      return res.sendStatus(400);
    }
  },

  updateApplication: async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const request: UpdateApplicationRequest = {
      id: req.params.id,
      name: req.body.name,
      description: req.body.description,
    };

    if (await updateApplication(request)) {
      return res.sendStatus(200);
    }
    return res.sendStatus(404);
  },
};
