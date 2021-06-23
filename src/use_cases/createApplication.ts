import Application from "../repositories/application";
import CreateApplicationRequest from "../types/requests/createApplicationRequest";

export default async (request: CreateApplicationRequest) => {
    return await Application.create(request);
};