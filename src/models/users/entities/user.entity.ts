import { Column, Entity, ManyToMany, OneToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "src/base-entity";
import { Recipe } from "src/models/recipes/entities/recipe.entity";
import { Diary } from "src/models/diaries/entities/diary.entity";
import { Reply } from "src/models/replies/entities/reply.entity";
import { Bookmark } from "src/models/bookmarks/entities/bookmark.entity";

@Entity()
export class User extends BaseEntity {
    @Column('varchar', { length: 10 })
    loginType: 'KAKAO'

    @Column('bigint')
    uid: number
    
    @Column({ length: 15, nullable: true })
    nick: string

    @Column({ nullable: true })
    image: string
    
    @Column({ length: 30, nullable: true })
    introduction: string

    @OneToMany(() => Recipe, (recipe) => recipe.writer)
    recipes: Recipe[]

    @OneToMany(() => Reply, (reply) => reply.writer)
    replies: Reply[]

    @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
    bookmarks: Bookmark[]

    @ManyToMany(() => Diary, (diary) => diary.writer)
    diaries: Diary[]
}
