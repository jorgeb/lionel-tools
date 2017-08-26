import { Observable, Observer } from 'rxjs';

/*
  Leer => 
  https://eapyl.github.io/article/Use-WebSQL-and-IndexedDB-in-Typescript-25-November-2016.html
*/
export class SQLiteService {
  public static createDB(): Observable<any> {
    const newTables: Array<Observable<any>> = [];

    newTables.push(SQLiteService.execute(`CREATE TABLE IF NOT EXISTS LionelItems
      (LionelId VARCHAR(255) PRIMARY KEY ASC,
      Title TEXT,
      Desc TEXT,
      Images TEXT,
      CategoryId INT,
      CategoryBySource TEXT,
      LionelExternalId VARCHAR(255),
      LionelPartId VARCHAR(255),
      LionelEraId INT)`
      )
    );
    return Observable.forkJoin(newTables);
  }

  public static execute(query: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      SQLiteService.openDB().transaction(
        (tx) => tx.executeSql(query,
          [],
          (t, results) => {
            observer.next(this);
            observer.complete();
          },
          (t, message) => {
            console.log(message);
            observer.error(message.message.toString());
            return true;
          })
      );
    });

    // create the cars table using SQL for the database using a transaction
    // t.executeSql('CREATE TABLE IF NOT EXISTS cars (id INTEGER PRIMARY KEY ASC, make TEXT, model TEXT)');
  }

  private static locWindows: any = window;
  private static db: string = 'lionel_db';
  private static version: string = '1.0';
  private static desc: string = 'Me aburrí del fusion-tables';
  private static openedDB: any = null;
  private static openDB(): any {
    if (SQLiteService.locWindows.openDatabase) {
      // Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
      if (!SQLiteService.openedDB) {
        SQLiteService.openedDB = SQLiteService.locWindows.openDatabase(SQLiteService.db, SQLiteService.version, SQLiteService.desc, 1024 * 1024);
      }
      return SQLiteService.openedDB;
    } else {
      alert('WebSQL is not supported by your browser!');
      return null;
    }
  }

}
