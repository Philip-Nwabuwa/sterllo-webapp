import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

type TransactionStatus = 'Successful' | 'Pending' | 'Failed'

// Mock wallet details data - in production, this would come from a database
const MOCK_WALLET_DETAILS: Record<
  string,
  {
    id: string
    customerName: string
    email: string
    walletId: string
    walletType: string
    subWallets: Array<{
      id: string
      currency: string
      currencyCode: string
      balance: string
    }>
    transactions: Array<{
      service: string
      amount: string
      balance: string
      date: string
      time?: string
      referenceId?: string
      fee?: string
      openingBalance?: string
      status: TransactionStatus
    }>
  }
> = {
  '1': {
    id: '1',
    customerName: 'Tunde Afolabi',
    email: 'tundeafolabi@gmail.com',
    walletId: 'WB9X3K2ZL7A4FJ8R0TQ1V5E6MNDCYS',
    walletType: 'BAAS',
    subWallets: [
      {
        id: 'WLT-7890-0001',
        currency: '₦',
        currencyCode: 'NGN',
        balance: '300,750.00',
      },
      {
        id: 'WLT-7890-0002',
        currency: '£',
        currencyCode: 'GBP',
        balance: '40,000.456',
      },
      {
        id: 'WLT-7890-0003',
        currency: '$',
        currencyCode: 'USD',
        balance: '300,750.00',
      },
      {
        id: 'WLT-7890-0004',
        currency: '€',
        currencyCode: 'EUR',
        balance: '1,987,456.78',
      },
    ],
    transactions: [
      {
        service: 'Transfer',
        amount: '₦ 50,000.00',
        balance: '₦ 250,750.00',
        date: '2024-10-15',
        time: '14:30',
        referenceId: 'TXN123456789',
        fee: '₦ 100.00',
        openingBalance: '₦ 300,750.00',
        status: 'Successful',
      },
      {
        service: 'Deposit',
        amount: '₦ 100,000.00',
        balance: '₦ 300,750.00',
        date: '2024-10-14',
        time: '09:15',
        referenceId: 'TXN987654321',
        fee: '₦ 0.00',
        openingBalance: '₦ 200,750.00',
        status: 'Successful',
      },
      {
        service: 'Withdrawal',
        amount: '₦ 25,000.00',
        balance: '₦ 200,750.00',
        date: '2024-10-13',
        status: 'Pending',
      },
    ],
  },
  '2': {
    id: '2',
    customerName: 'Femi Ogunleye',
    email: 'femi.ogunleye@gmail.com',
    walletId: 'WB2A5C7D9E1F3G4H6J8K0L2M4N6P8Q',
    walletType: 'BAAS',
    subWallets: [
      {
        id: 'WLT-5678-0001',
        currency: 'GH₵',
        currencyCode: 'GHS',
        balance: '55,400.00',
      },
    ],
    transactions: [
      {
        service: 'Transfer',
        amount: 'GH₵ 5,000.00',
        balance: 'GH₵ 55,400.00',
        date: '2024-10-10',
        status: 'Successful',
      },
    ],
  },
}

export const Route = createFileRoute('/api/wallets/id')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        console.info('Fetching wallet details... @', request.url)

        const { id } = params

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 200))

        const wallet = MOCK_WALLET_DETAILS[id]

        if (!wallet) {
          return json(
            {
              success: false,
              error: 'Wallet not found',
            },
            { status: 404 }
          )
        }

        return json({
          success: true,
          data: wallet,
        })
      },
    },
  },
})
