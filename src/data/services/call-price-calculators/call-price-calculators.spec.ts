import { TraditionalCallCalculator, FaleMaisCallCalculator } from './index'
import { Plan } from '../../../domain/plans/plans'
import { CallFeeModel } from '../../../domain/models/call-fee'
import { MongoRepository } from '../../../infra/db/mongodb/mongo-repository'
import { MongoHelper } from '../../../infra/db/helpers/mongo-helper'
import { EnvManager } from '../../../infra/env/env-manager'

interface SutType {
  faleMaisCallCalculator: FaleMaisCallCalculator
  traditionalCallCalculator: TraditionalCallCalculator
}

const makeSut = (): SutType => {
  const faleMaisCallCalculator = new FaleMaisCallCalculator()
  const traditionalCallCalculator = new TraditionalCallCalculator()
  return {
    faleMaisCallCalculator,
    traditionalCallCalculator
  }
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

describe('CallPriceCalculatorService', () => {
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

  test('Should return correct calculation in TraditionalCallCalculator', async () => {
    const { traditionalCallCalculator } = makeSut()
    traditionalCallCalculator.setData({
      originCode: '011',
      destinationCode: '016',
      callTime: 40,
      plan: Plan.TRADITIONAL
    })
    traditionalCallCalculator.setRepository(new MongoRepository())
    const calculation = await traditionalCallCalculator.calculate()
    expect(calculation).toEqual(76.0)
  })

  test('Should return correct calculation in FaleMaisCallCalculator for plan FaleMais 30', async () => {
    const { faleMaisCallCalculator } = makeSut()
    faleMaisCallCalculator.setData({
      originCode: '011',
      destinationCode: '016',
      callTime: 40,
      plan: Plan.FALEMAIS30
    })
    faleMaisCallCalculator.setRepository(new MongoRepository())
    const calculation = await faleMaisCallCalculator.calculate()
    expect(calculation).toEqual(20.9)
  })
})
