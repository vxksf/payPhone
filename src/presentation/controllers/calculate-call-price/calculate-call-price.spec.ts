import { CallPriceCalculator } from '../../../domain/usecases/call-price-calculator'
import { CallPriceCalculationModel } from '../../../domain/models/call-price-calculation'
import { Plan } from '../../../domain/plans/plans'
import { CalculateCallController } from './calculate-call-price'
import { HttpRequest } from './calculate-protocols'
import { serverError, ok } from '../../helpers/http/http-helper'

const makeCallPriceCalculator = (): CallPriceCalculator => {
  class CallPriceCalculatorStub implements CallPriceCalculator {
    async calculate (data: CallPriceCalculationModel): Promise<number> {
      return new Promise(resolve => resolve(20.9))
    }
  }
  return new CallPriceCalculatorStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    originCode: '011',
    destinationCode: '016',
    callTime: 40,
    plan: Plan.FALEMAIS30
  }
})

interface SutTypes {
  sut: CalculateCallController
  callPriceCalculatorStub: CallPriceCalculator
}

const makeSut = (): SutTypes => {
  const callPriceCalculatorStub = makeCallPriceCalculator()
  const sut = new CalculateCallController(callPriceCalculatorStub)
  return {
    sut,
    callPriceCalculatorStub
  }
}

describe('CalculateCall Controller', () => {
  test('Should call CallPriceCalculator with correct values', async () => {
    const { sut, callPriceCalculatorStub } = makeSut()
    const calculatorSpy = jest.spyOn(callPriceCalculatorStub, 'calculate')
    await sut.handle(makeFakeRequest())
    expect(calculatorSpy).toHaveBeenCalledWith({
      originCode: '011',
      destinationCode: '016',
      callTime: 40,
      plan: Plan.FALEMAIS30
    })
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, callPriceCalculatorStub } = makeSut()
    jest.spyOn(callPriceCalculatorStub, 'calculate').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if calculation was done successfully', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ calculated: 20.9 }))
  })
})
