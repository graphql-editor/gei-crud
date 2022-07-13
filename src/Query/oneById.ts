import { FieldResolveInput } from 'stucco-js';
import { prepareModel, prepareRequired_id, prepareSourceParameters } from '../data';
import { DB } from '../db/mongo';

export const handler = async (input: FieldResolveInput) =>
  DB().then(async (db) => {
    const _id = prepareRequired_id(input);
    const filterInput: Record<string, any> = { _id, ...prepareSourceParameters(input) };
    return db.collection(prepareModel(input)).findOne(filterInput);
  });
