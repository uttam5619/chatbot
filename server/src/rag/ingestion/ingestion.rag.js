
import { MySQLDocumentLoader } from "../loaders/mySQLDocumentLoader.rag.js";
import { chunkDocuments } from "../chunking/textSplitters.rag.js";

export async function ingestProducts(model, contentColumns, metadataColumns,) {

    const loader = new MySQLDocumentLoader({
        model: model,
        contentColumns: contentColumns,
        metadataColumns: metadataColumns,
    });

    const documents = await loader.load();
    const chunks = await chunkDocuments(documents);

    console.log("Documents:", documents.length);
    console.log("Chunks:", chunks.length);

    return chunks;
}
