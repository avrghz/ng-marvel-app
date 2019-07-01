import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
    searchForm: FormGroup

    constructor(private router: Router) {}

    ngOnInit() {
        this.initForm()
    }

    initForm() {
        this.searchForm = new FormGroup({
            search: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        })
    }

    onSubmit() {
        if (this.searchForm.valid) {
            this.router.navigate(['search'], {
                queryParams: {
                    search: this.searchForm.controls.search.value,
                },
            })
        }
    }
}
