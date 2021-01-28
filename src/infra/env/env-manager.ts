import { EnvAdapter } from './protocol'

import dotenv from 'dotenv'

export class EnvManager implements EnvAdapter {
  constructor () {
    dotenv.config()
  }

  getEnvMongoUrl (): string {
    return process.env.MONGO_URL
  }

  getEnvPort (): string {
    return process.env.PORT
  }
}
