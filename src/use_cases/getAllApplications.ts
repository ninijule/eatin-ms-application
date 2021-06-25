import Application from "../repositories/application";
import GetAllApplicationsRequest from "../types/requests/getAllApplicationsRequest";

export default async (request: GetAllApplicationsRequest) => {
  return await Application.find({ profileId: request.profileId });
};
