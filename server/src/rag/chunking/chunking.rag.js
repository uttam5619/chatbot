

import { MySQLDocumentLoader } from "../loaders/mySQLDocumentLoader.rag.js";
import { chunkDocuments } from "../textSplitter/textSplitters.rag.js";

export async function getDocumentChunks({
  model,
  contentColumns,
  metadataColumns = [],
  batchSize = 500,
}) {
  const loader = new MySQLDocumentLoader({
    model,
    contentColumns,
    metadataColumns,
    batchSize,
  });

  const documents = await loader.load();

  const chunks = await chunkDocuments(documents);

  return chunks;
}