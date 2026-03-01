export type MessageType = 'edit' | 'new' | 'log' | 'categorize';

interface BaseMessage {
    $schema: string;
    meta: {
        domain: string;
        dt: string;
        id: string;
        offset: number;
        request_id: string;
    };
    type: MessageType;
    namespace: number;
    title: string;
    title_url: string;
    comment: string;
    timestamp: string;
    user: string;
    bot: boolean;
    server_url: string;
    server_name: string;
    server_script_path: string;
    wiki: string;
    parsedcomment: string;
}

type Message = 
    | {
        type: 'edit';
        notify_url: string;
        minor: boolean;
        patrolled: boolean;
        length: {
            old?: number;
            new?: number;
        };
        revision: {
            old?: number;
            new?: number;
        };
        id: number;
    } & BaseMessage
    | {
        type: 'new';
        notify_url: string;
        minor: boolean;
        patrolled: boolean;
        length: {
            old?: number;
            new?: number;
        };
        revision: {
            old?: number;
            new?: number;
        };
        id: number;
    } & BaseMessage
    | {
        type: 'log';
        log_id: number;
        log_type: string;
        log_action: string;
        log_params: string[];
        log_action_comment: string;
     } & BaseMessage
    | {
        type: 'categorize';
        notify_url: string;
        id: number;
    } & BaseMessage;

export type LanguageCode = 'en' | 'de' | 'fr' | 'es' | 'zh' | 'ru';

export type RawMessage = Message;

export type StreamData = Message & { 
    id: string;
};

export interface ChannelFilter {
  key: keyof StreamData;
  match: (value: StreamData[ChannelFilter['key']]) => boolean;
}