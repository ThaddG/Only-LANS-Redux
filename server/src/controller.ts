import { Request, Response, RequestHandler, NextFunction } from 'express';
import 'reflect-metadata';
import { AppRouter } from './AppRouter';
import { Methods, MetadataKeys } from './controllers/decorators/dataStructures';

// automate checking process for keys in the req body
function validateBody(keys: string[]): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    // check if the body doesn't exist
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    // check if all the keys exist in the body
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }

    // if all is fine, move on to the next function
    next();
  };
}

export function controller(routerPrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    console.log('target', target);

    for (let key in target.prototype) {
      console.log('methods', key)
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.Path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.Method,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata('middleware', target.prototype, key) || [];

      // store the req body
      const requiredBodyProperties =
        Reflect.getMetadata(MetadataKeys.Validator, target.prototype, key) ||
        [];

      // validate the req body
      const validatedBody = validateBody(requiredBodyProperties);

      if (path) {
        router[method](
          `${routerPrefix}${path}`,
          ...middlewares,
          validatedBody,
          routeHandler
        );
      }
    }
  };
}
