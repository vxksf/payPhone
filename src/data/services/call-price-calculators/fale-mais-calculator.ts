import { GeneralCallPriceCalculator } from './general-call-price-calculator'
import { Plan } from '../../../domain/plans/plans'

export class FaleMaisCallCalculator extends GeneralCallPriceCalculator {
  async calculate (): Promise<number> {
    const timePack = this.getTimePacketByPlan(this.data.plan)
    let result = this.data.callTime - timePack
    if (result > 0) {
      const fee = await this.repository.getDDDFee(this.data.originCode, this.data.destinationCode)
      result *= fee
      const extra = result * 0.1
      result += extra
    } else {
      result = 0.0
    }

    return result
  }

  private getTimePacketByPlan (plan: string): number {
    switch (plan) {
      case Plan.FALEMAIS30:
        return 30
      case Plan.FALEMAIS60:
        return 60
      case Plan.FALEMAIS120:
        return 120
    }
  }
}
