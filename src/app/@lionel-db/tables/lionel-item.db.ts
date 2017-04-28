import {
    Entity,
    IEntityDecorator,
    IEntity,
    Column,
    PK,
    IEntityColumnOptions
} from '../../@dataprovider';

@Entity({ name: 'LionelItem' })
export class LionelItemDB {

    @Column({ name: 'External_Id' })
    public ExternalId: string = null;

    @Column()
    public Title: string = null;

    @PK()
    public Id: string = null;

    constructor() {
    }

}

@Entity({ name: 'LionelAge' })
export class LionelAgeDB {

    @Column()
    public Title: string = null;

    @PK()
    public Id: string = null;

    constructor() {
    }

}

