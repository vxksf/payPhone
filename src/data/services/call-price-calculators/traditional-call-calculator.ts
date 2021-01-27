import { GeneralCallPriceCalculator } from './general-call-price-calculator'

export class TraditionalCallCalculator extends GeneralCallPriceCalculator {
  async calculate (): Promise<number> {
    let result = this.data.callTime
    if (result > 0) {
      const fee = await this.repository.getDDDFee(this.data.originCode, this.data.destinationCode)
      result *= fee
    } else {
      result = 0.0
    }

    return result
  }
}
