import { CallPriceCalculationModel } from '../../../domain/models/call-price-calculation'
import { CallFeeModel } from '../../../domain/models/call-fee'
import { Plan } from '../../../domain/plans/plans'
import { MongoHelper } from '../../../infra/db/helpers/mongo-helper'
import { MongoRepository } from '../../../infra/db/mongodb/mongo-repository'
import { EnvManager } from '../../../infra/env/env-manager'
import { CalculateCallPrice } from './calculate-call-price'

const makeFakeFaleMaisRequest = (): CallPriceCalculationModel => ({
  originCode: '011',
  destinationCode: '016',
  callTime: 40,
  plan: Plan.FALEMAIS30
})

const makeFakeTraditionalRequest = (): CallPriceCalculationModel => ({
  originCode: '011',
  destinationCode: '016',
  callTime: 40,
  plan: Plan.TRADITIONAL
})

interface SutTypes {
  sut: CalculateCallPrice
}

const makeSut = (): SutTypes => {
  const sut = new CalculateCallPrice()
  return { sut }
}

const populateDatabase = async (): Promise<void> => {
  const fees: CallFeeModel[] = []
  fees[0] = { originCode: '011', destinationCode: '016', minutePrice: 1.9 }
  fees[1] = { originCode: '016', destinationCode: '011', minutePrice: 2.9 }
  fees[2] = { originCode: '011', destinationCode: '017', minutePrice: 1.7 }
  fees[3] = { originCode: '017', destinationCode: '011', minutePrice: 2.7 }
  fees[4] = { originCode: '011', destinationCode: '018', minutePrice: 0.9 }
  fees[5] = { originCode: '018', destinationCode: '011', minutePrice: 1.9 }
  const mongoRepository = new MongoRepository()
  for (const fee of fees) {
    await mongoRepository.add(fee)
  }
}

describe('CalculateCallPrice UseCase', () => {
  beforeAll(async () => {
    const envManager = new EnvManager()
    await MongoHelper.connect(envManager.getEnvMongoUrl())
    await populateDatabase()
  })

  afterAll(async () => {
    const feeCollection = await MongoHelper.getCollection('fees')
    await feeCollection.deleteMany({})
    await MongoHelper.disconnect()
  })

  test('Should call CalculateCallPrice with correct values for FaleMais plan', async () => {
    const { sut } = makeSut()
    const calculateCallPriceSpy = jest.spyOn(sut, 'calculate')
    await sut.calculate(makeFakeFaleMaisRequest())
    expect(calculateCallPriceSpy).toHaveBeenCalledWith({
      originCode: '011',
      destinationCode: '016',
      callTime: 40,
      plan: Plan.FALEMAIS30
    })
  })

  test('Should call CalculateCallPrice with correct values for Traditional plan', async () => {
    const { sut } = makeSut()
    const calculateCallPriceSpy = jest.spyOn(sut, 'calculate')
    await sut.calculate(makeFakeTraditionalRequest())
    expect(calculateCallPriceSpy).toHaveBeenCalledWith({
      originCode: '011',
      destinationCode: '016',
      callTime: 40,
      plan: Plan.TRADITIONAL
    })
  })

  test('Should return correct value for FaleMais 30 calculation', async () => {
    const { sut } = makeSut()
    const fee = await sut.calculate(makeFakeFaleMaisRequest())
    expect(fee).toEqual(20.9)
  })

  test('Should return correct value for FaleMais 60 calculation', async () => {
    const { sut } = makeSut()
    const fee = await sut.calculate({
      originCode: '011',
      destinationCode: '017',
      callTime: 70,
      plan: Plan.FALEMAIS60
    })
    expect(fee).toEqual(18.7)
  })

  test('Should return correct value for FaleMais 120 calculation', async () => {
    const { sut } = makeSut()
    const fee = await sut.calculate({
      originCode: '011',
      destinationCode: '018',
      callTime: 130,
      plan: Plan.FALEMAIS120
    })
    expect(fee).toEqual(9.9)
  })

  test('Should return correct value for Traditional calculation', async () => {
    const { sut } = makeSut()
    const fee = await sut.calculate(makeFakeTraditionalRequest())
    expect(fee).toEqual(76.0)
  })
})
