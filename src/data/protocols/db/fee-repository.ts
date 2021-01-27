import { Repository } from '../../../domain/protocols/db/repository'
import { CallFeeModel } from '../../../domain/models/call-fee'

export interface FeeRepository extends Repository {
  getDDDFee (originCode: string, destinationCode: string): Promise<number>
  add (data: CallFeeModel): Promise<CallFeeModel>
}
