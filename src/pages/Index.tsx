import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatsPanel from '@/components/ChatsPanel';
import ContactsPanel from '@/components/ContactsPanel';
import SearchPanel from '@/components/SearchPanel';
import NotificationsPanel from '@/components/NotificationsPanel';
import ProfilePanel from '@/components/ProfilePanel';
import SettingsPanel from '@/components/SettingsPanel';
import Auth from '@/pages/Auth';
import { chats, notifications } from '@/data/mockData';

type Tab = 'chats' | 'contacts' | 'search' | 'notifications' | 'profile' | 'settings';

export default function Index() {
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('chats');

  if (!authed) return <Auth onAuth={() => setAuthed(true)} />;

  const unreadCount = chats.reduce((sum, c) => sum + c.unread, 0);
  const notificationCount = notifications.filter((n) => !n.read).length;

  const renderPanel = () => {
    switch (activeTab) {
      case 'chats': return <ChatsPanel />;
      case 'contacts': return <ContactsPanel />;
      case 'search': return <SearchPanel />;
      case 'notifications': return <NotificationsPanel />;
      case 'profile': return <ProfilePanel />;
      case 'settings': return <SettingsPanel />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        notificationCount={notificationCount}
        unreadCount={unreadCount}
      />
      <main className="flex flex-1 min-w-0 h-full">
        {renderPanel()}
      </main>
    </div>
  );
}
