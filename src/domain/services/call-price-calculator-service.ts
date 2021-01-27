import { CallPriceCalculationModel } from '../models/call-price-calculation'
import { Repository } from '../../domain/protocols/db/repository'

export interface CallPriceCalculatorService {
  setData (data: CallPriceCalculationModel): void
  setRepository(repository: Repository): void
  calculate (): Promise<number>
}
