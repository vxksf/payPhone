import { CallPriceCalculationModel } from '../../../domain/models/call-price-calculation'
import { Plan } from '../../../domain/plans/plans'
import { CalculateCallPrice } from './calculate-call-price'
import { CallPriceCalculatorService } from '../../../domain/services/call-price-calculator-service'
import { GeneralCallPriceCalculator } from '../../services/call-price-calculators/general-call-price-calculator'
import { MongoHelper } from '../../../infra/db/helpers/mongo-helper'
import { EnvManager } from '../../../infra/env/env-manager'

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

const makeFaleMaisCalculatorStub = (): CallPriceCalculatorService => {
  class FaleMaisCalculatorStub extends GeneralCallPriceCalculator {
    async calculate (): Promise<number> {
      const timePack = this.getTimePacketByPlan(this.data.plan)
      let result = this.data.time - timePack
      if (result > 0) {
        const fee = this.repository.getDDDFee(this.data.originCode, this.data.destinationCode)
        result *= fee
        const extra = result * 0.1
        result += extra
      } else {
        result = 0.0
      }

      return result
    }

    private getTimePacketByPlan (plan: number): number {
      switch (plan) {
        case Plan.FALEMAIS30:
          return 30
        case Plan.FALEMAIS60:
          return 60
        case Plan.FALEMAIS120:
          return 120
      }
    }
  }
  return new FaleMaisCalculatorStub()
}

interface SutTypes {
  sut: CalculateCallPrice
  faleMaisCalculatorStub: CallPriceCalculatorService
}

const makeSut = (): SutTypes => {
  const faleMaisCalculatorStub = makeFaleMaisCalculatorStub()
  const sut = new CalculateCallPrice()
  return {
    sut,
    faleMaisCalculatorStub
  }
}

describe('CalculateCallPrice UseCase', () => {
  beforeAll(async () => {
    const envManager = new EnvManager()
    await MongoHelper.connect(envManager.getEnvMongoUrl())
  })

  afterAll(async () => {
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
    const calculateCallPriceSpy = jest.spyOn(sut, 'calculate')
    await sut.calculate(makeFakeFaleMaisRequest())
    expect(calculateCallPriceSpy).toHaveReturned()
  })
})
