
import { Document } from "@langchain/core/documents";

export class MySQLDocumentLoader {
    
  constructor({
    model,
    contentColumns,
    metadataColumns = [],
    batchSize = 500,
  }) {
    this.model = model;
    this.contentColumns = contentColumns;
    this.metadataColumns = metadataColumns;
    this.batchSize = batchSize;
  }

  async load() {
    const documents = [];
    let offset = 0;

    while (true) {
      const rows = await this.model.findAll({
        attributes: [
          ...new Set([
            ...this.contentColumns,
            ...this.metadataColumns,
          ]),
        ],
        limit: this.batchSize,
        offset,
        order: [["id", "ASC"]],
        raw: true,
      });

      if (rows.length === 0) break;

      for (const row of rows) {
        const pageContent = this.contentColumns
          .map((column) => `${column}: ${row[column] ?? ""}`)
          .join("\n");

        const metadata = Object.fromEntries(
          this.metadataColumns.map((column) => [
            column,
            row[column],
          ])
        );

        documents.push(
          new Document({
            pageContent,
            metadata,
          })
        );
      }

      offset += rows.length;
    }

    return documents;
  }
}
