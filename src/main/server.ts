import { MongoHelper } from '../infra/db/helpers/mongo-helper'
import { EnvManager } from '../infra/env/env-manager'

const envManager = new EnvManager()

MongoHelper.connect(envManager.getEnvMongoUrl())
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(envManager.getEnvPort(), () => console.log(`Server running at http://localhost:${envManager.getEnvMongoUrl()}`))
  })
  .catch(console.log)
