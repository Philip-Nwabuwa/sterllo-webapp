import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/users/')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info('Fetching users from JSONPlaceholder... @', request.url)

        try {
          // Fetch from JSONPlaceholder API
          const response = await fetch('https://jsonplaceholder.typicode.com/users')

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const users = await response.json()

          return json(users)
        } catch (error) {
          console.error('Error fetching users:', error)
          return json(
            {
              success: false,
              error: 'Failed to fetch users from external API',
            },
            { status: 500 }
          )
        }
      },
      POST: async ({ request }) => {
        console.info('Creating user via JSONPlaceholder... @', request.url)

        try {
          const body = await request.json()

          // Post to JSONPlaceholder API
          const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          })

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const newUser = await response.json()

          return json(newUser)
        } catch (error) {
          console.error('Error creating user:', error)
          return json(
            {
              success: false,
              error: 'Failed to create user',
            },
            { status: 500 }
          )
        }
      },
    },
  },
})
