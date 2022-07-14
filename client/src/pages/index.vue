<script setup lang="ts">
import { testAPI } from '~/composables/trpcClient'

const name = $ref('Kyle')
const email = $ref('test@t.com')
let res = $ref('')

const router = useRouter()
const go = async () => {
  // const { data } = useFetch('http://localhost:2022/trpc/hello')
//   const newUser = await client.mutation('users.register-user', {
//     name,
//     email})

  //   console.log('newUser', newUser)
  // }

  res = await client.query('users.get-users')
}
</script>

<template>
  <div>
    {{res}}
    <div i-carbon-campsite text-4xl inline-block />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Vitesse Lite
      </a>
    </p>
    <p>
      <em text-sm op75>Opinionated Vite Starter Template</em>
    </p>

    <div py-4 />

    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >

    <div>
      <button
        class="m-3 text-sm btn"
        @click="go"
      >
        Go home
      </button>
    </div>
  </div>
</template>
