import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipe.entity";

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 10 })
    division: string

    @Column({ length: 10 })
    name: string

    @Column({ length: 10 })
    amount: string

    @Column()
    group: number

    @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
    recipe: Recipe
}
