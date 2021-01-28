import { SelectFieldValidation } from './select-field-validation'
import { InvalidParamError } from '../../errors/invalid-param-error'

describe('SelectFieldValidation', () => {
  test('Should return a InvalidParamError if originCode is invalid', () => {
    const sut = new SelectFieldValidation(['011', '016', '017', '018'], 'originCode')
    const error = sut.validate({ originCode: '019' })
    expect(error).toEqual(new InvalidParamError('originCode'))
  })

  test('Should not return if validation succeeds for selected originCode', () => {
    const sut = new SelectFieldValidation(['011', '016', '017', '018'], 'originCode')
    const error = sut.validate({ originCode: '018' })
    expect(error).toBeFalsy()
  })

  test('Should return a InvalidParamError if destinationCode is invalid', () => {
    const sut = new SelectFieldValidation(['011', '016', '017', '018'], 'destinationCode')
    const error = sut.validate({ destinationCode: '019' })
    expect(error).toEqual(new InvalidParamError('destinationCode'))
  })

  test('Should not return if validation succeeds for selected destinationCode', () => {
    const sut = new SelectFieldValidation(['011', '016', '017', '018'], 'destinationCode')
    const error = sut.validate({ destinationCode: '011' })
    expect(error).toBeFalsy()
  })

  test('Should return a InvalidParamError if plan is invalid', () => {
    const sut = new SelectFieldValidation([
      'Tradicional',
      'FaleMais 30',
      'FaleMais 60',
      'FaleMais 120'], 'plan')
    const error = sut.validate({ plan: 'FaleBem 50' })
    expect(error).toEqual(new InvalidParamError('plan'))
  })

  test('Should not return if validation succeeds for selected plan', () => {
    const sut = new SelectFieldValidation([
      'Tradicional',
      'FaleMais 30',
      'FaleMais 60',
      'FaleMais 120'], 'plan')
    const error = sut.validate({ plan: 'FaleMais 30' })
    expect(error).toBeFalsy()
  })
})
