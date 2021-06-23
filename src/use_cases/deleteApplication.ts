import Application from "../repositories/application";
import DeleteApplicationRequest from "../types/requests/deleteApplicationRequest";
import { v4 } from 'uuid';

export default async (request: DeleteApplicationRequest) => {
    try {
        await Application.findByIdAndDelete(request.id);
        return true;
    } catch (error) {
        return false;
    }

};