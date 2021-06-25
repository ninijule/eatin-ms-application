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
import { Request, Response, NextFunction } from "express";
import GetAllApplicationsRequest from "../types/requests/getAllApplicationsRequest";
import BaseError from "../types/errors/baseError";

export default {
  createApplication: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const request: CreateApplicationRequest = {
        name: req.body.name,
        description: req.body.description,
        profileId: JSON.parse(<string>req.headers.user).id,
      };

      return res.status(200).json((await createApplication(request))._id);
    } catch (error) {
      next(error);
    }
  },

  deleteApplication: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const request: DeleteApplicationRequest = {
        id: req.params.id,
        profileId: JSON.parse(<string>req.headers.user).id,
      };

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },

  getApplication: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const request: GetApplicationRequest = {
        id: req.params.id,
        profileId: JSON.parse(<string>req.headers.user).id,
      };

      const result = await getApplication(request);
      if (result) {
        return res.status(200).json(result);
      }
      return res.sendStatus(404);
    } catch (error) {
      next(error);
    }
  },

  getAllApplicationsOrSearch: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (Object.keys(req.query).length > 0) {
        const request: SearchApplicationRequest = {};

        if (req.query.token != undefined) {
          request.token = <string>req.query.token;
        }

        if (Object.keys(request).length > 0) {
          return res.status(200).json(await searchApplication(request));
        }
      }

      const request: GetAllApplicationsRequest = {
        profileId: JSON.parse(<string>req.headers.user).id,
      };
      return res.status(200).json(await getAllApplications(request));
    } catch (error) {
      next(error);
    }
  },

  updateApplication: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const request: UpdateApplicationRequest = {
        id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        profileId: JSON.parse(<string>req.headers.user).id,
      };

      await updateApplication(request);
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
};
