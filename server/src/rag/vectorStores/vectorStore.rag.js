
import { OpenAIEmbeddings } from "@langchain/openai";
import chromaClient from "../config/chroma.config.js";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
  apiKey: process.env.OPEN_AI_KEY
});

export async function storeChunksInChroma(collectionName, chunks) {
  try{

    if (!chunks?.length) {
      throw new Error("No chunks provided");
    }

    const collection = await chromaClient.getOrCreateCollection({ name: collectionName})

    // Generate embeddings for each chunk
    const texts = chunks.map((chunk) => chunk.pageContent);
    const vectors = await embeddings.embedDocuments(texts);

    // Store chunks, embeddings, and metadata
    await collection.add({
      ids: chunks.map((_, index) => `${collectionName}-${Date.now()}-${index}`),
      documents: texts,
      embeddings: vectors,
      metadatas: chunks.map((chunk) => chunk.metadata ?? {}),
    });

    return {
      collectionName:collectionName,
      storedChunks: chunks.length,
    }

  }catch(error){
    console.log("Error Occured while storing the docs in Chroma", error)
    throw error
  }
}