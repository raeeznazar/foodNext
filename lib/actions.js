'use server'

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

export async function shareMeal(prevState, formData) {

    function isInvalid(value) {
        return !value || value.trim().length === 0;
    }
    const enteredName = formData.get('name');
    const enteredEmail = formData.get('email');
    const enteredTitle = formData.get('title');
    const enteredSummary = formData.get('summary');
    const enteredInstructions = formData.get('instructions');
    const enteredImage = formData.get('image');

    const meal = {
        creator: enteredName,
        creator_email: enteredEmail,
        title: enteredTitle,
        summary: enteredSummary,
        instructions: enteredInstructions,
        image: enteredImage,
    };

    if (isInvalid(meal.title) || isInvalid(meal.summary) || isInvalid(meal.instructions) || isInvalid(meal.creator)
        || !meal.creator_email.includes('@') || meal.image.size === 0) {
        // throw new Error('Invalid input - please check your data.');
        return {
            message: 'Invalid input - please check your data.'
        }
    }

    await saveMeal(meal);
    redirect('/meals');
}   