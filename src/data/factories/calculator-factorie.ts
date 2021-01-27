import { Plan } from '../../domain/plans/plans'
import { CallPriceCalculatorService } from '../../domain/services/call-price-calculator-service'
import { TraditionalCallCalculator, FaleMaisCalculator } from '../services/call-price-calculators'

export class CalculatorFactory {
  static fromPlanType (planType: number): CallPriceCalculatorService {
    switch (planType) {
      case Plan.TRADITIONAL:
        return new TraditionalCallCalculator()
      default:
        return new FaleMaisCalculator()
    }
  }
}
