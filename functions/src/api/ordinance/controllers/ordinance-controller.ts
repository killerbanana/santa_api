import { Request, Response } from "express";
import OrinanceService from "../services/ordinance-service";
import PaginationQuery from "src/core/types/pagination-query";
import ORDINANCES from "src/ordinanceSeed.json";
import { firestore } from "firebase-admin";
import OrdinanceMethods from "src/models/ordinance/ordinance-method";
//import Joi from "joi";

class OrdinanceController {
  static async create(req: Request, res: Response) {
    const { data } = req.body;
    try {
      const result = await OrinanceService.create(data);
      console.log(result);
      return res.status(200).json({
        status: 200,
        message: "Success",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error adding account",
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
    for (const ordinanceData of ORDINANCES) {
      const {
        Author,
        OrdinanceNumber,
        Series,
        Date,
        Title,
        Time,
        Size,
        Tag,
        Reading,
        Created,
      } = ordinanceData;

      const batch = firestore().batch();
      const cashloanRef = await OrdinanceMethods.createRef();
      batch.set(
        cashloanRef.doc,
        Object.assign({
          id: cashloanRef.doc.id,
          author: Author,
          created: Created,
          date: Date,
          ordinanceNumber: OrdinanceNumber.toString(),
          path: "",
          reading: Reading,
          series: Series.toString(),
          size: Size,
          time: Time,
          title: Title,
          type: ".pdf",
          tag: Tag,
          updated: Created,
        })
      );
      console.log(cashloanRef.doc.id);
      await batch.commit();
    }
  }
}

export default OrdinanceController;
