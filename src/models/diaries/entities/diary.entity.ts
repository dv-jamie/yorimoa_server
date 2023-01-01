import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { IsString, IsObject } from 'class-validator';
import { BaseEntity } from "src/base-entity";
import { User } from "src/models/users/entities/user.entity";
import { Recipe } from "src/models/recipes/entities/recipe.entity";
import { Reply } from "src/replies/entities/reply.entity";
import { Theme } from "src/models/themes/entities/theme.entity";
import { Image } from "src/models/images/entities/image.entity";
import { isObject } from "util";

@Entity()
export class Diary extends BaseEntity {
    @IsString()
    @Column('text')
    content: string

    @OneToMany(() => Image, (image) => image.diary)
    images: Image[]

    @OneToMany(() => Reply, (reply) => reply)
    replies: Reply[]
    
    @ManyToOne(() => User, (user) => user.diaries)
    writer: User

    @IsObject({ each: true })
    @ManyToMany(() => Recipe, (recipe) => recipe.diaries)
    @JoinTable({ name: 'diary_recipe' })
    recipes: Recipe[]

    @ManyToMany(() => Theme, (theme) => theme.recipes)
    @JoinTable({ name: 'theme_diary' })
    themes: Theme[]

    @ManyToMany(() => User, (user) => user.bookmarkDiaries)
    @JoinTable({ name: 'bookmark_diary' })
    bookmarkUsers: User[]
}
