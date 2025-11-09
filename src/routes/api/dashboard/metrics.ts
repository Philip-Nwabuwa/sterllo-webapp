import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/dashboard/metrics')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info('Fetching dashboard metrics... @', request.url)

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 200))

        return json({
          success: true,
          data: {
            metrics: {
              activeCustomers: {
                value: '1,247',
                change: '12%',
                changeType: 'up',
                changeText: 'Compared to last month',
              },
              totalWallets: {
                value: '3,456',
                change: '8%',
                changeType: 'up',
                changeText: 'Compared to last month',
              },
              transactionsToday: {
                value: '892',
                change: '5%',
                changeType: 'down',
                changeText: 'Compared to yesterday',
              },
              pendingDisputes: {
                value: '1,247',
              },
              apiUptime: {
                value: '99.98%',
              },
            },
            recentActivity: [
              {
                id: '1',
                type: 'wallet',
                title: 'Wallet #3456 created',
                subtitle: 'by AdminUser',
                time: '2 mins ago',
              },
              {
                id: '2',
                type: 'dispute_resolved',
                title: 'Dispute #789 resolved successfully',
                subtitle: 'by Support Team',
                time: '15 mins ago',
              },
              {
                id: '3',
                type: 'transfer',
                title: 'Transfer of ₦50,000 processed',
                subtitle: 'by System',
                time: '23 mins ago',
              },
              {
                id: '4',
                type: 'customer',
                title: 'New customer onboarded',
                subtitle: 'by Sales Team',
                time: '1 hour ago',
              },
              {
                id: '5',
                type: 'dispute_filed',
                title: 'New dispute filed for transaction #1234',
                subtitle: 'by Customer Support',
                time: '2 hours ago',
              },
              {
                id: '6',
                type: 'dispute_resolved',
                title: 'API integration test passed',
                subtitle: 'by DevOps',
                time: '4 hours ago',
              },
              {
                id: '7',
                type: 'wallet',
                title: 'Wallet #3445 balance updated',
                subtitle: 'by System',
                time: '5 hours ago',
              },
            ],
          },
        })
      },
    },
  },
})
