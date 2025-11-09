import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

// Mock customer data - in production, this would come from a database
const MOCK_CUSTOMERS = [
  {
    id: '1',
    name: 'Chidi Uzoma',
    email: 'chidi.u@example.com',
    phone: '+234 802 234 5678',
    balance: '€ 450,500.00',
    wallets: '37',
    status: 'active',
    kycStatus: 'verified',
    currency: 'EUR',
  },
  {
    id: '2',
    name: 'Amara Nwachukwu',
    email: 'amara.n@example.com',
    phone: '+234 909 987 6543',
    balance: '€ 150,250.00',
    wallets: '22',
    status: 'active',
    kycStatus: 'verified',
    currency: 'EUR',
  },
  {
    id: '3',
    name: 'Amara Nwachukwu',
    email: 'amara.n@example.com',
    phone: '+234 909 987 6543',
    balance: '€ 150,250.00',
    wallets: '22',
    status: 'active',
    kycStatus: 'verified',
    currency: 'EUR',
  },
  {
    id: '4',
    name: 'Emeka Okafor',
    email: 'emeka.o@example.com',
    phone: '+234 805 567 8901',
    balance: '€ 100,250.00',
    wallets: '18',
    status: 'inactive',
    kycStatus: 'pending',
    currency: 'EUR',
  },
]

export const Route = createFileRoute('/api/customers/')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info('Fetching customers... @', request.url)

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300))

        return json({
          success: true,
          data: MOCK_CUSTOMERS,
          total: MOCK_CUSTOMERS.length,
          metrics: {
            totalCustomers: MOCK_CUSTOMERS.length,
            activeCustomers: MOCK_CUSTOMERS.filter(c => c.status === 'active').length,
            newCustomers: 2, // Mock value
          },
        })
      },
    },
  },
})
