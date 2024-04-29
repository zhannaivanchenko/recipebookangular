import {Ingredient} from "../shared/ingredient.model";

export class  ApiRecipe {
    public title: string;
    public summary: string;
    public image: string;
    public extendedIngredients: Ingredient[];

    constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
        this.title = name;
        this.summary = description;
        this.image = imagePath;
        this.extendedIngredients = ingredients;
    }
}
