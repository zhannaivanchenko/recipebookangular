import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {ApiRecipe} from "../recipes/api-recipe.model";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

const API_KEY = "79a88b7641f9432b8c1e14f99d333374";

@Injectable({providedIn: "root"})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://angular-recipe-book-6d201-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
            .subscribe(response => console.log(response));
    }

    fetchRecipes() {
             return this.http.get< ApiRecipe[]>(
            'https://angular-recipe-book-6d201-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        )
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            extendedIngredients: recipe.extendedIngredients ? recipe.extendedIngredients : []
                        }
                    })
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            )
    }
}
