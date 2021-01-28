import { Router } from 'express'
import { makeCalculateCallController } from '../factories/calculate-call-price/calculate-call-price'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/calculate-call-price', adaptRoute(makeCalculateCallController()))
}
