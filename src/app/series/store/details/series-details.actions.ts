import { createAction, props } from '@ngrx/store'

import { SeriesModel } from '../../series.model'
import { ACTION_TAGS } from '../../../constants'

const TAG = ACTION_TAGS.seriesDetails

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: string }>())

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: SeriesModel }>())
