import { Repository } from './repository'

export interface FeeRepository extends Repository {
  getDDDFee (originCode: string, destinationCode: string): Promise<number>
}
