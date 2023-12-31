import Recipe from "./model.js";
import Ingredient from "../ingredients/model.js";
import User from "../users/model.js";
import Nutrient from "../nutrients/model.js";
import RecipesUseIngredients from "../recipes_use_ingredients/model.js";
import RecipesHaveNutrients from "../recipes_have_nutrients/model.js";
import Likes from "../likes/model.js";

export const createRecipe = (recipe) => {
    return Recipe.create(recipe);
}

export const findAllRecipes = () => {
    return Recipe.find().populate('author').populate('ingredients.ingredient').populate('nutrients.nutrient');
}

export const findAllRecipesByAuthorId = (authorId) => {
    return Recipe.find({ author: authorId }).populate('author').populate('ingredients.ingredient').populate('nutrients.nutrient');
}

export const findRecipeById = (recipeId) => {
    return Recipe.findById(recipeId).populate('author').populate("ingredients.ingredient").populate('nutrients.nutrient');
}

export const findRecipeByTitle = (recipeName) => {
    return Recipe.find({ title: recipeName }).populate('author').populate("ingredients.ingredient").populate('nutrients.nutrient');
}

export const findRecipesBySearchTerm = (searchTerm) => {
    return Recipe.find({ title: { $regex: searchTerm, $options: 'i' } }).populate('author').populate("ingredients.ingredient").populate('nutrients.nutrient');
}

export const findRecipeBySpoonacularId = (spoonacularId) => {
    return Recipe.findOne({ spoonacularId: spoonacularId }).populate('author').populate("ingredients.ingredient").populate('nutrients.nutrient');
}

export const updateRecipe = (recipeId, recipe) => {
    return Recipe.updateOne({ _id: recipeId }, { $set: recipe });
}

export const deleteRecipe = async (recipeId) => {
    await Likes.deleteMany({ recipe: recipeId }).exec()
    await RecipesUseIngredients.deleteMany({ recipe: recipeId }).exec()
    await RecipesHaveNutrients.deleteMany({ recipe: recipeId }).exec()
    return Recipe.deleteOne({ _id: recipeId });
}

