import { Injectable } from '@angular/core';

@Injectable()
export class LiveAuctionersService {

    public getAuctionItems = function (): any[] {
        return [{ desc: '1', Id: 0, title: '', externalId: '', sortOrder: 0, auction: 265 }];
    }
}
