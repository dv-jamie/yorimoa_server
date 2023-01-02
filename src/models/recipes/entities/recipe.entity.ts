import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { IsNumber, IsString, Max, Min } from "class-validator";
import { BaseEntity } from "src/base-entity";
import { User } from "src/models/users/entities/user.entity";
import { Ingredient } from "./ingredient.entity";
import { Step } from "./step.entity";
import { Diary } from "src/models/diaries/entities/diary.entity";
import { Theme } from "src/models/themes/entities/theme.entity";
import { Category } from "src/models/categories/entities/category.entity";
import { Image } from "src/models/images/entities/image.entity";
import { Reply } from "src/models/replies/entities/reply.entity";

@Entity()
export class Recipe extends BaseEntity {
    @IsString()
    @Column({ length: 30 })
    title: string

    @IsNumber()
    @Column()
    @Min(5)
    time: number

    @IsNumber()
    @Column()
    @Min(1)
    @Max(20)
    serving: number

    @IsString()
    @Column()
    @Min(1)
    @Max(4)
    level: number
    
    @IsString()
    @Column({ length: 100 })
    summary: string

    @OneToMany(() => Image, (image) => image.recipe)
    images: Image[]

    @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
    ingredients: Ingredient[]

    @OneToMany(() => Step, (step) => step.recipe)
    steps: Step[]

    @OneToMany(() => Reply, (reply) => reply)
    replies: Reply[]

    @ManyToOne(() => User, (user) => user.recipes)
    writer: User

    @ManyToMany(() => Diary, (diary) => diary.recipes)
    diaries: Diary[]
    
    @ManyToMany(() => Category, (category) => category.recipes)
    @JoinTable({ name: 'category_recipe' })
    categories: Category[]
    
    @ManyToMany(() => Theme, (theme) => theme.recipes)
    @JoinTable({ name: 'theme_recipe' })
    themes: Theme[]

    @ManyToMany(() => User, (user) => user.bookmarkRecipes)
    @JoinTable({ name: 'bookmark_recipe' })
    bookmarkUsers: User[]
}
