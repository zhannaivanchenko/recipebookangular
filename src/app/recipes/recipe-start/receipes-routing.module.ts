import {NgModule} from "@angular/core";
import {RecipesComponent} from "../recipes.component";
import {AuthGuard} from "../../auth/auth.gueard";
import {RecipeStartComponent} from "./recipe-start.component";
import {RecipeEditComponent} from "../recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "../recipe-detail/recipe-detail.component";
import {recipeResolver} from "../recipes-resolver.service";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
    {
        path: '',
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
            {path: '', component: RecipeStartComponent, pathMatch: 'full'},
            {path: 'new', component: RecipeEditComponent},
            {path: ':id', component: RecipeDetailComponent, resolve: [recipeResolver]},
            {path: ':id/edit', component: RecipeEditComponent, resolve: [recipeResolver]}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}
