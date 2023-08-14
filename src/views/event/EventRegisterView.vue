<script setup lang="ts">
import { type EventItem } from '@/type'
import type { PropType } from 'vue'
import { useRouter }from 'vue-router'
import { useMessageStore} from '@/stores/message'

const props = defineProps({
    event: {
        type: Object as PropType<EventItem>,
            require: true
    }
})
const router = useRouter()
const store = useMessageStore()
function register(){
    store.updateMessage('You are successfully registered for '+ props.event?.title)
    setTimeout(()=>
    
    {
        store.resetMessage()
    },3000)
    router.push({
        name: 'event-detail',
        params: {
            id: props.event?.id
        }
    })
}
</script>
<template>
    <div class="bg-white rounded-lg shadow-md p-6">
        <p class="text-xl font-semibold mb-4">Registration the event here</p>
        <button @click="register" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Register Me
        </button>
    </div>
</template>
