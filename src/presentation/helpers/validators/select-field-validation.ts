import { InvalidParamError } from '../../errors/invalid-param-error'
import { Validation } from '../../protocols/validation'

export class SelectFieldValidation implements Validation {
  private readonly codesList: string[]
  private readonly fieldName: string

  constructor (codesList: string[], fieldName: string) {
    this.codesList = codesList
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    if (!this.codesList.includes(input[this.fieldName])) {
      return new InvalidParamError(input[this.fieldName])
    }
  }
}
