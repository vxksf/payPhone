import { CallPriceCalculator } from '../../../domain/usecases/call-price-calculator'
import { Controller, HttpRequest, HttpResponse } from './calculate-protocols'
import { serverError, badRequest, ok } from '../../helpers/http/http-helper'
import { Validation } from '../../protocols/validation'
import { populateFeeCollection } from '../../helpers/populate-database/populate-fee-collection'

export class CalculateCallController implements Controller {
  private readonly callPriceCalculator: CallPriceCalculator
  private readonly validation: Validation

  constructor (callPriceCalculator: CallPriceCalculator, validation: Validation) {
    this.callPriceCalculator = callPriceCalculator
    this.validation = validation
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    populateFeeCollection()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
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
