import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { IsNumber, IsString, Max, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { BaseEntity } from "src/base-entity";
import { User } from "src/models/users/entities/user.entity";
import { Ingredient } from "../../ingredients/entities/ingredient.entity";
import { Step } from "../../steps/entities/step.entity";
import { Diary } from "src/models/diaries/entities/diary.entity";
import { Theme } from "src/models/themes/entities/theme.entity";
import { Category } from "src/models/categories/entities/category.entity";
import { Image } from "src/models/images/entities/image.entity";
import { Reply } from "src/models/replies/entities/reply.entity";
import { Bookmark } from "src/models/bookmarks/entities/bookmark.entity";

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

    @IsNumber()
    @Column()
    @Min(1)
    @Max(4)
    level: number
    
    @IsString()
    @Column({ length: 100 })
    summary: string

    @ValidateNested({ each: true })
    @Type(() => Image)
    @OneToMany(() => Image, (image) => image.recipe)
    images: Image[]

    @ValidateNested({ each: true })
    @Type(() => Ingredient)
    @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
    ingredients: Ingredient[]

    @ValidateNested({ each: true })
    @Type(() => Step)
    @OneToMany(() => Step, (step) => step.recipe)
    steps: Step[]

    @OneToMany(() => Reply, (reply) => reply)
    replies: Reply[]

    @OneToMany(() => Bookmark, (bookmark) => bookmark.recipe)
    bookmarks: Bookmark[]

    @ManyToOne(() => User, (user) => user.recipes, {
        onDelete: 'CASCADE'
    })
    writer: User

    @ManyToMany(() => Diary, (diary) => diary.recipes)
    diaries: Diary[]
    
    @ManyToMany(() => Category, (category) => category.recipes)
    @JoinTable({ name: 'recipe_category' })
    categories: Category[]
    
    @ManyToMany(() => Theme, (theme) => theme.recipes)
    @JoinTable({ name: 'recipe_theme' })
    themes: Theme[]
}
