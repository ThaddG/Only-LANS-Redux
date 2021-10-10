import 'reflect-metadata';
import { MetadataKeys } from './dataStructures/MetadataKeys';

export function reqBodyValidator(...keys: string[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.Validator, keys, target, key);
  }
}