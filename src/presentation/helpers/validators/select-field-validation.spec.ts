import { SelectFieldValidation } from './select-field-validation'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { Plan } from '../../../domain/plans/plans'

describe('SelectFieldValidation', () => {
  test('Should return a InvalidParamError if originCode is invalid', () => {
    const sut = new SelectFieldValidation(['011', '016', '017', '018'], 'originCode')
    const error = sut.validate({ originCode: '019' })
    expect(error).toEqual(new InvalidParamError('019'))
  })

  test('Should not return if validation succeeds for selected originCode', () => {
    const sut = new SelectFieldValidation(['011', '016', '017', '018'], 'originCode')
    const error = sut.validate({ originCode: '018' })
    expect(error).toBeFalsy()
  })

  test('Should return a InvalidParamError if destinationCode is invalid', () => {
    const sut = new SelectFieldValidation(['011', '016', '017', '018'], 'destinationCode')
    const error = sut.validate({ destinationCode: '019' })
    expect(error).toEqual(new InvalidParamError('019'))
  })

  test('Should not return if validation succeeds for selected destinationCode', () => {
    const sut = new SelectFieldValidation(['011', '016', '017', '018'], 'destinationCode')
    const error = sut.validate({ destinationCode: '011' })
    expect(error).toBeFalsy()
  })

  test('Should return a InvalidParamError if plan is invalid', () => {
    const sut = new SelectFieldValidation([
      Plan.TRADITIONAL.toString(),
      Plan.FALEMAIS30.toString(),
      Plan.FALEMAIS60.toString(),
      Plan.FALEMAIS120.toString()], 'plan')
    const error = sut.validate({ plan: 'FaleBem 50' })
    expect(error).toEqual(new InvalidParamError('FaleBem 50'))
  })

  test('Should not return if validation succeeds for selected plan', () => {
    const sut = new SelectFieldValidation([
      Plan.TRADITIONAL.toString(),
      Plan.FALEMAIS30.toString(),
      Plan.FALEMAIS60.toString(),
      Plan.FALEMAIS120.toString()], 'plan')
    const error = sut.validate({ plan: Plan.FALEMAIS30.toString() })
    expect(error).toBeFalsy()
  })
})
