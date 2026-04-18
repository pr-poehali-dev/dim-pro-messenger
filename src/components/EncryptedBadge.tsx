import Icon from '@/components/ui/icon';

interface EncryptedBadgeProps {
  size?: 'sm' | 'md';
}

export default function EncryptedBadge({ size = 'sm' }: EncryptedBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-accent text-accent-foreground font-medium ${size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-1'}`}>
      <Icon name="Lock" size={size === 'sm' ? 9 : 11} />
      E2E
    </span>
  );
}
