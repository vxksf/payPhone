import { Repository } from '../../../domain/protocols/db/repository'

export interface FeeRepository extends Repository {
  getDDDFee (originCode: string, destinationCode: string): Promise<number>
}
