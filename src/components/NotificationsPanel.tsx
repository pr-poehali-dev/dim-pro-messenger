import { useState } from 'react';
import { notifications as initialNotifications } from '@/data/mockData';
import Avatar from '@/components/Avatar';
import Icon from '@/components/ui/icon';

export default function NotificationsPanel() {
  const [notifs, setNotifs] = useState(initialNotifications);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  const iconMap = { message: 'MessageCircle', contact: 'UserPlus', system: 'Shield' };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-foreground">Уведомления</h2>
          {unreadCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] font-semibold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs text-primary hover:text-primary/70 transition-colors font-medium">
            Прочитать все
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {notifs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
            <Icon name="BellOff" size={40} />
            <p className="text-sm">Нет уведомлений</p>
          </div>
        ) : (
          notifs.map((n) => (
            <button
              key={n.id}
              onClick={() => markRead(n.id)}
              className={`w-full flex items-start gap-3 px-6 py-4 text-left border-b border-border transition-colors hover:bg-secondary ${!n.read ? 'bg-accent/40' : ''}`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {n.avatar ? (
                  <Avatar initials={n.avatar} size="sm" />
                ) : (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${n.type === 'system' ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                    <Icon name={iconMap[n.type]} size={15} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!n.read ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{n.text}</p>
                <span className="text-xs text-muted-foreground">{n.time}</span>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
