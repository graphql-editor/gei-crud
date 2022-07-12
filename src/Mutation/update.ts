import { FieldResolveInput } from 'stucco-js';
import { DB } from '../db/mongo';
import { getResolverData } from '../shared';
import { resolverFor } from '../zeus';

export const handler = async (input: FieldResolveInput) =>
  DB().then((db) => {
    const { data } = getResolverData<{ model: string }>(input);
    const model = data?.model;
    if (!model) {
      throw new Error('Please specify a database model name');
    }
    const _id = input.arguments?._id as string;
    if (!_id) {
      throw new Error(`"_id" parameter is required on this field`);
    }
    const entries = Object.entries(input.arguments || {});
    if (entries.length !== 2) {
      throw new Error(
        'There should be only 2 arguments one "String" _id argument and one of "input" type to update this model',
      );
    }
    const setter = entries.find((e) => e[0] !== '_id');
    if (!setter) {
      throw new Error(`You need update input argument for this resolver to work`);
    }
    return db.collection(model).updateOne({ _id }, { $set: setter[1] });
  });
