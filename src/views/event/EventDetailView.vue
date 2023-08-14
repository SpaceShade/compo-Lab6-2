<script setup lang="ts">
import type { EventItem } from '@/type';
import type { PropType } from 'vue';

defineProps({
    event: {
        type: Object as PropType<EventItem>,
        required: true
    }
});
</script>

<template>
    <div v-if="event" class="p-4 bg-white rounded-lg shadow-md">
        <p class="text-lg font-semibold mb-2">
            {{ event.time }} on {{ event.date }} @ {{ event.location }}
        </p>
        <p class="text-gray-600">{{ event.description }}</p>
    </div>
</template>
