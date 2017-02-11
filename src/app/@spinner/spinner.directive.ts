import {
    Directive,
    Component,
    Input,
    DoCheck,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    Injector
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { objectsUtil } from '../@utils/objects';

import { ISpinnerOptions } from './spinner-options.interface';
import { SpinnerComponent } from './spinner.component';
import { SpinnerBackDropComponent } from './spinner-backdrop.component';
import { SpinnerConfig } from './spinner-config';
import { PromiseTrackerService } from './promise-tracker.service';

@Directive({
    selector: '[spinner]',
    providers: [PromiseTrackerService],
    host: { '[class.spinner-loader]': 'true' }
})
export class SpinnerDirective implements DoCheck {

    @Input('spinner')
    options: any;

    private spinnerRef: ComponentRef<SpinnerComponent>;
    private backdropRef: ComponentRef<SpinnerBackDropComponent>;
    private locOptions: ISpinnerOptions;
    private prevOptions: ISpinnerOptions;
    private template: string;
    private backdrop: boolean;

    constructor(private cfResolver: ComponentFactoryResolver,
        private tracker: PromiseTrackerService,
        private vcRef: ViewContainerRef,
        private injector: Injector
    ) {}

    private normalizeOptions(options: any) {
        if (!options) {
            options = { busy: null };
        }
        else if (Array.isArray(options)
            || options instanceof Promise
            || options instanceof Subscription
        ) {
            options = { busy: options };
        }
        options = Object.assign({}, new SpinnerConfig(), options);
        if (!Array.isArray(options.busy)) {
            options.busy = [options.busy];
        }

        return options;
    }

    private dectectOptionsChange() {
        if (objectsUtil.equals(this.locOptions, this.prevOptions)) {
            return false;
        }
        this.prevOptions = this.locOptions;
        return true;
    }

    ngDoCheck() {
        let options: ISpinnerOptions = this.locOptions = this.normalizeOptions(this.options);

        if (!this.dectectOptionsChange()) {
            return;
        }

        if (this.spinnerRef) {
            this.spinnerRef.instance.context.message = options.message;
        }

        
        !objectsUtil.equals(options.busy, this.tracker.promiseList)
            && this.tracker.reset({
                promiseList: <Array<Promise<any>>>options.busy,
                delay: options.delay,
                minDuration: options.minDuration
            });
        
        if (!this.spinnerRef
            || this.template !== options.template
            || this.backdrop !== options.backdrop
        ) {
            this.destroyComponents();

            this.template = options.template;
            this.backdrop = options.backdrop;

            options.backdrop && this.createBackdrop();

            this.createSpinner();
        }
    }

    private createBackdrop() {
        const backdropFactory = this.cfResolver.resolveComponentFactory(SpinnerBackDropComponent);
        this.backdropRef = this.vcRef.createComponent(backdropFactory, null, this.injector);
    }

    private destroyComponents() {
        this.spinnerRef && this.spinnerRef.destroy();
        this.backdropRef && this.backdropRef.destroy();
    }

    private createSpinner() {
        const spinnerFactory = this.cfResolver.resolveComponentFactory(SpinnerComponent);
        this.spinnerRef = this.vcRef.createComponent(spinnerFactory, null, this.injector);

        const {message, wrapperClass, template} = this.locOptions;
        let instance = this.spinnerRef.instance;

        instance.context.message = message;
        instance.wrapperClass = wrapperClass;
        instance.template = template;
    }
    ngOnDestroy() {
        this.destroyComponents();
    }

}