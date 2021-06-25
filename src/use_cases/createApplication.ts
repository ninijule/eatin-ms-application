import Application from "../repositories/application";
import CreateApplicationRequest from "../types/requests/createApplicationRequest";
import { v4 } from "uuid";

export default async (request: CreateApplicationRequest) => {
  let token = v4();
  while (await Application.findOne({ token }).exec()) {
    token = v4();
  }
  const application = {
    name: request.name,
    description: request.description,
    profileId: request.profileId,
    token,
  };

  return await Application.create(application);
};
