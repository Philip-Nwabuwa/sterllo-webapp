import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { z } from 'zod'

// Validation schema for login
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const Route = createFileRoute('/api/auth/login')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        console.info('Processing login request... @', request.url)

        try {
          const body = await request.json()
          const { email, password } = loginSchema.parse(body)

          // TODO: Replace with actual authentication logic
          // For now, simulating authentication

          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1000))

          // Mock authentication - accept any valid email/password
          if (email && password) {
            return json({
              success: true,
              user: {
                id: '1',
                email,
                name: 'Demo User',
              },
              token: 'mock-jwt-token-' + Date.now(),
            })
          }

          return json(
            {
              success: false,
              error: 'Invalid credentials',
            },
            { status: 401 }
          )
        } catch (error) {
          if (error instanceof z.ZodError) {
            return json(
              {
                success: false,
                error: 'Validation error',
                details: error.errors,
              },
              { status: 400 }
            )
          }

          return json(
            {
              success: false,
              error: 'Internal server error',
            },
            { status: 500 }
          )
        }
      },
    },
  },
})
