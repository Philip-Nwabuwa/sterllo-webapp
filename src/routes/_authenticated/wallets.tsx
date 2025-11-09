import { createFileRoute } from '@tanstack/react-router';
import Wallets from '@/components/Wallets';

export const Route = createFileRoute('/_authenticated/wallets')({
  component: Wallets,
});
