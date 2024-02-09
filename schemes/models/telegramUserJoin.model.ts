import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TelegramUserJoinType } from "../types";
import { TelegramChatJoinRequest } from "./telegramChatJoinRequest.model";

@Entity()
export class TelegramUserJoin extends BaseEntity implements TelegramUserJoinType{
    @PrimaryColumn()
    id!: number; // Add an initializer to the "id" property

    @OneToMany(() => TelegramChatJoinRequest, (telegramChatJoinRequest) => telegramChatJoinRequest.chat)
    chat_join_requests!: TelegramChatJoinRequest[];
}