import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ApiRecipe} from "../api-recipe.model";
import {DataStorageService} from "../../shared/data-storage.service";


@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, OnDestroy {
    recipes: ApiRecipe[];
    subscription: Subscription;

    constructor(private recipeService: RecipeService,
                private router: Router,
                private route: ActivatedRoute,
                private dataService: DataStorageService) { }

    ngOnInit() {
        this.subscription = this.recipeService.recipesChanged.subscribe(
            (recipes: ApiRecipe[]) => {
                this.recipes = recipes;
            }
        )
        // this.dataService.fetchRecipes();
        this.recipes = this.recipeService.getRecipes();
    }

    onNewRecipe() {
        this.router.navigate(['new'], {relativeTo: this.route});
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
