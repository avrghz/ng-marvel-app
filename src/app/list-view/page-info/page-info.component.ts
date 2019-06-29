import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core'
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
    selector: 'app-page-info',
    templateUrl: './page-info.component.html',
    styleUrls: ['./page-info.component.scss'],
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
            ]),
            transition(':leave', [animate('200ms ease-in', style({ transform: 'translateX(100%)' }))]),
        ]),
    ],
})
export class PageInfoComponent implements OnDestroy {
    /*
        Input for this component
    */
    @Input() total = 0
    @Input() current = 0
    @Input() hideAfter = 5000
    @Input() set showCondition(val) {
        this.show = val
        if (val) {
            console.log('registered')
            this.hideTimeout = setTimeout(() => {
                console.log('emitted')
                this.hideEvent.emit()
            }, +this.hideAfter)
        }
    }
    show = false

    /*
        Event emitted after the specified time (hideAfter)
    */
    @Output() hideEvent: EventEmitter<void> = new EventEmitter()

    private hideTimeout

    constructor() {}

    ngOnDestroy() {
        /*
            Clear timeout when component is destroyed
        */
        clearTimeout(this.hideTimeout)
    }
}
