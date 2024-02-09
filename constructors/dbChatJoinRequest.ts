import { QueryRunner } from "typeorm";
import { TypeormBase } from "../base";
import { ChatJoinRequestModels } from "../schemes/models";
import { TelegramChat } from "../schemes/models/telegramChat.model";
import { TelegramChatJoinRequest } from "../schemes/models/telegramChatJoinRequest.model";
import { TelegramInviteLink } from "../schemes/models/telegramInviteLink.model";
import { TelegramUserCreator } from "../schemes/models/telegramUserCreator.model";
import { TelegramUserJoin } from "../schemes/models/telegramUserJoin.model";
import { TelegramChatJoinRequestType, TelegramChatType, TelegramInviteLinkType, TelegramUserCreatorType, TelegramUserJoinType } from "../schemes/types";
import { Infor } from "../../Infor";

export class DbChatJoinRequest extends TypeormBase {

    constructor() {
        super("chatJoinRequest.db", [ChatJoinRequestModels]);
        Infor.updateInfo("countSameChatJoinRequest", 0);
    }

    async createChatJoinRequest(data: TelegramChatJoinRequestType): Promise<void> {
        const queryRunner = this.connection.createQueryRunner()
        await queryRunner.connect();

        await queryRunner.startTransaction();

        try {
            data.chat = await this.getOrCreateTelegramChat(data.chat, queryRunner);
            data.from = await this.getOrCreateTelegramUserJoin(data.from, queryRunner);
            data.invite_link = await this.getOrCreateTelegramInviteLink(data.invite_link, queryRunner);
            const telegramChatJoinRequestRepository = queryRunner.manager.getRepository(TelegramChatJoinRequest);

            let telegramChatJoinRequest = await telegramChatJoinRequestRepository.findOne({
                where: {
                    invite_link: {
                        id: data.invite_link.id
                    },
                    from: {
                        id: data.from.id
                    },
                }
            });
            if (telegramChatJoinRequest) {
                await telegramChatJoinRequestRepository.update(telegramChatJoinRequest.id, data);
                Infor.incrementInfo("countSameChatJoinRequest", 1);
            }else{
                telegramChatJoinRequest = telegramChatJoinRequestRepository.create(data);
                await telegramChatJoinRequestRepository.save(telegramChatJoinRequest);
            }
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();

        } finally {
            await queryRunner.release();
        }
    }

    private async getOrCreateTelegramChat(data: TelegramChatType, queryRunner: QueryRunner): Promise<TelegramChat> {
        const telegramChatRepository = queryRunner.manager.getRepository(TelegramChat);
        let telegramChat = await telegramChatRepository.findOneBy({ id: data.id });
        if (telegramChat) return telegramChat;
        telegramChat = telegramChatRepository.create(data);
        return await queryRunner.manager.save(telegramChat);
    }

    private async getOrCreateTelegramUserJoin(data: TelegramUserJoinType, queryRunner: QueryRunner): Promise<TelegramUserJoin> {
        const telegramUserJoinRepository = queryRunner.manager.getRepository(TelegramUserJoin);
        let telegramUserJoin = await telegramUserJoinRepository.findOneBy({ id: data.id });
        if (telegramUserJoin) return telegramUserJoin;
        telegramUserJoin = telegramUserJoinRepository.create(data);
        return await queryRunner.manager.save(telegramUserJoin);
    }

    private async getOrCreateTelegramInviteLink(data: TelegramInviteLinkType, queryRunner: QueryRunner): Promise<TelegramInviteLink> {
        const telegramInviteLinkRepository = queryRunner.manager.getRepository(TelegramInviteLink);
        let telegramInviteLink = await telegramInviteLinkRepository.findOneBy({ id: data.id });
        if (telegramInviteLink) {
            if (data.pending_join_request_count != -1) telegramInviteLink.pending_join_request_count = data.pending_join_request_count;
            return await telegramInviteLinkRepository.save(telegramInviteLink);
        }
        data.user_creator = await this.getOrCreateTelegramUserCreator(data.user_creator, queryRunner);
        telegramInviteLink = telegramInviteLinkRepository.create(data);
        return await queryRunner.manager.save(telegramInviteLink);
    }

    private async getOrCreateTelegramUserCreator(data: TelegramUserCreatorType, queryRunner: QueryRunner): Promise<TelegramUserCreator> {
        const telegramUserCreatorRepository = queryRunner.manager.getRepository(TelegramUserCreator);
        let telegramUserCreator = await telegramUserCreatorRepository.findOneBy({ id: data.id });
        if (telegramUserCreator) return telegramUserCreator;
        telegramUserCreator = telegramUserCreatorRepository.create(data);
        return await queryRunner.manager.save(telegramUserCreator);
    }
}