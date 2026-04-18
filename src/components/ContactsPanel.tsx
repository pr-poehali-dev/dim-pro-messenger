import { useState } from 'react';
import { contacts, Contact } from '@/data/mockData';
import Avatar from '@/components/Avatar';
import Icon from '@/components/ui/icon';

export default function ContactsPanel() {
  const [selected, setSelected] = useState<Contact | null>(null);
  const [search, setSearch] = useState('');

  const filtered = contacts.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const grouped = filtered.reduce<Record<string, Contact[]>>((acc, c) => {
    const letter = c.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(c);
    return acc;
  }, {});

  return (
    <div className="flex flex-1 h-full min-h-0">
      <div className="w-72 flex flex-col border-r border-border bg-white">
        <div className="px-4 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground mb-3">Контакты</h2>
          <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
            <Icon name="Search" size={14} className="text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск контактов"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {Object.entries(grouped).sort().map(([letter, group]) => (
            <div key={letter}>
              <div className="px-4 py-1.5 text-xs font-semibold text-muted-foreground bg-secondary/50">{letter}</div>
              {group.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelected(contact)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary transition-colors ${selected?.id === contact.id ? 'bg-accent' : ''}`}
                >
                  <Avatar initials={contact.avatar} online={contact.online} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{contact.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{contact.status}</div>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        {selected ? (
          <div className="flex flex-col items-center pt-12 px-8 gap-4">
            <Avatar initials={selected.avatar} online={selected.online} size="lg" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground">{selected.name}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{selected.status}</p>
            </div>
            <div className="flex gap-2 mt-2">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                <Icon name="MessageCircle" size={15} />
                Написать
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-foreground text-sm font-medium hover:bg-border transition-colors">
                <Icon name="Phone" size={15} />
                Позвонить
              </button>
            </div>
            <div className="w-full max-w-sm mt-4 border border-border rounded-xl divide-y divide-border">
              <div className="flex items-center gap-3 px-4 py-3">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Телефон</div>
                  <div className="text-sm text-foreground">{selected.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="text-sm text-foreground">{selected.email}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
            Выберите контакт
          </div>
        )}
      </div>
    </div>
  );
}
