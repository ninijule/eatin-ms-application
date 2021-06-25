import Application from "../repositories/application";
import NotAuthorizedError from "../types/errors/notAuthorizedError";
import UpdateApplicationRequest from "../types/requests/updateApplicationRequest";

export default async (request: UpdateApplicationRequest) => {
  const application = await Application.findById(request.id);

  if (application.profileId != request.profileId) {
    throw new NotAuthorizedError();
  }

  application.name = request.name;
  application.description = request.description;
  application.save();
};
