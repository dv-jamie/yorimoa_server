import { PickType } from "@nestjs/mapped-types";
import { User } from "../entities/user.entity";

export class CreateUserDto extends PickType(User, [
    'loginType',
    'uid'
] as const) {}

// 레시피, 일기 도입한 이후에 필요
// export class CreateUserDto extends PickType(User, [
//     'nick',
//     'image',
//     'introduction'
// ] as const) {}
