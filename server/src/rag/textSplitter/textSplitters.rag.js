
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function chunkDocuments(documents) {
  
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
    separators: ["\n\n", "\n", " ", ""],
  });

  return await splitter.splitDocuments(documents);
}
