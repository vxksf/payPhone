import { Plan } from '../../domain/plans/plans'
import { CallPriceCalculator } from '../../domain/services/call-price-calculator'
import { TraditionalCallCalculator, FaleMaisCalculator } from '../services/call-price-calculators'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CalculatorFactory {
  static fromPlanType (planType: number): CallPriceCalculator {
    switch (planType) {
      case Plan.TRADITIONAL:
        return new TraditionalCallCalculator()
      case Plan.FALEMAIS30:
        return new FaleMaisCalculator()
    }
  }
}
