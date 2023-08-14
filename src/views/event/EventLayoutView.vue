<script setup lang="ts">
import { useEventStore } from '@/stores/event';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = useEventStore();
const event = storeToRefs(store).event;
const id = ref(event?.value?.id);
</script>

<template>
  <div v-if="event" class="bg-white rounded-lg shadow-md p-6">
    <h1 class="text-3xl font-bold mb-4">{{ event.title }}</h1>
    <div id="nav" class="flex space-x-4 text-gray-600">
      <router-link
        :to="{ name: 'event-detail', params: { id } }"
        class="hover:text-blue-500 hover:underline transition"
      >
        Details
      </router-link>
      <span>|</span>
      <router-link
        :to="{ name: 'event-register', params: { id } }"
        class="hover:text-blue-500 hover:underline transition"
      >
        Register
      </router-link>
      <span>|</span>
      <router-link
        :to="{ name: 'event-edit', params: { id } }"
        class="hover:text-blue-500 hover:underline transition"
      >
        Edit
      </router-link>
    </div>

    <RouterView :event="event" />
  </div>
</template>

