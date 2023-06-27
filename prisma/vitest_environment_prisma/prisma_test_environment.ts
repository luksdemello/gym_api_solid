import { type Environment } from 'vitest'

export default {
  name: 'prisma',
  async setup() {
    console.log('setup')

    return {
      teardown() {
        console.log('teardown')
      }
    }
  }
} as Environment
