import { IEntityOptions } from './entity-options.interface';
import { EntityService } from './entity.service';


export function Entity(options: IEntityOptions) {

    return function (target: any) {
        const entity = EntityService.add(target.name, options);
        console.log('EntityService.add',target.name);
        target.prototype.getEntityMetaData = function () {
            console.log('target.prototype.getEntityMetaData');
            return entity;
        }

    }
}

/*

function addAndCall(cb: Function, newField: string) {
  // cb is now available in the decorator
  return function(ctor: Function): void {

    Object.defineProperty(ctor.prototype, newField, {
      value: function(...args: any[]) {
        return Object.defineProperty(this, newField, {

          value: function(...args: any[]) {
            console.log(newField, ...args);
          }

        })[newField](...args);
      }
    });
    cb(ctor);
  }
}



*/