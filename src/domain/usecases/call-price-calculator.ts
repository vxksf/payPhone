import { CallPriceCalculationModel } from '../models/call-price-calculation'

export interface CallPriceCalculator {
  calculate (data: CallPriceCalculationModel): Promise<number>
}
