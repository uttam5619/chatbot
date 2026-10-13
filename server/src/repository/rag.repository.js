

const fetchData = async (query) => {

    const rows = await this.model.findAll({
        attributes: [
          ...new Set([
            ...this.contentColumns,
            ...this.metadataColumns,
          ]),
        ],
        limit: this.batchSize,
        offset,
        // order: [["id", "ASC"]],
        raw: true,
    });
    return rows;
    
}