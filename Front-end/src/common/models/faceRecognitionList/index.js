import { BaseData } from "..";

export class FaceRecognitionList extends BaseData {
  constructor({
    _id,
    created_time,
    name,
    list_name,
    id_list_name,
    birth_day,
    gender,
    description,
    image_path,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      _id,
      created_time,
      name,
      list_name,
      id_list_name,
      birth_day,
      gender,
      description,
      image_path,
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
