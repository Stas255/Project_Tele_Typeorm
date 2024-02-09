import { BaseEntity, BeforeUpdate, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { TelegramChatJoinRequestType, TelegramChatType, TelegramInviteLinkType, TelegramUserJoinType } from "../types";
import { TelegramChat } from "./telegramChat.model";
import { TelegramUserJoin } from "./telegramUserJoin.model";
import { TelegramInviteLink } from "./telegramInviteLink.model";

@Entity()
export class TelegramChatJoinRequest extends BaseEntity implements TelegramChatJoinRequestType {
    @PrimaryColumn()
    id!: number;

    @ManyToOne(() => TelegramChat, (telegramChat) => telegramChat.chat_join_requests)
    chat!: TelegramChat;

    @ManyToOne(() => TelegramUserJoin, (telegramUserJoin) => telegramUserJoin.chat_join_requests)
    from!: TelegramUserJoinType;

    @Column()
    date!: number;

    @ManyToOne(() => TelegramInviteLink, (telegramInviteLink) => telegramInviteLink.chat_join_requests)
    invite_link!: TelegramInviteLinkType;


    @BeforeUpdate()
    updateDates() {
        throw new Error("Method not implemented.");
    }
}