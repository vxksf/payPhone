import { ValidationComposite, RequiredFieldValidation, SelectFieldValidation } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'
import { Plan } from '../../../domain/plans/plans'

export const makeCalculateCallPriceValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['originCode', 'destinationCode', 'callTime', 'plan']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new SelectFieldValidation(['011', '016', '017', '018'], 'originCode'))
  validations.push(new SelectFieldValidation(['011', '016', '017', '018'], 'destinationCode'))
  validations.push(new SelectFieldValidation([
    Plan.TRADITIONAL,
    Plan.FALEMAIS30,
    Plan.FALEMAIS60,
    Plan.FALEMAIS120], 'plan'))
  return new ValidationComposite(validations)
}
