import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm';
import { TelegramChatType } from '../types';
import { TelegramChatJoinRequest } from './telegramChatJoinRequest.model';

@Entity()
export class TelegramChat extends BaseEntity implements TelegramChatType{
    @PrimaryColumn()
    id!: number; // Add an initializer to the "id" property

    @Column()
    title!: string;

    @Column()
    type!: string;

    @OneToMany(() => TelegramChatJoinRequest, (telegramChatJoinRequest) => telegramChatJoinRequest.chat)
    chat_join_requests!: TelegramChatJoinRequest[];
}