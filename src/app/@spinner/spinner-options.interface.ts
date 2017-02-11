import { Subscription } from 'rxjs/Subscription';

export interface ISpinnerOptions {
    template?: string;
    delay?: number;
    minDuration?: number;
    backdrop?: boolean;
    message?: string;
    wrapperClass?: string;
    busy?: Promise<any> | Subscription | Array<Promise<any> | Subscription>
}
