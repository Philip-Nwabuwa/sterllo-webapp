import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

// Mock customer data - in production, this would come from a database
const MOCK_CUSTOMERS = {
  '1': {
    id: '1',
    name: 'Chidi Uzoma',
    email: 'chidi.u@example.com',
    phone: '+234 802 234 5678',
    balance: '€ 450,500.00',
    wallets: '37',
    status: 'active',
    kycStatus: 'verified',
    currency: 'EUR',
    address: '123 Main St, Lagos, Nigeria',
    dateJoined: '2023-01-15',
  },
  '2': {
    id: '2',
    name: 'Amara Nwachukwu',
    email: 'amara.n@example.com',
    phone: '+234 909 987 6543',
    balance: '€ 150,250.00',
    wallets: '22',
    status: 'active',
    kycStatus: 'verified',
    currency: 'EUR',
    address: '456 Oak Ave, Abuja, Nigeria',
    dateJoined: '2023-03-20',
  },
  '3': {
    id: '3',
    name: 'Amara Nwachukwu',
    email: 'amara.n@example.com',
    phone: '+234 909 987 6543',
    balance: '€ 150,250.00',
    wallets: '22',
    status: 'active',
    kycStatus: 'verified',
    currency: 'EUR',
    address: '456 Oak Ave, Abuja, Nigeria',
    dateJoined: '2023-03-20',
  },
  '4': {
    id: '4',
    name: 'Emeka Okafor',
    email: 'emeka.o@example.com',
    phone: '+234 805 567 8901',
    balance: '€ 100,250.00',
    wallets: '18',
    status: 'inactive',
    kycStatus: 'pending',
    currency: 'EUR',
    address: '789 Pine Rd, Port Harcourt, Nigeria',
    dateJoined: '2023-05-10',
  },
}

export const Route = createFileRoute('/api/customers/id')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        console.info('Fetching customer details... @', request.url)

        const { id } = params

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 200))

        const customer = MOCK_CUSTOMERS[id as keyof typeof MOCK_CUSTOMERS]

        if (!customer) {
          return json(
            {
              success: false,
              error: 'Customer not found',
            },
            { status: 404 }
          )
        }

        return json({
          success: true,
          data: customer,
        })
      },
    },
  },
})
