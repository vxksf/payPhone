import { CallPriceCalculator } from '../../../domain/usecases/call-price-calculator'
import { Controller, HttpRequest, HttpResponse } from './calculate-protocols'
import { serverError, ok } from '../../helpers/http/http-helper'

export class CalculateCallController implements Controller {
  private readonly callPriceCalculator: CallPriceCalculator

  constructor (callPriceCalculator: CallPriceCalculator) {
    this.callPriceCalculator = callPriceCalculator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { originCode, destinationCode, callTime, plan } = httpRequest.body
      const calculated = await this.callPriceCalculator.calculate({
        originCode,
        destinationCode,
        callTime,
        plan
      })
      return ok({ calculated })
    } catch (error) {
      return serverError(error)
    }
  }
}
