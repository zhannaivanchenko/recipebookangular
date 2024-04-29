import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ApiRecipe} from "../api-recipe.model";

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
    recipe: ApiRecipe;
    id: number;

    constructor(private recipeService: RecipeService,
                private route: ActivatedRoute,
                private router: Router) {
    }
    ngOnInit() {
       this.route.params.subscribe(
           (params: Params) => {
                this.id = +params['id'];
                this.recipe = this.recipeService.getRecipe(this.id);
           }
       )
    }

    onAddToShoppingList() {
        this.recipeService.addIngredientsToShoppingList(this.recipe.extendedIngredients);
    }

    onEditRecipe() {
        // this.router.navigate(['edit'], {relativeTo: this.route});
        this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
    }

    onDeleteRecipe() {
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['/recipes']);
    }

    navigateBack() {
        this.router.navigate(['../']);
    }


}
