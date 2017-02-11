import {
    Component,
    trigger,
    state,
    style,
    transition,
    animate,
    ViewEncapsulation
} from '@angular/core';

import { PromiseTrackerService } from './promise-tracker.service';


const inactiveStyle = style({
    opacity: 0,
    transform: 'translateY(-40px)'
});
const timing = '.3s ease';

export interface ISpinnerContext {
    message: string;
};

@Component({
    selector: 'spinner-loader',
    template: require('./spinner.html'),
    styleUrls: ['./spinner.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('flyInOut', [
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
export class SpinnerComponent {
    message: string;
    wrapperClass: string;
    template: string;
    context: ISpinnerContext = {
        message: null
    };

    constructor(private tracker: PromiseTrackerService) {
    }

    isActive() {
        return this.tracker.isActive();
    }
}