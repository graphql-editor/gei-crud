import { FieldResolveInput } from 'stucco-js';
import { prepareModel, prepareRequired_id, prepareSourceParameters } from '../data';
import { DB } from '../db/mongo';

export const handler = async (input: FieldResolveInput) =>
  DB().then((db) => {
    const _id = prepareRequired_id(input);
    return db
      .collection(prepareModel(input))
      .deleteOne({ _id, ...prepareSourceParameters(input) })
      .then((r) => !!r.deletedCount);
  });
