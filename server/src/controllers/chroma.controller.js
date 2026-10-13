
import {
  createCollectionService,
  deleteCollectionService,
  updateCollectionService,
  getCollectionService,
  listAllCollectionsService,
} from "../service/chroma.service.js";

export const createCollectionHandler = async (req, res) => {
  try {
    const { collectionName } = req.body;

    if (!collectionName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Collection name is required",
      });
    }

    const collection = await createCollectionService(collectionName.trim());

    return res.status(201).json({
      success: true,
      message: "Collection created successfully",
      data: collection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create collection",
      error: error.message,
    });
  }
};

export const deleteCollectionHandler = async (req, res) => {
  try {
    const { collectionName } = req.params;

    if (!collectionName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Collection name is required",
      });
    }

    await deleteCollectionService(collectionName);

    return res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete collection",
      error: error.message,
    });
  }
};

export const updateCollectionHandler = async (req, res) => {
  try {
    const { collectionName } = req.params;
    const { newCollectionName } = req.body;

    if (!collectionName?.trim() || !newCollectionName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Current and new collection names are required",
      });
    }

    const collection = await updateCollectionService(
      collectionName,
      newCollectionName.trim()
    );

    return res.status(200).json({
      success: true,
      message: "Collection renamed successfully",
      data: collection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update collection",
      error: error.message,
    });
  }
};

export const getCollectionHandler = async (req, res) => {
  try {
    const { collectionName } = req.params;

    if (!collectionName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Collection name is required",
      });
    }

    const collection = await getCollectionService(collectionName);

    return res.status(200).json({
      success: true,
      message: "Collection retrieved successfully",
      data: collection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve collection",
      error: error.message,
    });
  }
};

export const getAllCollectionsHandler = async (req, res) => {
  try {
    const collections = await listAllCollectionsService();

    return res.status(200).json({
      success: true,
      message: "Collections retrieved successfully",
      count: collections.length,
      data: collections,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve collections",
      error: error.message,
    });
  }
};
