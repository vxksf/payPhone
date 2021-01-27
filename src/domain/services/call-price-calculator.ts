import { CallPriceCalculationModel } from '../models/call-price-calculation'

export interface CallPriceCalculator {
  setData (data: CallPriceCalculationModel): void
  calculate (): number
}
