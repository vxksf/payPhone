import { Controller } from '../../../presentation/protocols'
import { CalculateCallController } from '../../../presentation/controllers/calculate-call-price/calculate-call-price'
import { CalculateCallPrice } from '../../../data/usecases/calculate-call-price/calculate-call-price'
import { makeCalculateCallPriceValidation } from './calculate-call-price-validation'

export const makeCalculateCallController = (): Controller => {
  const calculateCallPrice = new CalculateCallPrice()
  return new CalculateCallController(calculateCallPrice, makeCalculateCallPriceValidation())
}
