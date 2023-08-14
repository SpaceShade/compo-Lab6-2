<template>
    <div class="event-class">
        <div class="event-card">
            <span>@{{ event?.category }}</span>
            <h4>{{ event?.organizer }}</h4>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { EventItem } from '@/type'
import type { PropType } from 'vue';
const props = defineProps({
    event:{
        type: Object as PropType<EventItem>,
            require:true
    }
})

</script>

<style scoped>
.event-card {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
    text-align: right;
    font-size: 20px;
}
.event-card:hover {
    text-align: right;
    font-size: 20px;
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>