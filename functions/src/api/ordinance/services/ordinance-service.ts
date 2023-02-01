import { firestore } from "firebase-admin";
import PaginationQuery from "src/core/types/pagination-query";
import { OrdinanceBuilder } from "src/models/ordinance/ordinance-builder";
import { OrdinanceModel } from "src/models/ordinance/ordinance-interface";
import OrdinanceMethods from "src/models/ordinance/ordinance-method";

class OrdinanceService {
  static async create(data: OrdinanceBuilder) {
    const batch = firestore().batch();
    const ordinanceRef = await OrdinanceMethods.createRef();
    const ordinanceData = new OrdinanceBuilder({
      id: ordinanceRef.doc.id,
      ordinanceNumber: data.ordinanceNumber,
      series: data.series.toString(),
      date: data.date,
      title: data.title,
      author: data.author,
      filePath: data.filePath,
      time: data.time,
      type: data.type,
      size: data.size,
      tag: data.tag,
      reading: data.reading,
      created: data.created,
      updated: data.created,
    });
    batch.set(ordinanceRef.doc, Object.assign({}, ordinanceData));
    await batch.commit();

    return { ordinanceData };
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

  static async seed(data: Array<OrdinanceBuilder>) {
    data.map(async (data: OrdinanceBuilder) => {
      const batch = firestore().batch();
      const cashloanRef = await OrdinanceMethods.createRef();
      batch.set(cashloanRef.doc, Object.assign({}, data));
      console.log(cashloanRef.doc.id);
      await batch.commit();
    });
  }
}

export default OrdinanceService;
