import Application from "../repositories/application";
import NotAuthorizedError from "../types/errors/notAuthorizedError";
import GetApplicationRequest from "../types/requests/getApplicationRequest";

export default async (request: GetApplicationRequest) => {
  const application = await Application.findById(request.id);

  if (application.profileId != request.profileId) {
    throw new NotAuthorizedError();
  }

  return application;
};
