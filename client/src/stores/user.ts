import { acceptHMRUpdate, defineStore } from 'pinia'
import type { CtxUser, InferQueryOutput } from '~/types'

export const useUserStore = defineStore('userStore', () => {
  const storedUser = getStoredUser()

  const user = useStorage<InferQueryOutput<'users.me'>>('user', storedUser)

  const isLoggedIn = computed(() => {
    return !!user.value?.id
  })

  async function loginUser({ email, redirect }: {
    email: string
    redirect: string
  }) {
    return await client.mutation('users.request-otp', { email, redirect })
  }

  async function verifyToken({ hash }: { hash: string }) {
    const res = await client.query('users.verify-otp', { hash })
    return res
  }

  // logout user

  async function registerUser({ name, email }: { name: string; email: string }) {
    const newUser = await client.mutation('users.register-user', { name, email })
    return newUser
  }

  async function setUser() {
    const user = await client.query('users.me')

    if (user)
      setStoredUser(user)
  }

  function getStoredUser(): CtxUser | null {
    const user = localStorage.getItem('user')

    return user ? JSON.parse(user) : null
  }

  function setStoredUser(user: CtxUser) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  function clearStoredUser() {
    localStorage.removeItem('user')
  }

  return { user, loginUser, verifyToken, registerUser, setUser, isLoggedIn }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
