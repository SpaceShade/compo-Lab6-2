<script setup lang="ts">
import StudentService from '@/services/StudentService';
import StudentCard from '../components/StudentCard.vue'
import type { Student } from '@/type';
import axios from 'axios'

import {ref, type Ref} from 'vue'
const students : Ref<Array<Student>> = ref([])
StudentService.getStudent().then((response)=>{
  students.value = response.data
})

</script>

<template>
  <main class="events">
    <h1>Events for Good</h1>
    <StudentCard v-for="student in students" :key="student.studentId" :student="student"></StudentCard>
  </main>
</template>

<style scoped>
.events{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
