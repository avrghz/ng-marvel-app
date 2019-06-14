import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CharactersComponent } from './characters/characters.component'
import { CharacterDetailsComponent } from './characters/character-details/character-details.component'

const routes: Routes = [
    { path: 'character/:id', component: CharacterDetailsComponent },
    { path: 'characters', component: CharactersComponent },
    { path: '', redirectTo: '/characters', pathMatch: 'full' },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}