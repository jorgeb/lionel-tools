
import { DataProvider } from '../@dataprovider';
import { LionelItemDB, LionelAgeDB } from './tables/lionel-item.db';

export const LionelItems: DataProvider<LionelItemDB> = new DataProvider<LionelItemDB>(LionelItemDB);
export const LionelAges: DataProvider<LionelAgeDB> = new DataProvider<LionelAgeDB>(LionelAgeDB);
