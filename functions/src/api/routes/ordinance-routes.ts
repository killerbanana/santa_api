import OrdinanceController from "src/api/ordinance/controllers/ordinance-controller";
import { Route } from "src/core/router/route";
import OrdinanceCreateValidator from "../ordinance/validators/ordinance-validator";

export = () => {
  const route = new Route();
  route
    .group(() => {
      route
        .post(
          "/create",
          OrdinanceController.create,
          "OrdinanceController.create"
        )
        .validator([OrdinanceCreateValidator.handle]);
      //.middleware([DefaultAuth.handle]);

      route.get(
        "/all",
        OrdinanceController.getAll,
        "OrdinanceController.getAll"
      );
      //.middleware([DefaultAuth.handle]);

      route.get(
        "/seed",
        OrdinanceController.seedOrdinance,
        "OrdinanceController.getAll"
      );
    })
    .prefix("/ordinance")
    .namespace("ordinance/controller");
};
