import { CallPriceCalculator } from '../../../domain/usecases/call-price-calculator'
import { CallPriceCalculationModel } from '../../../domain/models/call-price-calculation'
import { Plan } from '../../../domain/plans/plans'
import { CalculateCallController } from './calculate-call-price'
import { Validation } from '../../protocols/validation'
import { MissingParamError } from '../../errors/missing-param-error'
import { HttpRequest } from './calculate-protocols'
import { serverError, badRequest, ok } from '../../helpers/http/http-helper'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

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
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const callPriceCalculatorStub = makeCallPriceCalculator()
  const validationStub = makeValidation()
  const sut = new CalculateCallController(callPriceCalculatorStub, validationStub)
  return {
    sut,
    callPriceCalculatorStub,
    validationStub
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

  test('Should return 500 if CallPriceCalculator throws', async () => {
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

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
