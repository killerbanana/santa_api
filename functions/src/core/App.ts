import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { Route } from "src/core/router/route";
import * as admin from "firebase-admin";

const _newAdmin = admin.initializeApp(
  {
    credential: admin.credential.cert({
      projectId: process.env.ADMIN_PROJECT_ID,
      privateKey: process.env.ADMIN_PRIVATE_KEY,
      clientEmail: process.env.ADMIN_CLIENT_EMAIL,
    }),
    databaseURL: process.env.ADMIN_DATABASE_URL,
  },
  "coop-admin-authenticated"
);

const app: Application = express();

class App {
  static boot() {
    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).send("Internal Server Error");
    });

    Route.registerAll();
  }

  static getBunbuyMessaging() {
    return _newAdmin;
  }

  static getInstance() {
    return app;
  }
}

export default App;
