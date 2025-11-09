import { createFileRoute } from '@tanstack/react-router';
import WelcomeBack from '@/components/WelcomeBack';

export const Route = createFileRoute('/login')({
  component: WelcomeBack,
});
