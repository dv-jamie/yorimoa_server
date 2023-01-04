import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Image } from "src/models/images/entities/image.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "../../recipes/entities/recipe.entity";

@Entity()
export class Step {
    @IsOptional()
    @IsNumber()
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @Column({ length: 10 })
    division: string

    @IsString()
    @Column()
    comment: string

    @IsOptional()
    @IsString()
    @Column({ nullable: true })
    tip: string | null

    @IsNumber()
    @Column()
    group: number
    
    @IsNumber()
    @Column('int')
    sequence: number

    @ValidateNested({ each: true })
    @Type(() => Image)
    @OneToMany(() => Image, (image) => image.step)
    images: Image[]

    @ManyToOne(() => Recipe, (recipe) => recipe.steps, {
        onDelete: 'CASCADE'
    })
    recipe: Recipe
}
