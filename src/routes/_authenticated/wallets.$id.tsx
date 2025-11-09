import { createFileRoute } from '@tanstack/react-router';
import WalletDetail from '@/components/WalletDetail';

export const Route = createFileRoute('/_authenticated/wallets/$id')({
  component: WalletDetail,
});
