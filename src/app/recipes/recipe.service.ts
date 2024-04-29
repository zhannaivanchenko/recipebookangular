
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";
import {ApiRecipe} from "./api-recipe.model";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<ApiRecipe[]>();

    private recipes: ApiRecipe[] = []

    constructor(private slService: ShoppingListService) {
    }

    setRecipes(recipes: ApiRecipe[]) {
        this.recipes = recipes;
        console.log("this.recipes=", this.recipes);
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        if (!this.recipes ) return [];
        return this.recipes.slice();
    }

    getRecipe(id:number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: ApiRecipe) {
        console.log("recipe=", recipe)
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: ApiRecipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}
