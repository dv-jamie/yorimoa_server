import { Column, Entity, ManyToOne } from "typeorm";
import { IsBoolean, IsDateString, IsNumber, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { booleanMapper } from "src/common/dto/boolean-mapper";
import { BaseEntity } from "src/base-entity";
import { User } from "src/models/users/entities/user.entity";
import { Category } from "src/models/categories/entities/category.entity";

@Entity()
export class Refrigerator extends BaseEntity {
    @IsString()
    @Column({ length: 30 })
    name: string

    @IsDateString()
    @Column()
    boughtAt: Date

    @Transform(({ value }) => booleanMapper.get(value))
    @IsBoolean()
    @Column({ default: false })
    eatTag: boolean

    @Transform(({ value }) => booleanMapper.get(value))
    @IsBoolean()
    @Column({ default: false })
    buyTag: boolean

    @IsNumber()
    @ManyToOne(() => Category, (category) => category.refrigerators, {
        onDelete: 'CASCADE'
    })
    category: Category

    @ManyToOne(() => User, (user) => user.recipes, {
        onDelete: 'CASCADE'
    })
    writer: User
}
