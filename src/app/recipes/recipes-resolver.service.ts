import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import {RecipeService} from "./recipe.service";
import {ApiRecipe} from "./api-recipe.model";


export const recipeResolver: ResolveFn<ApiRecipe[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const recipes = inject(RecipeService).getRecipes();

    if (recipes.length === 0) {
        return inject(DataStorageService).fetchRecipes();
    } else {
        return recipes;
    }
}
