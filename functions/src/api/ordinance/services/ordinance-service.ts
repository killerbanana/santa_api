import { firestore } from "firebase-admin";
import PaginationQuery from "src/core/types/pagination-query";
import { OrdinanceBuilder } from "src/models/ordinance/ordinance-builder";
import {
  OrdinanceCreate,
  OrdinanceModel,
} from "src/models/ordinance/ordinance-interface";
import OrdinanceMethods from "src/models/ordinance/ordinance-method";

class OrdinanceService {
  static async create(data: OrdinanceCreate) {
    //const { account } = data;
    const batch = firestore().batch();
    const ordinanceRef = await OrdinanceMethods.createRef();
    const teamBuy = new OrdinanceBuilder().setId(ordinanceRef.id);

    batch.set(ordinanceRef.doc, Object.assign({}, teamBuy));

    await batch.commit();

    return { accountId: ordinanceRef.id };
  }

  static async getAll(pagination: PaginationQuery) {
    const docs = await OrdinanceMethods.getAll(pagination);

    const ordinance: Array<OrdinanceModel> = [];

    for (const data of docs) {
      const ordinanceData = data.data();
      ordinance.push(ordinanceData);
    }

    let last;

    if (ordinance.length > 0) {
      last = ordinance[ordinance.length - 1].id as string;
    }

    const getCount = await OrdinanceMethods.getCount();

    return {
      ordinance,
      last: last,
      getCount,
    };
  }

  // static async seed(data: any) {
  //   data.data.map(async (data: any) => {
  //     const batch = firestore().batch();
  //     const cashloanRef = await OrdinanceMethods.createRef();
  //     batch.set(
  //       cashloanRef.doc,
  //       Object.assign({
  //         id: cashloanRef.doc.id,
  //         author: data.Author,
  //         created: data.Created,
  //         date: data.Date,
  //         ordinanceNumber: data.OrdinanceNumber,
  //         path: "",
  //         reading: data.Reading,
  //         series: data.series,
  //         size: data.Size,
  //         time: data.time,
  //         title: data.title,
  //         type: ".pdf",
  //         updated: data.Created,
  //       })
  //     );
  //     console.log(cashloanRef.doc.id);
  //     await batch.commit();
  //   });
  // }
}

export default OrdinanceService;
