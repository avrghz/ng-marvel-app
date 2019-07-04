import { Injectable } from '@angular/core'
import { switchMap, catchError, withLatestFrom, map } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromSeriesByNameActions from './series-by-name.actions'
import * as fromRoot from '../../app.selector'
import { AppState } from '../../app.reducer'
import { SeriesModel } from '../../../series/series.model'
import { APIService } from '../../../shared/services/api.service'
import { ACTION_TAGS, SEARCH_PAGE_LIMIT } from '../../../constants'
import { UIService } from '../../ui/ui.service'

@Injectable()
export class SeriesByNameEffects {
    /*
     * This effect fetch from server
     * @triggering action: fetch start
     * @action fired: fetch success / fetch error
     */
    fetchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSeriesByNameActions.fetchStart),
            withLatestFrom(this.store.pipe(select(fromRoot.selectComicsByNameTotal))),
            switchMap(([action, count]) => {
                if (count > 0) {
                    return of(fromSeriesByNameActions.fetchedFromStore())
                }
                return this.fetchFromServer(action.payload, SEARCH_PAGE_LIMIT, 0)
            })
        )
    )

    private readonly TAG = ACTION_TAGS.seriesByName

    constructor(
        private api: APIService,
        private actions$: Actions,
        private store: Store<AppState>,
        private uiService: UIService
    ) {}

    /*
     * This effect is used to show spinner
     * @triggering action: fetch start/fetch next page
     * @action fired: show UI spinner
     */
    showSpinner$ = this.uiService.showSpinnerEffect([fromSeriesByNameActions.fetchStart], this.TAG)

    /*
     * This effect is used to hide spinner
     * @triggering action: fetch success / fetch from store/ no moire to fetch
     * @action fired: show UI spinner
     */
    hideSpinner$ = this.uiService.hideSpinnerEffect([fromSeriesByNameActions.fetchSuccess], this.TAG)

    /*
     * This function fetch data from server
     * @params filter : string
     * @params limit : number
     * @params offset : number
     * return : Observable<fetch success / fetch error action>
     */
    private fetchFromServer(filter: string, limit: number, offset: number) {
        return this.api.getSeries(limit, offset, filter).pipe(
            map(res =>
                fromSeriesByNameActions.fetchSuccess({
                    payload: res.results.map(
                        item => new SeriesModel(item.id, item.title, item.description, item.thumbnail)
                    ),
                })
            ),
            catchError(err => of(this.uiService.setError(err, this.TAG)))
        )
    }
}
