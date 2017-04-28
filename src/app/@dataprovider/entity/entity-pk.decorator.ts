import { IEntityColumnOptions } from './entity-column-options.interface';
import { IEntityColumn } from './entity-column.interface';
import { EntityService } from './entity.service';

export function PK(options?: IEntityColumnOptions) {

    return function (target: any, propertyKey: string) {

        let opt: IEntityColumn = { name: propertyKey, propertyKey: propertyKey };

        if (options) {
            opt.name = options.name;
        }

        EntityService.addPrimaryKey(target.constructor.name, opt);
    };

}