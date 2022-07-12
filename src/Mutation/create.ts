import { OptionalId } from 'mongodb';
import { FieldResolveInput } from 'stucco-js';
import { DB } from '../db/mongo';
import { getReturnTypeName, getResolverData } from '../shared';
import { resolverFor } from '../zeus';

export const handler = async (input: FieldResolveInput) =>
  DB().then((db) => {
    const { data } = getResolverData<{ model: string; sourceParameters?: string[] }>(input);
    const model = data?.model;
    if (!model) {
      throw new Error('Please specify a database model name');
    }
    const sourceParameters = data.sourceParameters;
    const rt = getReturnTypeName(input.info.returnType);
    if (rt !== 'String') {
      throw new Error('Create node field should have String return type.');
    }
    const entries = Object.entries(input.arguments || {});
    if (entries.length !== 1) {
      throw new Error('There should be only one argument of "input" type to create this model');
    }
    let creationInput = entries[0][1] as OptionalId<any>;
    if (sourceParameters && sourceParameters.length > 0) {
      if (!input.source) {
        throw new Error(
          'Invalid input. This resolver work only if it is piped from other resolver. Either make it correct way or remove sourceParameters from resolver',
        );
      }
      const s = input.source as Record<string, any>;
      sourceParameters.forEach((sp) => {
        const sourceParamValue = s[sp];
        if (!sourceParamValue) {
          throw new Error(
            `Parameter "${sp}" does not exist on object ${JSON.stringify(
              s,
              null,
              2,
            )}. Please change sourceParam name or provide correct source from piped resolver.`,
          );
        }
        creationInput = {
          ...creationInput,
          [sp]: sourceParamValue,
        };
      });
    }
    return db
      .collection(model)
      .insertOne(creationInput)
      .then((result) => result.insertedId);
  });
