import chromaClient from "../config/chroma.config.js"


export const createCollectionService = async (collectionName) => {
  return await chromaClient.createCollection({
    name: collectionName,
  });
};

export const getCollectionService = async (collectionName) => {
  return await chromaClient.getCollection({
    name: collectionName,
  });
};

export const deleteCollectionService = async (collectionName) => {
  return await chromaClient.deleteCollection({
    name: collectionName,
  });
};

export const updateCollectionService = async (collectionName,newCollectionName) => {
  const collection = await getCollectionService(collectionName);
  return await collection.modify({ name: newCollectionName });
};

export const listAllCollectionsService = async () =>{
    return await chromaClient.listCollections();
}
