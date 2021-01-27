import { CallPriceCalculationModel } from '../../../domain/models/call-price-calculation'
import { Repository } from '../../../domain/protocols/db/repository'
import { CallPriceCalculatorService } from '../../../domain/services/call-price-calculator-service'

export abstract class GeneralCallPriceCalculator implements CallPriceCalculatorService {
  protected data
  protected repository

  setData (data: CallPriceCalculationModel): void {
    this.data = data
  }

  setRepository (repository: Repository): void {
    this.repository = repository
  }

  abstract calculate (): Promise<number>
}
