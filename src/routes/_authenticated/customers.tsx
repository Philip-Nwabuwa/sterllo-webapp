import { createFileRoute } from '@tanstack/react-router';
import Customers from '@/components/Customers';

export const Route = createFileRoute('/_authenticated/customers')({
  component: Customers,
});
