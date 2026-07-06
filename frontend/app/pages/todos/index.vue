<script setup lang="ts">
import { LogOut, Sparkles } from '@lucide/vue'
import { Button } from '@/components/ui/button'

definePageMeta({
  middleware: 'auth',
})

const { user, logout } = useAuth()
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-4 text-slate-100">
    <div class="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur">
      <div class="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-300">
        <Sparkles class="h-4 w-4" />
        Intern workspace
      </div>

      <div class="mt-6 space-y-4">
        <p class="text-3xl font-semibold leading-tight sm:text-4xl">
          Here you will start the development, GOODLUCK interns happy coding  : &gt;
        </p>

        <p v-if="user" class="text-sm text-slate-300">
          Signed in as {{ user.name ?? user.email }}
        </p>
      </div>

      
      <div class="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
       
        <Button variant="outline" class="border-white/20 bg-white/5 text-slate-100 hover:bg-white/10" @click="logout">
          <LogOut class="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  </div>
</template>
