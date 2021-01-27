import { FeeRepository } from '../../../data/protocols/db/fee-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { CallFeeModel } from '../../../domain/models/call-fee'

export class MongoRepository implements FeeRepository {
  async add (data: CallFeeModel): Promise<CallFeeModel> {
    const accountCollection = await MongoHelper.getCollection('fees')
    const result = await accountCollection.insertOne(data)
    return MongoHelper.map(result.ops[0])
  }

  async getDDDFee (originCode: string, destinationCode: string): Promise<number> {
    const collection = await MongoHelper.getCollection('fees')
    const fee = await collection.findOne({ originCode, destinationCode })
    return fee.minutePrice
  }
}
