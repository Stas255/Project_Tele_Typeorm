import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { TelegramInviteLinkType } from "../types";
import { TelegramUserCreator } from "./telegramUserCreator.model";
import { TelegramChatJoinRequest } from "./telegramChatJoinRequest.model";

@Entity()
export class TelegramInviteLink extends BaseEntity implements TelegramInviteLinkType{

    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    pending_join_request_count!: number;

    @ManyToOne(() => TelegramUserCreator, (user_creator) => user_creator.invite_links)
    user_creator!: TelegramUserCreator;

    @OneToMany(() => TelegramChatJoinRequest, (telegramChatJoinRequest) => telegramChatJoinRequest.invite_link)
    chat_join_requests!: TelegramChatJoinRequest[];
}