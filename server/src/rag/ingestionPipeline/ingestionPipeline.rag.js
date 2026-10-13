import { getDocumentChunks } from '../chunking/chunking.rag.js';
import { storeChunksInChroma } from '../vectorStores/vectorStore.rag.js';


const ingestion = async ({
    collectionName,
    model,
    contentColumns,
    metadataColumns,
    batchSize 
})=>{

    try{
        const docs = await getDocumentChunks({model, contentColumns, metadataColumns, batchSize});
        await storeChunksInChroma(collectionName, docs);
    
    }catch(error){
        console.log("Error during ingestion:", error);
        throw error
    }
}

export default ingestion