import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { IsString, ValidateNested } from 'class-validator';
import { Type } from "class-transformer";
import { BaseEntity } from "src/base-entity";
import { User } from "src/models/users/entities/user.entity";
import { Recipe } from "src/models/recipes/entities/recipe.entity";
import { Theme } from "src/models/themes/entities/theme.entity";
import { Image } from "src/models/images/entities/image.entity";
import { Reply } from "src/models/replies/entities/reply.entity";
import { Bookmark } from "src/models/bookmarks/entities/bookmark.entity";

@Entity()
export class Diary extends BaseEntity {
    @IsString()
    @Column('text')
    content: string

    @ValidateNested({ each: true })
    @Type(() => Image)
    @OneToMany(() => Image, (image) => image.diary)
    images: Image[]

    @OneToMany(() => Reply, (reply) => reply)
    replies: Reply[]
    
    @ManyToOne(() => User, (user) => user.diaries, {
        onDelete: 'CASCADE'
    })
    writer: User
    
    @ManyToOne(() => Bookmark, (bookmark) => bookmark.diary, {
        onDelete: 'CASCADE'
    })
    bookmarks: Bookmark[]

    @ManyToMany(() => Recipe, (recipe) => recipe.diaries)
    @JoinTable({ name: 'diary_recipe' })
    recipes: Recipe[]

    @ManyToMany(() => Theme, (theme) => theme.recipes)
    @JoinTable({ name: 'diary_theme' })
    themes: Theme[]
}
