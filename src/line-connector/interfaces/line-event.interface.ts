/**
 * LINE Webhook Event Interfaces
 * Based on: https://developers.line.biz/en/reference/messaging-api/#webhook-event-objects
 */
export interface LineUserSource {
  type: 'user';
  userId: string;
}

export interface LineGroupSource {
  type: 'group';
  groupId: string;
  userId?: string;
}

export interface LineRoomSource {
  type: 'room';
  roomId: string;
  userId?: string;
}

export type LineSource = LineUserSource | LineGroupSource | LineRoomSource;

export interface LineTextMessage {
  type: 'text';
  id: string;
  text: string;
  quoteToken: string;
}

export interface LineImageMessage {
  type: 'image';
  id: string;
  quoteToken: string;
  contentProvider: {
    type: 'line' | 'external';
    originalContentUrl?: string;
    previewImageUrl?: string;
  };
}

export interface LineVideoMessage {
  type: 'video';
  id: string;
  quoteToken: string;
  duration: number;
  contentProvider: {
    type: 'line' | 'external';
    originalContentUrl?: string;
    previewImageUrl?: string;
  };
}

export interface LineAudioMessage {
  type: 'audio';
  id: string;
  quoteToken: string;
  duration: number;
  contentProvider: {
    type: 'line' | 'external';
    originalContentUrl?: string;
  };
}

export interface LineFileMessage {
  type: 'file';
  id: string;
  fileName: string;
  fileSize: number;
}

export interface LineLocationMessage {
  type: 'location';
  id: string;
  title?: string;
  address?: string;
  latitude: number;
  longitude: number;
}

export interface LineStickerMessage {
  type: 'sticker';
  id: string;
  quoteToken: string;
  packageId: string;
  stickerId: string;
  stickerResourceType: string;
}

export type LineMessage =
  | LineTextMessage
  | LineImageMessage
  | LineVideoMessage
  | LineAudioMessage
  | LineFileMessage
  | LineLocationMessage
  | LineStickerMessage;

export interface LineBaseEvent {
  type: string;
  timestamp: number;
  source: LineSource;
  webhookEventId: string;
  deliveryContext: {
    isRedelivery: boolean;
  };
  mode: 'active' | 'standby';
}

export interface LineMessageEvent extends LineBaseEvent {
  type: 'message';
  replyToken: string;
  message: LineMessage;
}

export interface LineFollowEvent extends LineBaseEvent {
  type: 'follow';
  replyToken: string;
}

export interface LineUnfollowEvent extends LineBaseEvent {
  type: 'unfollow';
}

export interface LineJoinEvent extends LineBaseEvent {
  type: 'join';
  replyToken: string;
}

export interface LineLeaveEvent extends LineBaseEvent {
  type: 'leave';
}

export interface LinePostbackEvent extends LineBaseEvent {
  type: 'postback';
  replyToken: string;
  postback: {
    data: string;
    params?: Record<string, string>;
  };
}

export interface LineMemberJoinEvent extends LineBaseEvent {
  type: 'memberJoined';
  replyToken: string;
  joined: {
    members: Array<{ type: 'user'; userId: string }>;
  };
}

export interface LineMemberLeaveEvent extends LineBaseEvent {
  type: 'memberLeft';
  left: {
    members: Array<{ type: 'user'; userId: string }>;
  };
}

export type LineEvent =
  | LineMessageEvent
  | LineFollowEvent
  | LineUnfollowEvent
  | LineJoinEvent
  | LineLeaveEvent
  | LinePostbackEvent
  | LineMemberJoinEvent
  | LineMemberLeaveEvent;

export interface LineWebhookBody {
  destination: string;
  events: LineEvent[];
}
