import Application from "../repositories/application";

export default async () => {
  return await Application.find();
};
