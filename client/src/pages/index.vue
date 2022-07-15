<script setup lang="ts">
import type { InferQueryOutput } from '~/types'
const { user, isLoggedIn } = useUserStore()
let showLogin = $ref(false)
const toggleLogin = () => showLogin = !showLogin

const customer = $ref({
  name: '',
  email: undefined,
  phone: undefined,
  address: undefined,
})

let customers: InferQueryOutput<'clients.get-clients'> = []

const createClient = () => {
  client.mutation('clients.create-client', {
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
  })
}

const getClients = async () => {
  const res = await client.query('clients.get-clients')
  customers = res
}

const contact = $ref({
  name: '',
  email: undefined,
  phone: undefined,
  clientId: '',
  role: undefined,
})

let contacts: InferQueryOutput<'contacts.get-contacts'> = []

const createContact = () => {
  client.mutation('contacts.create-contact', {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    role: contact.role,
    clientId: contact.clientId,
  })
}

const getContacts = async () => {
  contacts = await client.query('contacts.get-contacts')
}
</script>

<template>
  <div relative flex="~ col" gap4>
    <div flex="~ col">
      {{ isLoggedIn }}
      {{ user }}
    </div>

    <button max-w-fit rounded p2 bg-purple-8 @click="toggleLogin">
      Login
    </button>
    <div />
    <div>
      {{ customer }}
    </div>
    <section>
      <div flex gap3>
        <input v-model="customer.name" type="text">
        <button max-w-fit rounded p2 bg-purple-8 @click="createClient">
          Create
        </button>
        <button max-w-fit rounded p2 bg-purple-8 @click="getClients">
          Refresh Clients
        </button>
      </div>

      <div>
        <ul v-if="customers.length">
          <li v-for="customer in customers" :key="customer.id">
            {{ customer.name }}
          </li>
        </ul>
      </div>
    </section>

    <section>
      <div flex gap3>
        <input v-model="contact.name" type="text">
        <button max-w-fit rounded p2 bg-purple-8 @click="createContact">
          Create
        </button>
        <button max-w-fit rounded p2 bg-purple-8 @click="getContacts">
          Refresh Contacts
        </button>
      </div>
      <div flex gap3>
        <v-select
          v-model="contact.clientId"
          label="name"
          :options="customers"
          :reduce="(customer) => customer.id"
        />
      </div>

      <div>
        <ul v-if="contacts.length">
          <li v-for="contact in contacts" :key="contact.id">
            {{ contact.name }}
          </li>
        </ul>
      </div>
    </section>

    <Login v-if="showLogin" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: public
</route>

<style>
input {
  color: black;
}
</style>

