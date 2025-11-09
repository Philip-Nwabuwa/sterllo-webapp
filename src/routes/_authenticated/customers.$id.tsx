import { createFileRoute } from '@tanstack/react-router';
import CustomerDetail from '@/components/CustomerDetail';

export const Route = createFileRoute('/_authenticated/customers/$id')({
  component: CustomerDetail,
});
