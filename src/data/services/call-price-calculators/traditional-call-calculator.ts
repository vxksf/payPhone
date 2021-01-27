import { GeneralCallPriceCalculator } from './general-call-price-calculator'

export class TraditionalCallCalculator extends GeneralCallPriceCalculator {
  async calculate (): Promise<number> {
    let result = this.data.time - 30
    if (result > 0) {
      const fee = this.repository.getDDDFee(this.data.originCode, this.data.destinationCode)
      result *= fee
      const extra = result * 0.1
      result += extra
    } else {
      result = 0.0
    }

    return result
  }
}
