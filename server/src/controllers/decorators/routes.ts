import 'reflect-metadata';
import { Methods, MetadataKeys } from './dataStructures';

function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
      Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.Get);
export const post = routeBinder(Methods.Post);
export const put = routeBinder(Methods.Put);
export const patch = routeBinder(Methods.Patch);
export const del = routeBinder(Methods.Del);
