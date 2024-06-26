import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";


const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes',
        loadChildren: () => import("./recipes/recipes.module").then((mod) => mod.RecipesModule)
    },
    { path: 'shopping-list',
        loadChildren: () => import("./shopping-list/shopping-list.module").then((mod) => mod.ShoppingListModule)
    },
    { path: 'auth',
        loadChildren: () => import("./auth/auth.module").then((mod) => mod.AuthModule)
    },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
