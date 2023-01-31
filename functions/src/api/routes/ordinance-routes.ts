import DefaultController from "src/api/ordinance/controllers/ordinance-controller";
//import DefaultAuth from "src/core/middlewares/auth";
import { Route } from "src/core/router/Route";

export = () => {
  const route = new Route();
  route
    .group(() => {
      route.post(
        "/create",
        DefaultController.create,
        "OrdinanceController.create"
      );
      //.middleware([DefaultAuth.handle]);

      route.get("/all", DefaultController.getAll, "OrdinanceController.getAll");
      //.middleware([DefaultAuth.handle]);

      route.get(
        "/seed",
        DefaultController.seedOrdinance,
        "OrdinanceController.getAll"
      );
    })
    .prefix("/ordinance")
    .namespace("ordinance/controllers");
};
