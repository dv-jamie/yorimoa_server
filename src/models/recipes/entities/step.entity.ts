import { Image } from "src/models/images/entities/image.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipe.entity";

@Entity()
export class Step {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 10 })
    division: string

    @Column()
    comment: string

    @Column({ nullable: true })
    tip: string | null

    @Column()
    group: number
    
    @Column('int')
    sequence: number

    @OneToMany(() => Image, (image) => image.step)
    images: Image[]

    @ManyToOne(() => Recipe, (recipe) => recipe.steps, {
        onDelete: 'CASCADE'
    })
    recipe: Recipe
}
