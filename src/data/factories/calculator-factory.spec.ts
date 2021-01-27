import { CalculatorFactory } from './calculator-factory'
import { Plan } from '../../domain/plans/plans'
import { FaleMaisCalculator, TraditionalCallCalculator } from '../services/call-price-calculators'

describe('CalculatorFactory Factory', () => {
  test('Should return TraditionalCallCalculator when plan is traditional', () => {
    const instance = CalculatorFactory.fromPlanType(Plan.TRADITIONAL)
    expect(instance).toBeInstanceOf(TraditionalCallCalculator)
  })

  test('Should return FaleMaisCallCalculator when plan is FaleMais 30', () => {
    const instance = CalculatorFactory.fromPlanType(Plan.FALEMAIS30)
    expect(instance).toBeInstanceOf(FaleMaisCalculator)
  })

  test('Should return FaleMaisCallCalculator when plan is FaleMais60 ', () => {
    const instance = CalculatorFactory.fromPlanType(Plan.FALEMAIS60)
    expect(instance).toBeInstanceOf(FaleMaisCalculator)
  })

  test('Should return FaleMaisCallCalculator when plan is FaleMais120 ', () => {
    const instance = CalculatorFactory.fromPlanType(Plan.FALEMAIS120)
    expect(instance).toBeInstanceOf(FaleMaisCalculator)
  })
})
