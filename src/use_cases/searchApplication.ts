import Application from "../repositories/application";
import SearchApplicationRequest from "../types/requests/searchApplicationRequest";

export default async (request: SearchApplicationRequest) => {
  return await Application.find(request);
};
