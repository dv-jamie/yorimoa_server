import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "src/models/recipes/entities/recipe.entity";
import { CategoriesType } from "../types/categories.type";
import { Refrigerator } from "src/models/refrigerators/entities/refrigerator.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 30 })
    type: CategoriesType

    @Column({ length: 10 })
    name: string

    @Column()
    sequence: number

    @ManyToMany(() => Recipe, (recipe) => recipe.themes, {
        onDelete: 'CASCADE'
    })
    recipes: Recipe[]

    @ManyToMany(() => Refrigerator, (refrigerators) => refrigerators.categories, {
        onDelete: 'CASCADE'
    })
    refrigerators: Refrigerator[]
}
