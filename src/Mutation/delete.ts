import { FieldResolveInput } from 'stucco-js';
import { DB } from '../db/mongo';
import { getResolverData } from '../shared';
import { resolverFor } from '../zeus';

export const handler = async (input: FieldResolveInput) =>
  DB().then((db) => {
    const { data } = getResolverData<{ model: string; sourceParameters?: string[] }>(input);
    const model = data?.model;
    if (!model) {
      throw new Error('Please specify a database model name');
    }
    const _id = input.arguments?._id as string;
    if (!_id) {
      throw new Error(`"_id" parameter is required on this field`);
    }
    return db.collection(model).deleteOne({ _id });
  });
