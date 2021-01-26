import { FaleMaisCalculator } from '../../../domain/usecases/fale-mais-calculator'
import { Controller, HttpRequest, HttpResponse } from './calculate-protocols'
import { ok } from '../../helpers/http/http-helper'

export class CalculateCallController implements Controller {
  private readonly faleMaiscalculator: FaleMaisCalculator

  constructor (faleMaiscalculator: FaleMaisCalculator) {
    this.faleMaiscalculator = faleMaiscalculator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { originCode, destinationCode, callTime, plan } = httpRequest.body
    const calculated = await this.faleMaiscalculator.calculate({
      originCode,
      destinationCode,
      callTime,
      plan
    })
    return ok({ calculated })
  }
}
