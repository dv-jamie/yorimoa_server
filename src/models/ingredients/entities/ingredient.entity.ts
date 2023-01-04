import { IsNumber, IsOptional, IsString } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "../../recipes/entities/recipe.entity";

@Entity()
export class Ingredient {
    @IsOptional()
    @IsNumber()
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @Column({ length: 10 })
    division: string

    @IsString()
    @Column({ length: 10 })
    name: string

    @IsString()
    @Column({ length: 10 })
    amount: string

    @IsNumber()
    @Column()
    group: number

    @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, {
        onDelete: 'CASCADE'
    })
    recipe: Recipe
}
