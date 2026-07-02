<script setup lang="ts">
const { isAuthenticated } = useAuth()

await navigateTo(isAuthenticated.value ? '/todos' : '/login', { replace: true })
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <p class="text-sm text-muted-foreground">
      Loading...
    </p>
  </div>
</template>
