<script lang="ts">
import { defineComponent, onBeforeUnmount, ref } from 'vue'

const now = (): string => (new Date()).toLocaleString()

export default defineComponent({
  setup() {
    const timer = ref(now())

    const interval = setInterval(() => {
      timer.value = now()
    }, 1_000)

    onBeforeUnmount(() => {
      clearInterval(interval)
    })

    return {
      timer
    }
  },
})
</script>

<template>
  <div class="timer-app--main">
    <h1>Nextcloud Clock</h1>
    <h2>{{ timer }}</h2>
  </div>
</template>

<style lang="postcss">
.timer-app--main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem;
}
</style>
