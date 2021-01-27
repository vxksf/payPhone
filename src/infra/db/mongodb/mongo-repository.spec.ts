import { Collection } from 'mongodb'
import { FeeRepository } from '../../../data/protocols/db/fee-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { MongoRepository } from './mongo-repository'
import { EnvManager } from '../../env/env-manager'

let accountCollection: Collection

describe('MongoRepository', () => {
  beforeAll(async () => {
    const envManager = new EnvManager()
    await MongoHelper.connect(envManager.getEnvMongoUrl())
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('fees')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): FeeRepository => {
    return new MongoRepository()
  }

  test('Should return a fee on add success', async () => {
    const sut = makeSut()
    const fee = await sut.add({
      originCode: '011',
      destinationCode: '016',
      minutePrice: 1.9
    })
    expect(fee).toBeTruthy()
    expect(fee.originCode).toBe('011')
    expect(fee.destinationCode).toBe('016')
    expect(fee.minutePrice).toBe(1.9)
  })

  test('Should return a correct minutePrice on getDDDFee success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
      originCode: '011',
      destinationCode: '016',
      minutePrice: 1.9
    })
    const minutePrice = await sut.getDDDFee('011','016')
    expect(minutePrice).toBeTruthy()
    expect(minutePrice).toBe(1.9)
  })
})
