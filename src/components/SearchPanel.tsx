import { useState } from 'react';
import { contacts, chats } from '@/data/mockData';
import Avatar from '@/components/Avatar';
import EncryptedBadge from '@/components/EncryptedBadge';
import Icon from '@/components/ui/icon';

export default function SearchPanel() {
  const [query, setQuery] = useState('');

  const q = query.toLowerCase().trim();

  const foundContacts = q ? contacts.filter((c) => c.name.toLowerCase().includes(q)) : [];
  const foundChats = q ? chats.filter((c) => c.name.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q)) : [];

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="font-semibold text-foreground mb-3">Поиск</h2>
        <div className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-2.5">
          <Icon name="Search" size={16} className="text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по чатам, контактам, сообщениям..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="X" size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {!q && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
            <Icon name="Search" size={40} />
            <p className="text-sm">Начните вводить запрос для поиска</p>
          </div>
        )}

        {q && foundContacts.length === 0 && foundChats.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
            <Icon name="SearchX" size={40} />
            <p className="text-sm">Ничего не найдено по запросу «{query}»</p>
          </div>
        )}

        {foundContacts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Контакты</h3>
            <div className="flex flex-col gap-1">
              {foundContacts.map((c) => (
                <div key={c.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition-colors cursor-pointer">
                  <Avatar initials={c.avatar} online={c.online} />
                  <div>
                    <div className="text-sm font-medium text-foreground">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {foundChats.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Чаты</h3>
            <div className="flex flex-col gap-1">
              {foundChats.map((c) => (
                <div key={c.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition-colors cursor-pointer">
                  <Avatar initials={c.avatar} online={c.online} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{c.name}</span>
                      {c.encrypted && <EncryptedBadge />}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{c.lastMessage}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">{c.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
