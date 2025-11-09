import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

// Mock wallet data - in production, this would come from a database
const MOCK_WALLETS = [
  {
    id: 1,
    customerName: 'Tunde Afolabi',
    currency: 'EUR',
    currencySymbol: '€',
    balance1: '300,750.00',
    balance2: '300,750.00',
    balance3: '300,750.00',
    status: 'Active',
    dateCreated: '2024-10-02',
    lastActivity: '3 hours ago',
  },
  {
    id: 2,
    customerName: 'Femi Ogunleye',
    currency: 'GHS',
    currencySymbol: 'GH₵',
    balance1: '55,400.00',
    balance2: '55,400.00',
    balance3: '55,400.00',
    status: 'Active',
    dateCreated: '2024-09-30',
    lastActivity: '3 hours ago',
  },
  {
    id: 3,
    customerName: 'Zainab Ibrahim',
    currency: 'CHF',
    currencySymbol: 'CHf',
    balance1: '200,250.00',
    balance2: '200,250.00',
    balance3: '200,250.00',
    status: 'Suspended',
    dateCreated: '2024-09-27',
    lastActivity: '9 hours ago',
  },
  {
    id: 4,
    customerName: 'Ijeoma Okeke',
    currency: 'GBP',
    currencySymbol: '£',
    balance1: '45,000.00',
    balance2: '45,000.00',
    balance3: '45,000.00',
    status: 'Active',
    dateCreated: '2024-09-30',
    lastActivity: '5 hours ago',
  },
  {
    id: 5,
    customerName: 'Adaobi Eze',
    currency: 'UGX',
    currencySymbol: 'USh',
    balance1: '130,000.00',
    balance2: '130,000.00',
    balance3: '130,000.00',
    status: 'Active',
    dateCreated: '2024-10-01',
    lastActivity: '1 hour ago',
  },
  {
    id: 6,
    customerName: 'Olumide Bakare',
    currency: 'CAD',
    currencySymbol: 'C$',
    balance1: '78,900.00',
    balance2: '78,900.00',
    balance3: '78,900.00',
    status: 'Inactive',
    dateCreated: '2024-10-03',
    lastActivity: '4 hours ago',
  },
  {
    id: 7,
    customerName: 'Bola Johnson',
    currency: 'AUD',
    currencySymbol: 'A$',
    balance1: '150,600.00',
    balance2: '150,600.00',
    balance3: '150,600.00',
    status: 'Active',
    dateCreated: '2024-10-04',
    lastActivity: '8 hours ago',
  },
  {
    id: 8,
    customerName: 'Emeka Uche',
    currency: 'JPY',
    currencySymbol: '¥',
    balance1: '90,000.00',
    balance2: '90,000.00',
    balance3: '90,000.00',
    status: 'Active',
    dateCreated: '2024-09-29',
    lastActivity: '7 hours ago',
  },
  {
    id: 9,
    customerName: 'Jide Ojo',
    currency: 'RWF',
    currencySymbol: 'RF',
    balance1: '99,999.00',
    balance2: '99,999.00',
    balance3: '99,999.00',
    status: 'Active',
    dateCreated: '2024-09-29',
    lastActivity: '5 hours ago',
  },
  {
    id: 10,
    customerName: 'Kamari Okoro',
    currency: 'USD',
    currencySymbol: '$',
    balance1: '99,999.00',
    balance2: '99,999.00',
    balance3: '99,999.00',
    status: 'Active',
    dateCreated: '2024-09-29',
    lastActivity: '5 hours ago',
  },
]

export const Route = createFileRoute('/api/wallets/')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info('Fetching wallets... @', request.url)

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300))

        return json({
          success: true,
          data: MOCK_WALLETS,
          total: MOCK_WALLETS.length,
          metrics: {
            totalWallets: MOCK_WALLETS.length,
            totalTransactions: '1,247', // Mock value
            uptime: '99.9%', // Mock value
          },
        })
      },
    },
  },
})
