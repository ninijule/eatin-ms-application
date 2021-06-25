import Application from "../repositories/application";
import NotAuthorizedError from "../types/errors/notAuthorizedError";
import DeleteApplicationRequest from "../types/requests/deleteApplicationRequest";

export default async (request: DeleteApplicationRequest) => {
  const application = await Application.findById(request.id);

  if (application.profileId != request.profileId) {
    throw new NotAuthorizedError();
  }

  await application.delete();
};
