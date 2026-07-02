<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { registerSchema } from '~/schemas'

definePageMeta({
  middleware: 'guest',
  layout: false,
})

const inputClass = cn(
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm',
  'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
)

const { register } = useAuth()
const errorMessage = ref<string | null>(null)
const isSubmitting = ref(false)

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
})

const [name] = defineField('name')
const [email] = defineField('email')
const [password] = defineField('password')
const [confirmPassword] = defineField('confirmPassword')

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = null
  isSubmitting.value = true
  try {
    await register(values.name, values.email, values.password)
    await navigateTo('/todos')
  }
  catch (err: unknown) {
    const message = (err as { message?: string | string[] }).message
    errorMessage.value = Array.isArray(message) ? message.join(', ') : (message ?? 'Registration failed')
  }
  finally {
    isSubmitting.value = false
  }
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Register to start managing your todos</CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-4" novalidate @submit="onSubmit">
          <div class="space-y-2">
            <Label for="name">Name</Label>
            <input id="name" v-model="name" type="text" :class="inputClass" placeholder="Your name">
            <p v-if="errors.name" class="text-sm text-destructive">
              {{ errors.name }}
            </p>
          </div>

          <div class="space-y-2">
            <Label for="email">Email</Label>
            <input id="email" v-model="email" type="text" inputmode="email" :class="inputClass" placeholder="you@example.com">
            <p v-if="errors.email" class="text-sm text-destructive">
              {{ errors.email }}
            </p>
          </div>

          <div class="space-y-2">
            <Label for="password">Password</Label>
            <input id="password" v-model="password" type="password" :class="inputClass" placeholder="••••••••">
            <p v-if="errors.password" class="text-sm text-destructive">
              {{ errors.password }}
            </p>
          </div>

          <div class="space-y-2">
            <Label for="confirmPassword">Confirm password</Label>
            <input id="confirmPassword" v-model="confirmPassword" type="password" :class="inputClass" placeholder="••••••••">
            <p v-if="errors.confirmPassword" class="text-sm text-destructive">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <p v-if="errorMessage" class="text-sm text-destructive">
            {{ errorMessage }}
          </p>

          <Button type="submit" class="w-full" :disabled="isSubmitting">
            {{ isSubmitting ? 'Creating account...' : 'Register' }}
          </Button>
        </form>

        <p class="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?
          <NuxtLink to="/login" class="text-primary underline-offset-4 hover:underline">
            Sign in
          </NuxtLink>
        </p>
      </CardContent>
    </Card>
  </div>
</template>
