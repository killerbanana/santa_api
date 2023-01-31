import { OrdinanceModel } from "./ordinance-interface";

interface OrdinanceBuilderInterface extends OrdinanceModel {
  setId(id: string): this;
}

export class OrdinanceBuilder implements OrdinanceBuilderInterface {
  id: string = "";
  ordinanceNumber: string = "";
  series: string = "";
  date: string = "";
  title: string = "";
  author: string = "";
  filePath: string = "";
  time: string = "";
  type: string = "";
  size: string = "";
  tag: string = "";
  reading: string = "";
  created: string = "";
  updated: string = "";

  setId(id: string): this {
    this.id = id;
    return this;
  }
}
