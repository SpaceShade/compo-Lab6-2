<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia';

const store = useMessageStore()
const { message } = storeToRefs(store)
</script>
<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div><img alt="Vue logo" class="mt-5 mb-10 object-center h-28 w-72" src="@/assets/logo.svg" width="125" height="125" /></div>

    <header class="max-h-screen leading-normal">
      <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>

      <div class="wrapper">
        <nav class="sm:flex justify-center items-center">
          <div class="flex space-x-5 text-center"> <!-- Use 'flex' and 'space-x-5' classes here -->
            <!-- Navigation links in the same line -->
            <RouterLink class="hover:bg-orange-500 hover:text-white" :to="{ name: 'EventList' }">Home</RouterLink>|
            <RouterLink class="hover:bg-orange-500 hover:text-white" :to="{ name: 'about' }">About</RouterLink>|
            <RouterLink class="hover:bg-orange-500 hover:text-white" :to="{ name: 'StudentList' }">Student</RouterLink>
          </div>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<!-- ... -->


<!-- ... -->


<style scoped>
#app {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

h4 {
  font-size: 20px;
}

@keyframes yellowfade {
  from {
    background: yellow;
  }

  to {
    background: transparent;
  }
}

#flashMessage {
  animation: yellowfade 3s ease-in-out;
}</style>
