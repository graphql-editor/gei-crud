import { FieldResolveInput } from 'stucco-js';
import { prepareRelatedField, prepareRelatedModel } from '../data';
import { DB } from '../db/mongo';

export const handler = async (input: FieldResolveInput) =>
  DB().then((db) => {
    const source = input.source;
    if (!source) {
      throw new Error(
        'Invalid input. This resolver work only if it is piped from other resolver. Either make it correct way or remove sourceParameters from resolver',
      );
    }
    const s = source as Record<string, any>;
    const field = prepareRelatedField(input);
    return db
      .collection(prepareRelatedModel(input))
      .find({ [field]: s._id })
      .toArray();
  });
