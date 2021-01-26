import { FaleMaisCalculationModel } from '../models/fale-mais-calculation'

export interface FaleMaisCalculator {
  calculate (data: FaleMaisCalculationModel): Promise<number>
}
