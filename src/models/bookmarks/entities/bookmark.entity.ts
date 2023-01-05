import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { User } from "src/models/users/entities/user.entity";
import { Recipe } from "src/models/recipes/entities/recipe.entity";
import { Diary } from "src/models/diaries/entities/diary.entity";
import { BookmarkType } from "../types/bookmarks.type";

@Entity()
export class Bookmark {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('varchar', { length: 10 })
    type: BookmarkType

    @ManyToOne(() => User, (user) => user.bookmarks, {
        onDelete: 'SET NULL'
    })
    user: User
    
    @ManyToOne(() => Diary, (diary) => diary.bookmarks, {
        onDelete: 'SET NULL'
    })
    diary: Diary
    
    @ManyToOne(() => Recipe, (recipe) => recipe.bookmarks, {
        onDelete: 'SET NULL'
    })
    recipe: Recipe
}
