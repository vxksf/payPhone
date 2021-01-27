import { CallPriceCalculationModel } from '../../../domain/models/call-price-calculation'
import { CallPriceCalculator } from '../../../domain/usecases/call-price-calculator'
import { CalculatorFactory } from '../../factories/calculator-factory'
import { MongoRepository } from '../../../infra/db/mongodb/mongo-repository'

export class CalculateCallPrice implements CallPriceCalculator {
  async calculate (data: CallPriceCalculationModel): Promise<number> {
    const service = CalculatorFactory.fromPlanType(data.plan)
    service.setData(data)
    service.setRepository(new MongoRepository())
    return await service.calculate()
  }
}
