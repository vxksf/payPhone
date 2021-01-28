import { ValidationComposite, RequiredFieldValidation, SelectFieldValidation } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'

export const makeCalculateCallPriceValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['originCode', 'destinationCode', 'callTime', 'plan']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new SelectFieldValidation(['011', '016', '017', '018'], 'originCode'))
  validations.push(new SelectFieldValidation(['011', '016', '017', '018'], 'destinationCode'))
  validations.push(new SelectFieldValidation([
    'Tradicional',
    'FaleMais 30',
    'FaleMais 60',
    'FaleMais 120'], 'plan'))
  return new ValidationComposite(validations)
}
