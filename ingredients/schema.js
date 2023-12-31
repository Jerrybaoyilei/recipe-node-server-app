import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
}, { collection: 'ingredients' })

export default ingredientSchema;