import { CallPriceCalculationModel } from '../../../domain/models/call-price-calculation'
import { Repository } from '../../protocols/db/repository'
import { CallPriceCalculator } from '../../../domain/services/call-price-calculator'

export abstract class GeneralCallPriceCalculator implements CallPriceCalculator {
  protected data
  protected repository

  setData (data: CallPriceCalculationModel): void {
    this.data = data
  }

  setRepository (repository: Repository): void {
    this.repository = repository
  }

  abstract calculate (): number
}
