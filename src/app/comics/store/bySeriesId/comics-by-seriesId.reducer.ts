import { HttpErrorResponse } from '@angular/common/http'
import { createReducer, on, Action } from '@ngrx/store'

import * as fromComicsBySeriesIdActions from './comics-by-seriesId.actions'
import { PAGE_LIMIT } from '../../../constants'
import { Pagination } from '../../../shared/model/pagination.model'
import { ComicModel } from '../../comic.model'

export interface State {
    fetching: boolean
    data: ComicModel[]
    pagination: Pagination
    error: HttpErrorResponse
    filterId: number
}

const initialState: State = {
    fetching: false,
    pagination: new Pagination(-1, PAGE_LIMIT, 0, 0),
    data: [],
    error: null,
    filterId: null,
}

const comicsBySeriesIdReducer = createReducer<State>(
    initialState,
    on(fromComicsBySeriesIdActions.fetchStart, (state, action) => {
        if (state.filterId === action.payload) {
            return {
                ...state,
                fetching: true,
                error: null,
            }
        } else {
            return {
                ...state,
                ...initialState,
                fetching: true,
                filterId: action.payload,
            }
        }
    }),
    on(fromComicsBySeriesIdActions.fetchNextPage, state => ({
        ...state,
        fetching: true,
        error: null,
    })),
    on(fromComicsBySeriesIdActions.fetchSuccess, (state, action) => ({
        ...state,
        fetching: false,
        error: null,
        pagination: action.pagination,
        data: [...state.data, ...action.payload],
    })),
    on(fromComicsBySeriesIdActions.fetchError, (state, action) => ({
        ...state,
        fetching: false,
        error: action.payload,
    })),
    on(fromComicsBySeriesIdActions.fetchedFromStore, fromComicsBySeriesIdActions.noMoreToFetch, state => ({
        ...state,
        fetching: false,
    }))
)

export function reducer(state: State | undefined, action: Action) {
    return comicsBySeriesIdReducer(state, action)
}
