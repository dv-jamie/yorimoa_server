import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsString } from 'class-validator';
import { Recipe } from "src/models/recipes/entities/recipe.entity";
import { Diary } from "src/models/diaries/entities/diary.entity";
import { Step } from "src/models/steps/entities/step.entity";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @Column()
    url: string
    
    @ManyToOne(() => Recipe, (recipe) => recipe.images, {
        onDelete: 'CASCADE'
    })
    recipe: Recipe
    
    @ManyToOne(() => Step, (step) => step.images, {
        onDelete: 'CASCADE'
    })
    step: Step
    
    @ManyToOne(() => Diary, (diary) => diary.images, {
        onDelete: 'CASCADE'
    })
    diary: Diary
}
