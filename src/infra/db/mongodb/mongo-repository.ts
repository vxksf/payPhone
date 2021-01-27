import { FeeRepository } from '../../../data/protocols/db/fee-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class MongoRepository implements FeeRepository {
  async add (data: any): Promise<any> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(data)
    return MongoHelper.map(result.ops[0])
  }

  async getDDDFee (originCode: string, destinationCode: string): Promise<number> {
    const collection = await MongoHelper.getCollection('fees')
    const fee = await collection.findOne({ originCode, destinationCode })
    return fee
  }
}
