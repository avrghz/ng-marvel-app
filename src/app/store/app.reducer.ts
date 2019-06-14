import { ActionReducerMap } from '@ngrx/store'

import * as fromCharactersReducer from '../characters/store/characters.reducer'
import * as fromComicsReducer from '../comics/store/comics.reducer'
import * as fromComicReducer from '../comics/comic-details/store/comic.reducer'
import * as fromCharacterReducer from '../characters/character-details/store/character.reducer'
import * as fromSeriesReducer from '../series/store/series.reducer'
import * as fromSeriesDetailsReducer from '../series/series-details/store/series-details.reducer'

export interface AppState {
    characters: fromCharactersReducer.State
    comics: fromComicsReducer.State
    character: fromCharacterReducer.State
    comic: fromComicReducer.State
    series: fromSeriesReducer.State
    seriesDetails: fromSeriesDetailsReducer.State
}

export const appReducer: ActionReducerMap<AppState> = {
    characters: fromCharactersReducer.charactersReducer,
    comics: fromComicsReducer.comicsReducer,
    character: fromCharacterReducer.characterReducer,
    comic: fromComicReducer.comicReducer,
    series: fromSeriesReducer.seriesReducer,
    seriesDetails: fromSeriesDetailsReducer.seriesDetailsReducer,
}
