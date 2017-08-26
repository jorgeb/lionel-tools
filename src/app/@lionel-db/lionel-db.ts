
import { DataProvider, FusionDB, SQLiteDB, SQLDB } from '../@dataprovider';

import { LionelItemDB, LionelAgeDB } from './tables/lionel-item.db';
import { LionelItemImgDB } from './tables/lionel-item.img.db';
import { LionelImageDB } from './tables/lionel-image.db';

export const LionelItems: DataProvider<LionelItemDB, FusionDB>
  = new DataProvider<LionelItemDB, FusionDB>(LionelItemDB, FusionDB);

export const LionelItemImg: DataProvider<LionelItemImgDB, FusionDB>
  = new DataProvider<LionelItemImgDB, FusionDB>(LionelItemImgDB, FusionDB);

export const LionelItemsSQLite: DataProvider<LionelItemDB, SQLiteDB>
  = new DataProvider<LionelItemDB, SQLiteDB>(LionelItemDB, SQLiteDB);

export const LionelImageSQL: DataProvider<LionelImageDB, SQLDB>
  = new DataProvider<LionelImageDB, SQLDB>(LionelImageDB, SQLDB);
