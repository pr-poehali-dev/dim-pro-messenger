import Icon from '@/components/ui/icon';

type Tab = 'chats' | 'contacts' | 'search' | 'notifications' | 'profile' | 'settings';

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  notificationCount: number;
  unreadCount: number;
}

const navItems: { tab: Tab; icon: string; label: string }[] = [
  { tab: 'chats', icon: 'MessageCircle', label: 'Чаты' },
  { tab: 'contacts', icon: 'Users', label: 'Контакты' },
  { tab: 'search', icon: 'Search', label: 'Поиск' },
  { tab: 'notifications', icon: 'Bell', label: 'Уведомления' },
  { tab: 'profile', icon: 'User', label: 'Профиль' },
  { tab: 'settings', icon: 'Settings', label: 'Настройки' },
];

export default function Sidebar({ activeTab, onTabChange, notificationCount, unreadCount }: SidebarProps) {
  const getBadge = (tab: Tab) => {
    if (tab === 'chats') return unreadCount;
    if (tab === 'notifications') return notificationCount;
    return 0;
  };

  return (
    <aside className="w-16 h-full flex flex-col items-center py-6 bg-white border-r border-border gap-1">
      <div className="mb-6 w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
        <span className="text-white text-xs font-semibold">DP</span>
      </div>

      <div className="flex flex-col gap-1 flex-1">
        {navItems.map(({ tab, icon, label }) => {
          const badge = getBadge(tab);
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              title={label}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 ${
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <Icon name={icon} size={19} />
              {badge > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-white text-[10px] font-semibold flex items-center justify-center">
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
