import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { createPinia } from 'pinia'
import vSelect from 'vue-select'
import { vueKeycloak } from '@baloise/vue-keycloak'
import { VueQueryPlugin } from 'vue-query'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

import { createTRPCClient } from '@trpc/client'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import superjson from 'superjson'
import type { AppRouter } from '../../server/src/trpc/route/app.router'
import App from './App.vue'

const url = 'http://localhost:2022/trpc'

export const client = createTRPCClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      maxBatchSize: 10,
      url,
    }),
  ],
  transformer: superjson,
})

const routes = setupLayouts(generatedRoutes)

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.component('VSelect', vSelect)
app.use(vueKeycloak, {
  initOptions: {
    flow: 'standard',
    checkLoginIframe: false,
    onLoad: 'login-required',
  },
  config: {
    url: 'http://localhost:8080/',
    realm: 'myrealm',
    clientId: 'app-vue',
  },
})
app.use(VueQueryPlugin, {
  queryClient: client,
})
app.use(router)
app.use(createPinia())
app.mount('#app')
