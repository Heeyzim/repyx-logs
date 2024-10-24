import { ClientLog } from '@shared/dtos'

export class ClientLogger {
  private name: string

  constructor() {
    this.name = GetCurrentResourceName()
  }

  log({ message, level = 'info' }: ClientLog): void {
    console[level]({
      resource: this.name,
      timestamp: new Date().toISOString(),
      level,
      message,
    })
  }
}
