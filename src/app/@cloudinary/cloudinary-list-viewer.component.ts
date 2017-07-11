import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter
} from '@angular/core';

import { Observable } from 'rxjs';
import { CloudinaryService } from './cloudinary.service';
import { ICloudinaryResource } from './cloudinary-resource.interface';

@Component({
    selector: 'cloudinary-list-viewer',
    template: require('./cloudinary-list-viewer.html')
})
export class CloudinaryListViewerComponent implements OnInit, OnChanges {

    @Output()
    public pageChange: EventEmitter<any> = new EventEmitter();

    public allResources: ICloudinaryResource[] = [];

    constructor(private cloudinaryService: CloudinaryService) {}

    public ngOnInit() {

        this.cloudinaryService.getLionelImages().subscribe( (r) => {
            this.allResources = r.sort((a, b) => {
                if (a.public_id < b.public_id) {
                    return -1;
                }
                if (a.public_id > b.public_id) {
                    return 1;
                }
                return 0;
            });
            //console.log(this.allResources);
        });
    }

    public ngOnChanges(changes: SimpleChanges): void {}
}

