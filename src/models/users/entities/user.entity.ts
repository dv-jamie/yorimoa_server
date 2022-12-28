import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "src/base-entity";
import { Recipe } from "src/models/recipes/entities/recipe.entity";
import { Diary } from "src/models/diaries/entities/diary.entity";
import { Reply } from "src/replies/entities/reply.entity";

@Entity()
export class User extends BaseEntity {
    @Column({ length: 15 })
    nick: string

    @Column()
    image: string
    
    @Column({ length: 30 })
    introduction: string

    @OneToMany(() => Recipe, (recipe) => recipe.writer)
    recipes: Recipe[]

    @OneToMany(() => Reply, (reply) => reply.writer)
    replies: Reply[]

    @ManyToMany(() => Diary, (diary) => diary.writer)
    diaries: Diary[]

    @ManyToMany(() => Recipe, (recipe) => recipe.bookmarkUsers)
    bookmarkRecipes: Recipe[]

    @ManyToMany(() => Diary, (diary) => diary.bookmarkUsers)
    bookmarkDiaries: Diary[]
}
