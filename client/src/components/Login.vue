<script setup lang="ts">
const { loginUser } = useUserStore()
const route = useRoute()
const email = $ref('')

let isSubmit = $ref(false)

const handleSubmit = async () => {
  loginUser({ email, redirect: route.path })
  isSubmit = true
}
</script>

<template>
  <div
    absolute top-0 bottom-0 left-0 right-0
    flex="~ col" items-center m-auto w-100 h-100 p4 gap4 rounded
    bg-purple-8
  >
    <form flex="~ col" items-start gap3 w="1/2" @submit.prevent="handleSubmit">
      <h2>Login</h2>
      <input v-model="email" type="email" placeholder="email" text-zinc-9 p2 rounded>
      <button type="submit" bg-gray rounded p2 m-auto>
        Login
      </button>
    </form>
    <div text-white />

    <div v-if="isSubmit">
      Check yo email
    </div>

    <nuxt-link to="/register">
      Register
    </nuxt-link>
  </div>
</template>
