import { firestore } from "firebase-admin";
import PaginationQuery from "src/core/types/pagination-query";
import { ResolutionBuilder } from "src/models/Resolution/resolution-builder";
import { ResolutionModel } from "src/models/Resolution/resolution-interface";
import ResolutionMethods from "src/models/Resolution/resolution-method";

class ResolutionService {
  static async create(data: ResolutionBuilder) {
    //const batch = firestore().batch();
    //const ResolutionRef = await ResolutionMethods.createRef();
    // const ResolutionData = new ResolutionBuilder({
    //   id: ResolutionRef.doc.id,
    //   resolutionNumber: data.resolutionNumber,
    //   series: data.series.toString(),
    //   date: data.date,
    //   title: data.title,
    //   author: data.author,
    //   filePath: data.filePath,
    //   time: data.time,
    //   type: data.type,
    //   size: data.size,
    //   tag: data.tag,
    //   reading: data.reading,
    //   created: data.created,
    //   updated: data.created,
    // });
    // batch.set(ResolutionRef.doc, Object.assign({}, ResolutionData));
    // await batch.commit();
    // return { ResolutionData };
  }

  static async getAll(pagination: PaginationQuery) {
    const docs = await ResolutionMethods.getAll(pagination);

    const Resolution: Array<ResolutionModel> = [];

    for (const data of docs) {
      const ResolutionData = data.data();
      Resolution.push(ResolutionData);
    }

    let last;

    if (Resolution.length > 0) {
      last = Resolution[Resolution.length - 1].id as string;
    }

    const getCount = await ResolutionMethods.getCount();

    return {
      Resolution,
      last: last,
      getCount,
    };
  }

  static async seed(data: Array<ResolutionBuilder>) {
    data.map(async (data: ResolutionBuilder) => {
      const batch = firestore().batch();
      const cashloanRef = await ResolutionMethods.createRef();
      batch.set(cashloanRef.doc, Object.assign({}, data));
      console.log(cashloanRef.doc.id);
      await batch.commit();
    });
  }
}

export default ResolutionService;
