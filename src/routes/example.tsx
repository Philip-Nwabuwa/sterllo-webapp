import { createFileRoute } from '@tanstack/react-router';
import ProxyExample from '@/components/ProxyExample';

export const Route = createFileRoute('/example')({
  component: ProxyExample,
});
