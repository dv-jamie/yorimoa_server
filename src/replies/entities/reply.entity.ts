import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "src/base-entity";
import { User } from "src/models/users/entities/user.entity";
import { Recipe } from "src/models/recipes/entities/recipe.entity";
import { Diary } from "src/models/diaries/entities/diary.entity";

@Entity()
export class Reply extends BaseEntity {
    @Column({ type: 'varchar', length: 10 })
    type: 'DIARY' | 'ASK' | 'REVIEW'

    @Column()
    content: string
    
    @Column()
    image: string

    @Column()
    group: number
    
    @OneToMany(() => Reply, (reply) => reply.id)
    parent: Reply

    @ManyToOne(() => User, (user) => user.replies)
    writer: User
    
    @ManyToOne(() => Diary, (diary) => diary.replies)
    diary: Diary
    
    @ManyToOne(() => Recipe, (recipe) => recipe.replies)
    recipe: Recipe

    @ManyToMany(() => Recipe)
    @JoinTable({ name: 'diary_recipe' })
    recipes: Recipe[]

    @ManyToMany(() => User, (user) => user.bookmarkDiaries)
    @JoinTable({ name: 'bookmark_diary' })
    bookmarkUsers: User[]
}