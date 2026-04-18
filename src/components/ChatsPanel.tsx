import { useState } from 'react';
import { chats, Chat, Message } from '@/data/mockData';
import Avatar from '@/components/Avatar';
import EncryptedBadge from '@/components/EncryptedBadge';
import Icon from '@/components/ui/icon';

export default function ChatsPanel() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Record<string, Message[]>>(
    Object.fromEntries(chats.map((c) => [c.id, c.messages]))
  );

  const send = () => {
    if (!input.trim() || !selectedChat) return;
    const msg: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      encrypted: selectedChat.encrypted,
    };
    setMessages((prev) => ({ ...prev, [selectedChat.id]: [...(prev[selectedChat.id] || []), msg] }));
    setInput('');
  };

  return (
    <div className="flex flex-1 h-full min-h-0">
      {/* Chat list */}
      <div className="w-72 flex flex-col border-r border-border bg-white">
        <div className="px-4 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Чаты</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary ${selectedChat?.id === chat.id ? 'bg-accent' : ''}`}
            >
              <Avatar initials={chat.avatar} online={chat.online} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-medium text-foreground truncate">{chat.name}</span>
                  <span className="text-[11px] text-muted-foreground flex-shrink-0">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs text-muted-foreground truncate">{chat.lastMessage}</span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {chat.encrypted && <EncryptedBadge />}
                    {chat.unread > 0 && (
                      <span className="w-4 h-4 rounded-full bg-primary text-white text-[10px] font-semibold flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      {selectedChat ? (
        <div className="flex flex-col flex-1 min-w-0 bg-white">
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-border flex items-center gap-3">
            <Avatar initials={selectedChat.avatar} online={selectedChat.online} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground text-sm">{selectedChat.name}</span>
                {selectedChat.encrypted && <EncryptedBadge size="md" />}
              </div>
              <span className="text-xs text-muted-foreground">{selectedChat.online ? 'Онлайн' : 'Не в сети'}</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center justify-center transition-colors">
                <Icon name="Phone" size={16} />
              </button>
              <button className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center justify-center transition-colors">
                <Icon name="Video" size={16} />
              </button>
              <button className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center justify-center transition-colors">
                <Icon name="MoreVertical" size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-2">
            {selectedChat.encrypted && (
              <div className="flex items-center justify-center mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                  <Icon name="Lock" size={11} />
                  Переписка защищена сквозным шифрованием
                </span>
              </div>
            )}
            {(messages[selectedChat.id] || []).map((msg) => (
              <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[65%] px-3.5 py-2 rounded-2xl text-sm ${msg.isOwn ? 'bg-primary text-white rounded-br-sm' : 'bg-secondary text-foreground rounded-bl-sm'}`}>
                  <p>{msg.text}</p>
                  <div className={`flex items-center justify-end gap-1 mt-1 ${msg.isOwn ? 'text-blue-200' : 'text-muted-foreground'}`}>
                    {msg.encrypted && <Icon name="Lock" size={9} />}
                    <span className="text-[10px]">{msg.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2">
              <button className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
                <Icon name="Paperclip" size={17} />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder={selectedChat.encrypted ? 'Зашифрованное сообщение...' : 'Написать сообщение...'}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center disabled:opacity-40 transition-opacity flex-shrink-0"
              >
                <Icon name="Send" size={14} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          Выберите чат
        </div>
      )}
    </div>
  );
}
