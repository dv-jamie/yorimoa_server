import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "src/base-entity";
import { User } from "src/models/users/entities/user.entity";
import { Recipe } from "src/models/recipes/entities/recipe.entity";
import { Reply } from "src/replies/entities/reply.entity";
import { Theme } from "src/common/entities/theme.entity";

@Entity()
export class Diary extends BaseEntity {
    @Column('text')
    content: string
    
    @Column('varchar')
    images: string[]

    @OneToMany(() => Reply, (reply) => reply)
    replies: Reply[]
    
    @ManyToOne(() => User, (user) => user.diaries)
    writer: User

    @ManyToMany(() => Recipe)
    @JoinTable({ name: 'diary_recipe' })
    recipes: Recipe[]

    @ManyToMany(() => Theme, (theme) => theme.recipes)
    @JoinTable({ name: 'theme_recipe' })
    themes: Theme[]

    @ManyToMany(() => User, (user) => user.bookmarkDiaries)
    @JoinTable({ name: 'bookmark_diary' })
    bookmarkUsers: User[]
}
