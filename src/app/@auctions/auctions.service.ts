﻿import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { IAutionItem } from './auction-item.interface';

@Injectable()
export class AuctionsService {

    public getAuctionItems = function (): Array<IAutionItem> {
        return [{ desc: '1', Id: 0, title: '', externalId: '', sortOrder:0 }];
    }
        
}