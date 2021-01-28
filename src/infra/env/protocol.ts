export interface EnvAdapter {
  getEnvMongoUrl(): string
  getEnvPort (): string
}
