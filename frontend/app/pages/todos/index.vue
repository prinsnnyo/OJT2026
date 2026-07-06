<script setup lang="ts">
import { LogOut } from '@lucide/vue'

definePageMeta({
  middleware: 'auth',
})

const { user, logout } = useAuth()
</script>

<template>
  <header class="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">

    <!-- Logo + Navigation (grouped together) -->
    <div class="flex items-center gap-8">
      <span class="text-xl font-bold">Todo</span>

      <nav class="flex items-center gap-6">
        <NuxtLink to="/dashboard">Dashboard</NuxtLink>
        <NuxtLink to="/mytasks">My Tasks</NuxtLink>
      </nav>
    </div>

    <!-- Right Side -->
    <div class="flex items-center gap-4">
      <Input
        type="text"
        placeholder="Search tasks..."
        class="rounded-lg border px-3 py-2"
      />
      <Button variant="ghost" @click="logout"><LogOut/></Button>
    </div>

  </header>
</template>