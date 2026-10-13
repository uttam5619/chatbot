
import { ChromaClient } from "chromadb";
import dotenv from "dotenv";

dotenv.config();

const chromaClient = new ChromaClient({
  path: process.env.CHROMA_URL,
});

export async function connectChromaDB() {
  try {
    await chromaClient.heartbeat();
    console.log("ChromaDB connected successfully");
  } catch (error) {
    console.error("ChromaDB connection failed:", error.message);
    throw error;
  }
}

export default chromaClient;
