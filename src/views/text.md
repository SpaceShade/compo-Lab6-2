<template>
  <br>
  <h1>Events For Good</h1>
  <br>
  <main class="flex flex-col items-center">
    <StudentCard v-for="student in students" :student="student" :key="student.studentId"></StudentCard>
  </main>
</template>

<script setup lang="ts">
import type { Student } from '@/type'
import StudentCard from '@/components/StudentCard.vue'
import { ref, type Ref } from 'vue'
import StudentService from '@/services/StudentService'

const students: Ref<Array<Student>> = ref([])
StudentService.getStudent().then((res) => {
  students.value = res.data
})
</script>