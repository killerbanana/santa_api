import * as _firestore from "@google-cloud/firestore";
import { firestore } from "firebase-admin";
import Collection from "src/core/enums/collections";
import BadRequest from "src/core/exceptions/bad-request";
import PaginationQuery from "src/core/types/pagination-query";
import { ResolutionModel } from "./resolution-interface";
class CashloanMethods {
  static collection: _firestore.CollectionReference = firestore().collection(
    `${Collection.SANTA_RESOLUTION}`
  );

  static converter = {
    toFirestore(data: ResolutionModel): FirebaseFirestore.DocumentData {
      return data;
    },
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot) => {
      const data = snapshot.data();

      return {
        id: snapshot.id,
        ...data,
      } as ResolutionModel;
    },
  };

  static async createRef() {
    const doc = this.collection.doc();

    return {
      id: doc.id,
      doc: this.collection.doc(doc.id),
    };
  }

  static async get(docId: string) {
    const snapshot = await this.collection.doc(docId).get();

    if (!snapshot.exists)
      throw new BadRequest(`No records found`, "ResolutionMethod.get");

    return snapshot;
  }

  static async getAll(pagination: PaginationQuery) {
    const direction = pagination.sortDirection == "asc" ? "asc" : "desc";

    let query = this.collection
      .withConverter(this.converter)
      .orderBy(pagination.sortField, direction);

    if (pagination.last) {
      const last = await this.get(pagination.last as string);
      query = query.startAfter(last);
    }

    const accounts = await query.limit(pagination.limit).get();

    return accounts.docs;
  }

  static async getCount() {
    const snapshot = await this.collection
      .withConverter(this.converter)
      .doc("--count--")
      .get();

    return snapshot.data();
  }
}

export default CashloanMethods;
