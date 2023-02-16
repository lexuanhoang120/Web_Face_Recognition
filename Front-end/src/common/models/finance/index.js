import { BaseData } from "../";

export class Finance extends BaseData {
  constructor({
    company,
    company_id,
    finance_year,
    total_assets,
    total_liabilities,
    turnover,
    short_term_asset,
    short_term_debt,
    profit_before_tax,
    profit_after_tax,
    declaration,
    electronic_declaration,
    authentic_document,
    main_report,
    declaration_id,
    path_declaration,
    electronic_declaration_id,
    path_electronic_declaration,
    authentic_document_id,
    path_authentic_document,
    main_report_id,
    path_main_report,
    file1_deleted,
    file2_deleted,
    file3_deleted,
    file4_deleted,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      company,
      company_id,
      finance_year,
      total_assets,
      total_liabilities,
      turnover,
      short_term_asset,
      short_term_debt,
      profit_before_tax,
      profit_after_tax,
      declaration,
      electronic_declaration,
      authentic_document,
      main_report,
      declaration_id,
      path_declaration,
      electronic_declaration_id,
      path_electronic_declaration,
      authentic_document_id,
      path_authentic_document,
      main_report_id,
      path_main_report,
      file1_deleted,
      file2_deleted,
      file3_deleted,
      file4_deleted,
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
