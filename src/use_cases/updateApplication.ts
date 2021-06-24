import Application from "../repositories/application";
import UpdateApplicationRequest from "../types/requests/updateApplicationRequest";

export default async (request: UpdateApplicationRequest) => {

    try {
        const application = await Application.findById(request.id);
        application.name = request.name;
        application.description = request.description;
        application.save();
        return true;
    } catch (error) {
        return false;
    }

}