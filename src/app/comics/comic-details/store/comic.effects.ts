import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromComicActions from './comic.actions'
import * as fromComicsReducer from '../../store/comics.reducer'
import { AppState } from '../../../store/app.reducer'
import { ComicsResults } from 'src/app/shared/model/shared.interface'

@Injectable()
export class ComicEffects {
    @Effect() fetchCharacters = this.actions$.pipe(
        ofType(fromComicActions.FETCH_COMIC_START),
        withLatestFrom(this.store.select('comics')),
        switchMap(([action, comicsState]: [fromComicActions.FetchComicStart, fromComicsReducer.State]) => {
            if (comicsState.data.length > 0) {
                const character = comicsState.data.find(res => res.id === action.payload)
                if (character) {
                    return of(new fromComicActions.FetchComicSuccess(character))
                }
            }

            return this.http$.get<ComicsResults>(`comics/${action.payload}`).pipe(
                map(res => (res.data && res.data.results && res.data.results.length > 0 ? res.data.results[0] : null)),
                map(res => new fromComicActions.FetchComicSuccess(res))
            )
        }),
        catchError(err => of(new fromComicActions.FetchComicError(err)))
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}
}
