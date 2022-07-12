import { FieldResolveInput } from 'stucco-js';
import { DB } from '../db/mongo';
import { getResolverData } from '../shared';
import { resolverFor } from '../zeus';

export const handler = async (input: FieldResolveInput) => {
  return DB().then((db) => {
    const { data } = getResolverData<{ model: string }>(input);
    const model = data?.model;
    if (!model) {
      throw new Error('Please specify a database model name');
    }
    return db.collection(model).find({}).toArray();
  });
};
