import {
    Component,
    trigger,
    state,
    style,
    transition,
    ViewEncapsulation,
    animate
} from '@angular/core';

import { PromiseTrackerService } from './promise-tracker.service';

const inactiveStyle = style({
    opacity: 0,
});

const timing = '.3s ease';

@Component({
    selector: 'spinner-backdrop',
    template: require('./spinner-backdrop.html'),
    styleUrls: ['./backdrop.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('fadeInOut', [
            transition('void => *', [
                inactiveStyle,
                animate(timing)
            ]),
            transition('* => void', [
                animate(timing, inactiveStyle)
            ])
        ])
    ]
})
export class SpinnerBackDropComponent {
    constructor(private tracker: PromiseTrackerService) {
    }

    isActive() {
        return this.tracker.isActive();
    }
}