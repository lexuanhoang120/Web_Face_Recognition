import { BaseData } from "..";

export class FaceRecognitionListStorage extends BaseData {
  constructor({ list_name, ...rest }) {
    super(rest);

    Object.assign(this, {
      list_name,
    });
  }
}

export class Document {
  constructor({ extension, id, originalName, url }) {
    this.document_id = id;
    this.extension = extension;
    this.original_name = originalName;
    this.url = url;
  }
}
