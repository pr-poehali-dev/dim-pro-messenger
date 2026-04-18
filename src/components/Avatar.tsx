interface AvatarProps {
  initials: string;
  online?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

const colors = ['bg-blue-100 text-blue-600', 'bg-violet-100 text-violet-600', 'bg-emerald-100 text-emerald-600', 'bg-amber-100 text-amber-600', 'bg-rose-100 text-rose-600', 'bg-cyan-100 text-cyan-600'];

function getColor(initials: string) {
  const idx = (initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % colors.length;
  return colors[idx];
}

export default function Avatar({ initials, online, size = 'md' }: AvatarProps) {
  return (
    <div className="relative flex-shrink-0">
      <div className={`${sizeClasses[size]} ${getColor(initials)} rounded-full flex items-center justify-center font-medium`}>
        {initials}
      </div>
      {online !== undefined && (
        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${online ? 'bg-emerald-500' : 'bg-muted-foreground'}`} />
      )}
    </div>
  );
}
