import ResolutionController from "src/api/Resolution/controllers/Resolution-controller";
import { Route } from "src/core/router/route";
import ResolutionCreateValidator from "../Resolution/validators/Resolution-validator";

export = () => {
  const route = new Route();
  route
    .group(() => {
      route
        .post(
          "/create",
          ResolutionController.create,
          "ResolutionController.create"
        )
        .validator([ResolutionCreateValidator.handle]);
      //.middleware([DefaultAuth.handle]);

      route.get(
        "/all",
        ResolutionController.getAll,
        "ResolutionController.getAll"
      );
      //.middleware([DefaultAuth.handle]);

      route.get(
        "/seed",
        ResolutionController.seedResolution,
        "ResolutionController.getAll"
      );
    })
    .prefix("/resolution")
    .namespace("resolution/controller");
};
