import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "src/models/recipes/entities/recipe.entity";

@Entity()
export class Theme {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 10 })
    name: string

    @ManyToMany(() => Recipe, (recipe) => recipe.themes)
    recipes: Recipe[]
}
