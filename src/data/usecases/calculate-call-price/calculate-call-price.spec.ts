import { CallPriceCalculationModel } from '../../../domain/models/call-price-calculation'
import { Plan } from '../../../domain/plans/plans'
import { CalculateCallPrice } from './calculate-call-price'

const makeFakeRequest = (): CallPriceCalculationModel => ({
  originCode: '011',
  destinationCode: '016',
  callTime: 40,
  plan: Plan.FALEMAIS30
})

interface SutTypes {
  sut: CalculateCallPrice
}

const makeSut = (): SutTypes => {
  const sut = new CalculateCallPrice(makeFakeRequest())
  return {
    sut
  }
}

describe('CalculateCallPrice UseCase', () => {
  test('Should get correct prices list from database', async () => {
    const { sut } = makeSut()
    sut.calculate(makeFakeRequest())
  })
})
