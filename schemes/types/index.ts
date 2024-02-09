export type TelegramChatType = {
    id: number;
    title: string;
    type: string;
    chat_join_requests?: TelegramChatJoinRequestType[];
};

export type TelegramInviteLinkType = {
    id: string; // is invite_link
    name: string;
    user_creator: TelegramUserCreatorType;
    pending_join_request_count: number;
};

export type TelegramUserCreatorType = {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    invite_links?: TelegramInviteLinkType[];
};

export type TelegramUserJoinType = {
    id: number;
    chat_join_requests?: TelegramChatJoinRequestType[];
};


export type TelegramChatJoinRequestType = {
    id: number; //unic update_id
    chat: TelegramChatType;
    from: TelegramUserJoinType;
    date: number;
    invite_link: TelegramInviteLinkType;
};