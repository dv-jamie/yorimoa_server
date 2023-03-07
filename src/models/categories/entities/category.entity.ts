import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "src/models/recipes/entities/recipe.entity";
import { CategoriesType } from "../types/categories.type";

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
}
