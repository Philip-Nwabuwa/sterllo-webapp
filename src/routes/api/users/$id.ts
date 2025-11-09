import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/users/$id')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        console.info('Fetching user details from JSONPlaceholder... @', request.url)

        const { id } = params

        try {
          // Fetch from JSONPlaceholder API
          const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

          if (!response.ok) {
            if (response.status === 404) {
              return json(
                {
                  success: false,
                  error: 'User not found',
                },
                { status: 404 }
              )
            }
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const user = await response.json()

          return json(user)
        } catch (error) {
          console.error('Error fetching user:', error)
          return json(
            {
              success: false,
              error: 'Failed to fetch user from external API',
            },
            { status: 500 }
          )
        }
      },
    },
  },
})
