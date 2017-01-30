import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter
} from '@angular/core';

import { IPager } from './pager.interface';
import { IPagerOptions } from './pager-options.interface';
import { PagerService } from './pager.service';
import { arrayUtil } from '../@utils';
import { Observable } from 'rxjs';

@Component({
    selector: 'pager',
    template: require('./pager.html')
})
export class PagerComponent implements OnInit, OnChanges {

    @Input()
    public options: IPagerOptions = { currentPage: 1, pageSize: 48, totalItems: 400 };

    @Input()
    public getPageHandler: (pager: IPager) => Observable<any>;

    @Output()
    public pageChange: EventEmitter<any> = new EventEmitter();

    private allPages: Array<any> = [];

    // pager object
    public pager: IPager = null;

    constructor(private pagerService: PagerService) {}

    public ngOnInit() {

    }

    public ngOnChanges(changes: SimpleChanges): void {

        if (changes['options']) {

            this.pager = this.pagerService.getPager(this.options);
            this.allPages = arrayUtil.range(0, this.pager.totalPages)
                .map(() => { return []; });
        }

    }

    public setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.options.currentPage = page;
        this.pager = this.pager = this.pagerService.getPager(this.options);

        if (this.allPages[page - 1].length === 0) {

            this.getPageHandler(this.pager).subscribe(data => {

                this.allPages[page - 1] = data;
                this.pageChange.emit(this.allPages[page - 1]);
            });
        } else {

            this.pageChange.emit(this.allPages[page - 1]);
        }
    }

}

