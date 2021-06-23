import RouterConfig from "../types/utils/routerConfig";
import userRouter from "./users";

const user: RouterConfig = {
  router: userRouter,
  path: "/users",
};

export default [user];
