import { TelegramChat } from "./telegramChat.model";
import { TelegramChatJoinRequest } from "./telegramChatJoinRequest.model";
import { TelegramInviteLink } from "./telegramInviteLink.model";
import { TelegramUserCreator } from "./telegramUserCreator.model";
import { TelegramUserJoin } from "./telegramUserJoin.model";

export const ChatJoinRequestModels = Array<any>(TelegramChatJoinRequest, TelegramChat, TelegramInviteLink, TelegramUserCreator, TelegramUserJoin);