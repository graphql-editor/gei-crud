import fs from 'fs';
import path from 'path';
import { FieldResolveInput, TypeRef } from 'stucco-js';

export const config = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'stucco.json'), 'utf-8')) as StuccoConfig;

export const getResolverData = <T>(input: FieldResolveInput) => {
  const { parentType, fieldName } = input.info;
  const resolver = config.resolvers[`${parentType}.${fieldName}`];
  return resolver as ResolverConfig<T>;
};
export interface StuccoConfig {
  resolvers: Resolvers;
}

export interface Resolvers {
  [x: `${string}.${string}`]: ResolverConfig;
}

export interface ResolverConfig<T = unknown> {
  resolve: Resolve;
  data?: T;
}

export interface Resolve {
  name: string;
}

export const getReturnTypeName = (ref: TypeRef): string | undefined => {
  if (!ref) return;
  if ('nonNull' in ref || 'list' in ref) {
    return getReturnTypeName(ref);
  }
  return ref.name;
};