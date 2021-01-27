import { Plan } from '../../domain/plans/plans'
import { CallPriceCalculatorService } from '../../domain/services/call-price-calculator-service'
import { TraditionalCallCalculator, FaleMaisCalculator } from '../services/call-price-calculators'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CalculatorFactory {
  static fromPlanType (planType: number): CallPriceCalculatorService {
    switch (planType) {
      case Plan.TRADITIONAL:
        return new TraditionalCallCalculator()
      case Plan.FALEMAIS30:
        return new FaleMaisCalculator()
    }
  }
}
