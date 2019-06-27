import { Directive, HostBinding, Input, OnInit } from '@angular/core'

@Directive({
    selector: '[appProgressiveImageLoading]',
})
export class ProgressiveImageLoadingDirective implements OnInit {
    // add a default image here
    // tslint:disable-next-line:no-input-rename
    @Input('appProgressiveImageLoading-placeholder') placeholder: string
    // tslint:disable-next-line:no-input-rename
    @Input('appProgressiveImageLoading') image: string
    // tslint:disable-next-line:no-input-rename
    @Input('class') cssClass: string
    @HostBinding('attr.src') bgImage: string
    @HostBinding('class') newCssClass: string

    constructor() {}

    ngOnInit() {
        if (this.placeholder) {
            this.newCssClass = `${this.cssClass} blur`
            this.bgImage = this.placeholder
        } else {
            this.newCssClass = `${this.cssClass} default-loader`
            this.bgImage = 'assets/image-placeholder.gif'
        }
        this.loadActualImage()
    }

    loadActualImage() {
        let actualImage = new Image()
        actualImage.src = this.image
        actualImage.onload = () => {
            this.newCssClass = this.cssClass
            this.bgImage = this.image
            actualImage = null
        }

        actualImage.onerror = () => {
            if (this.placeholder) {
                this.newCssClass = this.cssClass
            }
            actualImage = null
        }
    }
}
