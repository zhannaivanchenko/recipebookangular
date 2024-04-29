import {Component, Input, OnInit} from '@angular/core';
import {ApiRecipe} from "../../api-recipe.model";

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent implements OnInit {
    @Input() recipeItem: ApiRecipe;
    @Input() index: number;

    constructor() {
    }

    ngOnInit() {
    }
}
