import { MongoHelper as sut } from './mongo-helper'
import { EnvManager } from '../../env/env-manager'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    const envManager = new EnvManager()
    await sut.connect(envManager.getEnvMongoUrl())
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('fees')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('fees')
    expect(accountCollection).toBeTruthy()
  })
})
