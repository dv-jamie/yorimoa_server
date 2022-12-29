import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "src/base-entity";
import { User } from "src/models/users/entities/user.entity";
import { Ingredient } from "./ingredient.entity";
import { Reply } from "src/replies/entities/reply.entity";
import { Step } from "./step.entity";
import { Diary } from "src/models/diaries/entities/diary.entity";
import { Theme } from "src/models/themes/entities/theme.entity";
import { Category } from "src/models/categories/entities/category.entity";

@Entity()
export class Recipe extends BaseEntity {
    @Column({ length: 30 })
    title: string

    @Column('int')
    time: number

    @Column('int')
    serving: number

    @Column({ length: 5 })
    level: string
    
    @Column({ length: 100 })
    summary: string

    @Column('varchar')
    images: string[]

    @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
    ingredients: Ingredient[]

    @OneToMany(() => Step, (step) => step.recipe)
    steps: Step[]

    @OneToMany(() => Reply, (reply) => reply)
    replies: Reply[]

    @ManyToOne(() => User, (user) => user.recipes)
    writer: User

    @ManyToMany(() => Diary)
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
