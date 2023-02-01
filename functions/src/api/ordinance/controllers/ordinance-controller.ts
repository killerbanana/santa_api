import { Request, Response } from "express";
import OrinanceService from "../services/ordinance-service";
import PaginationQuery from "src/core/types/pagination-query";
import ORDINANCES from "src/ordinanceSeed.json";
import { OrdinanceBuilder } from "src/models/ordinance/ordinance-builder";
import OrdinanceMethods from "src/models/ordinance/ordinance-method";
import OrdinanceService from "../services/ordinance-service";
//import Joi from "joi";

class OrdinanceController {
  static async create(req: Request, res: Response) {
    const { data } = req.body;
    try {
      const result = await OrinanceService.create(data);
      return res.status(200).json({
        status: 200,
        message: "Orinances",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Orinances",
        data: error,
      });
    }
  }

  static async getAll(req: Request, res: Response) {
    const { limit, sort, last } = req.query;
    const _sort = (sort as string).split("|");

    const pagination: PaginationQuery = {
      limit: +(limit as string),
      sortField: _sort[0],
      sortDirection: _sort[1],
    };

    if (last != "") {
      pagination.last = last as string;
    }

    try {
      const result = await OrinanceService.getAll(pagination);
      return res.status(200).json({
        status: 200,
        message: "Orinances",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error getting ordinance",
        data: error,
      });
    }
  }

  static async seedOrdinance(req: Request, res: Response) {
    var ordinance = [];
    for (const ordi of ORDINANCES) {
      const cashloanRef = await OrdinanceMethods.createRef();
      const ordinanceData = new OrdinanceBuilder({
        id: cashloanRef.doc.id,
        ordinanceNumber: ordi.OrdinanceNumber.toString(),
        series: ordi.Series.toString(),
        date: ordi.Date,
        title: ordi.Title,
        author: ordi.Author,
        filePath: "",
        time: ordi.Time,
        type: ".pdf",
        size: ordi.Size,
        tag: ordi.Tag,
        reading: ordi.Reading,
        created: ordi.Created,
        updated: ordi.Created,
      });
      ordinance.push(ordinanceData);
    }
    const result = await OrdinanceService.seed(ordinance);
    return res.status(200).json({
      status: 200,
      message: "Orinances Seeded",
      data: result,
    });
  }
}

export default OrdinanceController;
