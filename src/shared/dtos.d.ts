export type LogType = 'info' | 'warning' | 'error'

export type EmbedType =
  | 'rich'
  | 'image'
  | 'video'
  | 'gifv'
  | 'article'
  | 'link'
  | 'poll_result'

export interface EmbedFooter {
  text: string
  icon_url?: string
  proxy_icon_url?: string
}

export interface EmbedImage {
  url: string
  proxy_url?: string
  height?: number
  width?: number
}

export interface EmbedThumbnail extends EmbedImage {}

export interface EmbedAuthor {
  name: string
  url?: string
  icon_url?: string
  proxy_icon_url?: string
}

export interface EmbedField {
  name: string
  value: string
  inline?: boolean
}

export interface Embed {
  title?: string
  type?: EmbedType
  description?: string
  url?: string
  timestamp?: Date
  color?: number
  footer?: EmbedFooter
  image?: EmbedImage
  thumbnail?: EmbedThumbnail
  video?: EmbedImage
  provider?: {
    name?: string
    url?: string
  }
  author?: EmbedAuthor
  fields?: EmbedField[]
}

export interface DiscordWebhookOptions {
  webhookUrl: string
  embeds?: Embed[]
  tts?: boolean
}

export interface DiscordWebhookPayload {
  content: string
  username: string
  tts?: boolean
  embeds?: Embed[]
}

export interface ClientLog {
  message: string
  level: 'info' | 'warn' | 'error'
}

export interface Log {
  message: string
  level: LogType
  discordWebhookOptions?: DiscordWebhookOptions
}
