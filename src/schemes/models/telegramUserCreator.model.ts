import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TelegramUserCreatorType} from "../types";
import { TelegramInviteLink } from "./telegramInviteLink.model";

@Entity()
export class TelegramUserCreator extends BaseEntity implements TelegramUserCreatorType{
    @PrimaryColumn()
    id!: number; // Add an initializer to the "id" property

    @Column()
    username!: string;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @OneToMany(() => TelegramInviteLink, (telegramInviteLink) => telegramInviteLink.user_creator)
    invite_links!: TelegramInviteLink[];
}