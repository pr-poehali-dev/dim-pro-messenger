export interface Message {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
  encrypted?: boolean;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  encrypted: boolean;
  messages: Message[];
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
  phone: string;
  email: string;
}

export interface Notification {
  id: string;
  type: 'message' | 'contact' | 'system';
  text: string;
  time: string;
  read: boolean;
  avatar?: string;
}

export const chats: Chat[] = [
  {
    id: '1',
    name: 'Анна Смирнова',
    avatar: 'АС',
    lastMessage: 'Окей, увидимся завтра!',
    time: '14:32',
    unread: 2,
    online: true,
    encrypted: true,
    messages: [
      { id: '1', text: 'Привет! Как дела?', time: '14:10', isOwn: false, encrypted: true },
      { id: '2', text: 'Всё отлично, спасибо! А у тебя?', time: '14:12', isOwn: true, encrypted: true },
      { id: '3', text: 'Тоже хорошо. Мы встречаемся завтра?', time: '14:28', isOwn: false, encrypted: true },
      { id: '4', text: 'Да, конечно! В 15:00 у кафе', time: '14:30', isOwn: true, encrypted: true },
      { id: '5', text: 'Окей, увидимся завтра!', time: '14:32', isOwn: false, encrypted: true },
    ],
  },
  {
    id: '2',
    name: 'Михаил Петров',
    avatar: 'МП',
    lastMessage: 'Документы отправил на почту',
    time: '13:15',
    unread: 0,
    online: false,
    encrypted: true,
    messages: [
      { id: '1', text: 'Нужны документы по проекту', time: '12:00', isOwn: true, encrypted: true },
      { id: '2', text: 'Подготовлю в течение часа', time: '12:05', isOwn: false, encrypted: true },
      { id: '3', text: 'Документы отправил на почту', time: '13:15', isOwn: false, encrypted: true },
    ],
  },
  {
    id: '3',
    name: 'Команда дизайна',
    avatar: 'КД',
    lastMessage: 'Новые макеты готовы к ревью',
    time: '11:48',
    unread: 5,
    online: true,
    encrypted: false,
    messages: [
      { id: '1', text: 'Всем привет! Начинаем работу над новым проектом', time: '09:00', isOwn: false },
      { id: '2', text: 'Отлично, когда встреча?', time: '09:15', isOwn: true },
      { id: '3', text: 'В 11:00 в Zoom', time: '09:16', isOwn: false },
      { id: '4', text: 'Новые макеты готовы к ревью', time: '11:48', isOwn: false },
    ],
  },
  {
    id: '4',
    name: 'Дарья Козлова',
    avatar: 'ДК',
    lastMessage: 'Спасибо за помощь!',
    time: 'Вчера',
    unread: 0,
    online: false,
    encrypted: true,
    messages: [
      { id: '1', text: 'Можешь помочь с задачей?', time: '16:00', isOwn: false, encrypted: true },
      { id: '2', text: 'Конечно, расскажи подробнее', time: '16:05', isOwn: true, encrypted: true },
      { id: '3', text: 'Спасибо за помощь!', time: '17:30', isOwn: false, encrypted: true },
    ],
  },
  {
    id: '5',
    name: 'Алексей Новиков',
    avatar: 'АН',
    lastMessage: 'Увидимся на конференции',
    time: 'Вчера',
    unread: 0,
    online: true,
    encrypted: false,
    messages: [
      { id: '1', text: 'Ты едешь на конференцию?', time: '10:00', isOwn: false },
      { id: '2', text: 'Да, уже забронировал билеты!', time: '10:10', isOwn: true },
      { id: '3', text: 'Увидимся на конференции', time: '10:12', isOwn: false },
    ],
  },
];

export const contacts: Contact[] = [
  { id: '1', name: 'Анна Смирнова', avatar: 'АС', status: 'Занята работой', online: true, phone: '+7 900 123-45-67', email: 'anna@mail.ru' },
  { id: '2', name: 'Алексей Новиков', avatar: 'АН', status: 'Онлайн', online: true, phone: '+7 900 234-56-78', email: 'alex@mail.ru' },
  { id: '3', name: 'Дарья Козлова', avatar: 'ДК', status: 'Была сегодня в 17:30', online: false, phone: '+7 900 345-67-89', email: 'dasha@mail.ru' },
  { id: '4', name: 'Михаил Петров', avatar: 'МП', status: 'Не беспокоить', online: false, phone: '+7 900 456-78-90', email: 'misha@mail.ru' },
  { id: '5', name: 'Елена Волкова', avatar: 'ЕВ', status: 'В дороге', online: true, phone: '+7 900 567-89-01', email: 'elena@mail.ru' },
  { id: '6', name: 'Сергей Морозов', avatar: 'СМ', status: 'Был вчера', online: false, phone: '+7 900 678-90-12', email: 'sergey@mail.ru' },
];

export const notifications: Notification[] = [
  { id: '1', type: 'message', text: 'Анна Смирнова: Окей, увидимся завтра!', time: '14:32', read: false, avatar: 'АС' },
  { id: '2', type: 'message', text: 'Команда дизайна: Новые макеты готовы к ревью', time: '11:48', read: false, avatar: 'КД' },
  { id: '3', type: 'contact', text: 'Елена Волкова добавила вас в контакты', time: '10:15', read: false, avatar: 'ЕВ' },
  { id: '4', type: 'system', text: 'DimanPro обновлён до версии 2.1. Новые функции безопасности', time: '09:00', read: true },
  { id: '5', type: 'message', text: 'Михаил Петров: Документы отправил на почту', time: 'Вчера', read: true, avatar: 'МП' },
  { id: '6', type: 'system', text: 'Ваш аккаунт защищён сквозным шифрованием', time: 'Вчера', read: true },
];
