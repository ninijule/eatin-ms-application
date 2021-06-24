import Application from "../repositories/application";
import GetApplicationRequest from "../types/requests/getApplicationRequest";

export default async (request: GetApplicationRequest) => {
    try {
        return await Application.findById(request.id);
    } catch (error) {
        return false;
    }

};