import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipe.entity";

@Entity()
export class Step {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 10 })
    division: string

    @Column()
    comment: string

    @Column()
    tip: string

    @Column('varchar')
    images: string[]

    @Column('int')
    sequence: number

    @ManyToOne(() => Recipe, (recipe) => recipe.steps)
    recipe: Recipe
}
