import {
    Component,
    trigger,
    state,
    style,
    transition,
    animate
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
    selector: 'ng-busy',
    template: require('./spinner.html'),
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