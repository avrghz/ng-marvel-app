import { Injectable } from '@angular/core'
import { switchMap, catchError, withLatestFrom, map, mergeMap } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromCharactersByNameActions from './characters-by-name.actions'
import * as fromPaginationActions from '../../../store/pagination/pagination.action'
import * as fromRoot from '../../../store/app.selector'
import { AppState } from '../../../store/app.reducer'
import { CharacterModel } from '../../character.model'
import { APIService } from '../../../shared/services/api.service'
import { ACTION_TAGS, SEARCH_PAGE_LIMIT, PAGE_LIMIT } from '../../../constants'
import { UIService } from '../../../store/ui/ui.service'
import { Pagination } from '../../../shared/model/pagination.model'

@Injectable()
export class CharactersByNameEffects {
    /*
     * This effect fetch from server
     * @triggering action: fetch start
     * @action fired: fetch success / fetch error
     */
    fetchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCharactersByNameActions.fetchStart),
            withLatestFrom(this.store.pipe(select(fromRoot.selectCharactersByNameTotal))),
            switchMap(([action, count]) => {
                if (count > 0) {
                    return of(fromCharactersByNameActions.fetchedFromStore())
                }
                return this.fetchFromServer(action.payload, PAGE_LIMIT, 0)
            })
        )
    )

    /*
     * This effect fetch next set from server
     * @triggering action: fetch next page
     * @action fired: fetch success / fetch  error
     */
    fetchNextPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCharactersByNameActions.fetchNextPage),
            withLatestFrom(
                this.store.pipe(select(fromRoot.selectFilterForCharactersByName)),
                this.store.select('charactersByName')
            ),
            switchMap(([__, filter, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromCharactersByNameActions.noMoreToFetch())
                } else {
                    return this.fetchFromServer(filter, pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    private readonly TAG = ACTION_TAGS.charactersByName

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
    showSpinner$ = this.uiService.showSpinnerEffect(
        [fromCharactersByNameActions.fetchStart, fromCharactersByNameActions.fetchNextPage],
        this.TAG
    )

    /*
     * This effect is used to hide spinner
     * @triggering action: fetch success / fetch from store/ no moire to fetch
     * @action fired: show UI spinner
     */
    hideSpinner$ = this.uiService.hideSpinnerEffect(
        [
            fromCharactersByNameActions.fetchSuccess,
            fromCharactersByNameActions.fetchedFromStore,
            fromCharactersByNameActions.noMoreToFetch,
        ],
        this.TAG
    )

    /*
     * This function fetch data from server
     * @params filter : string
     * @params limit : number
     * @params offset : number
     * return : Observable<fetch success / fetch error action>
     */
    private fetchFromServer(filter: string, limit: number, offset: number) {
        return this.api.getCharacters(limit, offset, filter).pipe(
            mergeMap(res => [
                fromCharactersByNameActions.fetchSuccess({
                    payload: res.results.map(
                        item => new CharacterModel(item.id, item.name, item.description, item.thumbnail)
                    ),
                }),
                fromPaginationActions.setPagination(this.TAG)({
                    payload: new Pagination(res.offset, res.limit, res.total, res.count),
                }),
            ]),
            catchError(err => of(this.uiService.setError(err, this.TAG)))
        )
    }
}
