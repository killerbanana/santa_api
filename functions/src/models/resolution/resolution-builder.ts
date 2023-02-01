import { ResolutionModel } from "./resolution-interface";

interface ResolutionBuilderInterface extends ResolutionModel {
  id: string;
  resolutionNumber: string;
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

export class ResolutionBuilder implements ResolutionBuilderInterface {
  id: string = "";
  resolutionNumber: string = "";
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

  constructor(resolution: ResolutionBuilderInterface) {
    if (resolution.id) this.id = resolution.id;

    const { resolutionNumber, series, title, author, tag, reading } =
      resolution;
    const { date, created, updated } = resolution;
    const { type, size } = resolution;

    this.resolutionNumber = resolutionNumber;
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
