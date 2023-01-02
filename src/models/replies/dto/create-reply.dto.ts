import { PickType } from "@nestjs/mapped-types";
import { Reply } from "../entities/reply.entity";

export class CreateReplyDto extends PickType(Reply, [
    'type',
    'content',
    'image',
    'parent',
    'diary',
    'recipe'
] as const) {}
