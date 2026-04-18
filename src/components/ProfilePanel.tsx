import { useState } from 'react';
import Avatar from '@/components/Avatar';
import Icon from '@/components/ui/icon';

export default function ProfilePanel() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Дмитрий Про');
  const [status, setStatus] = useState('На связи');
  const [phone, setPhone] = useState('+7 900 000-00-00');
  const [email, setEmail] = useState('diman@pro.ru');

  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Профиль</h2>
        <button
          onClick={() => setEditing(!editing)}
          className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/70 transition-colors font-medium"
        >
          <Icon name={editing ? 'Check' : 'Pencil'} size={14} />
          {editing ? 'Сохранить' : 'Редактировать'}
        </button>
      </div>

      <div className="px-6 py-8 flex flex-col items-center gap-4">
        <div className="relative">
          <Avatar initials={initials} size="lg" online={true} />
          {editing && (
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
              <Icon name="Camera" size={12} />
            </button>
          )}
        </div>

        {editing ? (
          <div className="flex flex-col gap-2 w-full max-w-sm text-center">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-center text-lg font-semibold text-foreground bg-secondary rounded-lg px-3 py-1.5 outline-none border border-transparent focus:border-primary"
            />
            <input
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="text-center text-sm text-muted-foreground bg-secondary rounded-lg px-3 py-1.5 outline-none border border-transparent focus:border-primary"
            />
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{status}</p>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
          <Icon name="ShieldCheck" size={13} />
          Аккаунт защищён сквозным шифрованием
        </div>
      </div>

      <div className="px-6 pb-6 max-w-md mx-auto w-full">
        <div className="border border-border rounded-xl divide-y divide-border">
          {[
            { icon: 'Phone', label: 'Телефон', value: phone, setter: setPhone },
            { icon: 'Mail', label: 'Email', value: email, setter: setEmail },
          ].map(({ icon, label, value, setter }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-3">
              <Icon name={icon} size={16} className="text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground">{label}</div>
                {editing ? (
                  <input
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className="text-sm text-foreground bg-secondary rounded px-2 py-0.5 outline-none border border-transparent focus:border-primary w-full mt-0.5"
                  />
                ) : (
                  <div className="text-sm text-foreground">{value}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 border border-border rounded-xl divide-y divide-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <Icon name="Hash" size={16} className="text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">ID пользователя</div>
              <div className="text-sm text-foreground font-mono">@dimanpro</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">В DimanPro с</div>
              <div className="text-sm text-foreground">Апрель 2024</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
