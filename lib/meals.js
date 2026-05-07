import fs from 'node:fs'
import sql from 'better-sqlite3'
const db = sql('meals.db')
import slugify from 'slugify'
import xss from 'xss'


export async function getMeals() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const stmt = db.prepare('SELECT * FROM meals')
    return stmt.all()
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}


export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);
    const extension = meal.image.name.split('.').pop();
    const imageName = `${meal.slug}-${Date.now()}.${extension}`;
    const imagePath = `public/images/${imageName}`;
    const stream = fs.createWriteStream(imagePath);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Failed to save the image');
        }
    });

    meal.image = `/images/${imageName}`;

    db.prepare(`INSERT INTO meals (creator, creator_email, title, summary, instructions, image,slug)
        VALUES(
        @creator,
        @creator_email,
        @title,
        @summary,
        @instructions,
        @image, @slug
    )
    `).run(meal);
}