<script setup lang="ts">
import EventService from '@/services/EventService';
import EventCard from '../components/EventCard.vue'
import type { EventItem } from '@/type';
import axios, { type AxiosResponse } from 'axios'

import { useRouter } from 'vue-router'

import { onBeforeRouteUpdate } from 'vue-router';

import { ref, type Ref, watchEffect, computed } from 'vue'
const events: Ref<Array<EventItem>> = ref([])
const totalEvent = ref<number>(0)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const eventsPerPage = ref(2)
const hasNextPage = computed(() => {
  //first calculate the total page
  const totalPages = Math.ceil(totalEvent.value / 3)
  return props.page.valueOf() < totalPages
})
axios.get<EventItem[]>('http://localhost:3004/events')
  .then((response) => {
    events.value = response.data
  })
EventService.getEvent(eventsPerPage.value, props.page).then((response: AxiosResponse<EventItem[]>) => {
  events.value = response.data
  totalEvent.value = response.headers['x-total-count']
})

const router = useRouter()

EventService.getEvent(3, props.page).then((response: AxiosResponse<EventItem[]>) => {
  events.value = response.data
  totalEvent.value = response.headers['x-total-count']
}).catch(() => {
  router.push({ name: 'NetworkError' })
})
onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)

  EventService.getEvent(3, toPage).then((response: AxiosResponse<EventItem[]>) => {
    events.value = response.data
    totalEvent.value = response.headers['x-total-count']
  }).catch(() => {
    router.push({ name: 'NetworkError' })
  })
})

</script>

<template>
  <main class="flex flex-col items-center p-5">
    <h1 class="text-3xl font-bold mb-5">Events for Good</h1>
    <div class="mb-5">
      <label for="events-per-page" class="text-gray-600">Events per page:</label>
      <input type="number" id="events-per-page" v-model.number="eventsPerPage" class="px-2 py-1 border rounded border-gray-300 focus:ring focus:ring-blue-200" />
    </div>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
    <div class="flex justify-between w-full mt-5">
      <RouterLink :to="{ name: 'EventList', query: { page: page - 1 } }" rel="prev" v-if="page !== 1" class="text-blue-500 hover:text-blue-700">
        Prev Page
      </RouterLink>
      <RouterLink :to="{ name: 'EventList', query: { page: page + 1 } }" rel="next" v-if="hasNextPage" class="text-blue-500 hover:text-blue-700">
        Next Page
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}</style>
