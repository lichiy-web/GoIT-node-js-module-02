export const getCollectionKeysOf = collection =>
  Object.keys(collection.schema.tree).filter(key => key !== 'id');
