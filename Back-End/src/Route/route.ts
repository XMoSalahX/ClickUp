import { Request, Response, Application } from "express";
import userEndPoint from "../handeler/user/userHandeler";
import collectionsEndpoint from "../handeler/todos/collectionsHandeler";

// Route function to hold all endpoint
const route = (app: Application) => {
  userEndPoint(app);
  collectionsEndpoint(app);

  // if route does't exist
  app.use((req: Request, res: Response) => {
    res.status(404).json({ Error: "Page Not Found." });
  });
};

export default route;
