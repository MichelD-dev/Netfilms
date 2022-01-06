import { setupWorker } from 'msw'
import { handlers } from './handlers'

const server = setupWorker(...handlers)

server.start({
  quiet: true,
  serviceWorker: {
    url: '/mockServiceWorker.js',
  },
})

export * from 'msw'
export { server }
