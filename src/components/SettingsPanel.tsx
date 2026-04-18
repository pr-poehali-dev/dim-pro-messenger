import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface ToggleProps {
  value: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ value, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-10 h-5.5 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-border'}`}
      style={{ height: '22px' }}
    >
      <span className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} style={{ width: '18px', height: '18px' }} />
    </button>
  );
}

interface SettingSection {
  title: string;
  icon: string;
  items: { label: string; description?: string; type: 'toggle' | 'action'; key?: string; danger?: boolean }[];
}

const sections: SettingSection[] = [
  {
    title: 'Конфиденциальность',
    icon: 'Shield',
    items: [
      { label: 'Сквозное шифрование', description: 'Шифровать все личные сообщения', type: 'toggle', key: 'e2e' },
      { label: 'Сообщения с таймером', description: 'Автоматически удалять сообщения', type: 'toggle', key: 'timer' },
      { label: 'Скрыть время посещения', description: 'Не показывать время последнего визита', type: 'toggle', key: 'hideTime' },
    ],
  },
  {
    title: 'Уведомления',
    icon: 'Bell',
    items: [
      { label: 'Push-уведомления', description: 'Получать уведомления о сообщениях', type: 'toggle', key: 'push' },
      { label: 'Звук сообщений', description: 'Воспроизводить звук при получении', type: 'toggle', key: 'sound' },
      { label: 'Уведомления в группах', type: 'toggle', key: 'groups' },
    ],
  },
  {
    title: 'Внешний вид',
    icon: 'Palette',
    items: [
      { label: 'Тёмная тема', description: 'Переключить на тёмный интерфейс', type: 'toggle', key: 'dark' },
      { label: 'Компактный режим', description: 'Уменьшить отступы в списке чатов', type: 'toggle', key: 'compact' },
    ],
  },
  {
    title: 'Аккаунт',
    icon: 'User',
    items: [
      { label: 'Изменить пароль', type: 'action' },
      { label: 'Двухфакторная аутентификация', type: 'action' },
      { label: 'Удалить аккаунт', type: 'action', danger: true },
    ],
  },
];

export default function SettingsPanel() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    e2e: true,
    timer: false,
    hideTime: false,
    push: true,
    sound: true,
    groups: false,
    dark: false,
    compact: false,
  });

  const set = (key: string, val: boolean) => setToggles((p) => ({ ...p, [key]: val }));

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="font-semibold text-foreground">Настройки</h2>
      </div>

      <div className="px-6 py-4 flex flex-col gap-5 max-w-lg">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-2 mb-2">
              <Icon name={section.icon} size={15} className="text-muted-foreground" />
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{section.title}</h3>
            </div>
            <div className="border border-border rounded-xl divide-y divide-border">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${item.danger ? 'text-destructive' : 'text-foreground'}`}>{item.label}</div>
                    {item.description && <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>}
                  </div>
                  {item.type === 'toggle' && item.key ? (
                    <Toggle value={toggles[item.key]} onChange={(v) => set(item.key!, v)} />
                  ) : (
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Icon name="ChevronRight" size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground">DimanPro v2.1.0</p>
          <p className="text-xs text-muted-foreground mt-0.5">Защищено сквозным шифрованием</p>
        </div>
      </div>
    </div>
  );
}
