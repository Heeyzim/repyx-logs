import Logger from '@ptkdev/logger'
import {
  DiscordWebhookOptions,
  DiscordWebhookPayload,
  Log,
  LogType,
} from '@shared/dtos'
import axios from 'axios'
import path from 'path'

export class ServerLogger {
  private logger: Logger
  private name: string

  constructor() {
    const resourcePath = GetResourcePath(GetCurrentResourceName())
    this.logger = new Logger({
      debug: true,
      language: 'pt',
      colors: true,
      info: true,
      warning: true,
      error: true,
      sponsor: true,
      write: true,
      type: 'json',
      rotate: {
        size: '10M',
        encoding: 'utf8',
      },
      path: {
        debug_log: path.join(resourcePath, 'logs', 'debug.log'),
        error_log: path.join(resourcePath, 'logs', 'errors.log'),
      },
    })
    this.name = GetCurrentResourceName()
  }

  log({ message, level = 'info', discordWebhookOptions }: Log): void {
    this.logger[level](message)
    if (discordWebhookOptions) {
      this.sendToDiscordWebhook(message, level, discordWebhookOptions)
    }
  }

  private async sendToDiscordWebhook(
    message: string,
    level: LogType,
    { webhookUrl, embeds, tts }: DiscordWebhookOptions,
  ): Promise<void> {
    const payload: DiscordWebhookPayload = {
      content: `[${level.toUpperCase()}] ${message}`,
      username: this.name,
      tts,
      embeds,
    }

    try {
      await axios.post(webhookUrl, payload)
    } catch (error) {
      this.logger.error(
        `Falha ao enviar para o Discord: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      )
    }
  }
}
