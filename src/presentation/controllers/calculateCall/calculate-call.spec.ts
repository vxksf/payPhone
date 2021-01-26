import { FaleMaisCalculator } from '../../../domain/usecases/fale-mais-calculator'
import { FaleMaisCalculationModel } from '../../../domain/models/fale-mais-calculation'
import { Plan } from '../../../domain/plans/plans'
import { CalculateCallController } from './calculate-call'
import { HttpRequest } from './calculate-protocols'

const makeFaleMaisCalculator = (): FaleMaisCalculator => {
  class FaleMaisCalculatorStub implements FaleMaisCalculator {
    async calculate (data: FaleMaisCalculationModel): Promise<number> {
      return new Promise(resolve => resolve(0.0))
    }
  }
  return new FaleMaisCalculatorStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    originCode: 11,
    destinationCode: 31,
    callTime: 40,
    plan: Plan.FALEMAIS30
  }
})

interface SutTypes {
  sut: CalculateCallController
  faleMaisCalculatorStub: FaleMaisCalculator
}

const makeSut = (): SutTypes => {
  const faleMaisCalculatorStub = makeFaleMaisCalculator()
  const sut = new CalculateCallController(faleMaisCalculatorStub)
  return {
    sut,
    faleMaisCalculatorStub
  }
}

describe('CalculateCall Controller', () => {
  test('Should call FaleMaisCalculator with correct values', async () => {
    const { sut, faleMaisCalculatorStub } = makeSut()
    const calculatorSpy = jest.spyOn(faleMaisCalculatorStub, 'calculate')
    await sut.handle(makeFakeRequest())
    expect(calculatorSpy).toHaveBeenCalledWith({
      originCode: 11,
      destinationCode: 31,
      callTime: 40,
      plan: Plan.FALEMAIS30
    })
  })
})
