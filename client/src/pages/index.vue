<script setup lang="ts">
const { user, isLoggedIn } = useUserStore()
let showLogin = $ref(false)
const toggleLogin = () => showLogin = !showLogin
</script>

<template>
  <div relative>
    <button rounded p2 bg-purple-8 @click="toggleLogin">
      Login
    </button>
    <div>
      <InputEntry />
    </div>
    {{ isLoggedIn }}
    {{ user }}
    <div>
      <!-- {{ loginWithDirect }} -->
    </div>

    <Login v-if="showLogin" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: public
</route>
