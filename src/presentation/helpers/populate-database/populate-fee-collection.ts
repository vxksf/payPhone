import { CallFeeModel } from '../../../domain/models/call-fee'
import { MongoRepository } from '../../../infra/db/mongodb/mongo-repository'

export async function populateFeeCollection (): Promise<void> {
  const fees: CallFeeModel[] = []
  fees[0] = { originCode: '011', destinationCode: '016', minutePrice: 1.9 }
  fees[1] = { originCode: '016', destinationCode: '011', minutePrice: 2.9 }
  fees[2] = { originCode: '011', destinationCode: '017', minutePrice: 1.7 }
  fees[3] = { originCode: '017', destinationCode: '011', minutePrice: 2.7 }
  fees[4] = { originCode: '011', destinationCode: '018', minutePrice: 0.9 }
  fees[5] = { originCode: '018', destinationCode: '011', minutePrice: 1.9 }
  const mongoRepository = new MongoRepository()
  for (const fee of fees) {
    await mongoRepository.add(fee)
  }
}
