import * as fromCharactersReducer from '../characters/store/characters.reducer'
import * as fromComicsReducer from '../comics/store/comics.reducer'
import * as fromComicsByCharacterIdReducer from '../comics/store/byCharacterId/comics-by-characterId.reducer'
import * as fromComicsBySeriesIdReducer from '../comics/store/bySeriesId/comics-by-seriesId.reducer'
import * as fromComicReducer from '../comics/comic-details/store/comic.reducer'
import * as fromCharacterReducer from '../characters/character-details/store/character.reducer'
import * as fromSeriesReducer from '../series/store/series.reducer'
import * as fromSeriesDetailsReducer from '../series/series-details/store/series-details.reducer'
import * as fromSeriesByCharacterIdReducer from '../series/store/byCharacterId/series-by-characterId.reducer'
import * as fromCharactersByComicIdReducer from '../characters/store/byComicId/characters-by-comicId.reducer'
import * as fromCharactersBySeriesIdReducer from '../characters/store/bySeriesId/characters-by-seriesId.reducer'

export interface AppState {
    characters: fromCharactersReducer.State
    comics: fromComicsReducer.State
    character: fromCharacterReducer.State
    comic: fromComicReducer.State
    series: fromSeriesReducer.State
    seriesDetails: fromSeriesDetailsReducer.State
    comicByCharacterId: fromComicsByCharacterIdReducer.State
    comicBySeriesId: fromComicsBySeriesIdReducer.State
    seriesByCharacterId: fromSeriesByCharacterIdReducer.State
    charactersByComicId: fromCharactersByComicIdReducer.State
    charactersBySeriesId: fromCharactersBySeriesIdReducer.State
}

export const appReducer = {
    characters: fromCharactersReducer.reducer,
}
