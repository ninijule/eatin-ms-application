import Application from "../repositories/application";
import SearchApplicationRequest from "../types/requests/searchApplicationRequest";

export default async (request: SearchApplicationRequest) => {
  console.log(request);
  return await Application.find(request);
};
