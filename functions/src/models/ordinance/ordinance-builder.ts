import { OrdinanceModel } from "./ordinance-interface";

interface OrdinanceBuilderInterface extends OrdinanceModel {
  id: string;
  ordinanceNumber: string;
  series: string;
  date: string;
  title: string;
  author: string;
  filePath: string;
  time: string;
  type: string;
  size: string;
  tag: string;
  reading: string;
  created: string;
  updated: string;
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

  constructor(ordinance: OrdinanceBuilderInterface) {
    if (ordinance.id) this.id = ordinance.id;

    const { ordinanceNumber, series, title, author, tag, reading } = ordinance;
    const { date, created, updated } = ordinance;
    const { type, size } = ordinance;

    this.ordinanceNumber = ordinanceNumber;
    this.series = series;
    this.title = title;
    this.author = author;
    this.tag = tag;
    this.reading = reading;

    this.date = date;
    this.created = created;
    this.updated = updated;

    this.type = type;
    this.size = size;
  }
}
