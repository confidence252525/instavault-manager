import { Conversation } from './types';

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    username: 'alex_design',
    avatar: 'https://picsum.photos/200/200',
    lastMessage: 'Hey, did you get the files?',
    messages: [
      { id: 'm1', sender: 'alex_design', content: 'Hey, did you get the files?', timestamp: '10:30 AM', isDeleted: false, type: 'received' },
      { id: 'm2', sender: 'me', content: 'Yes, downloading now.', timestamp: '10:32 AM', isDeleted: false, type: 'sent' },
      { id: 'm3', sender: 'alex_design', content: 'Great, let me know if any are missing.', timestamp: '10:33 AM', isDeleted: false, type: 'received' },
      { id: 'm4', sender: 'me', content: 'Will do.', timestamp: '10:35 AM', isDeleted: true, type: 'sent' }, // Already deleted
    ]
  },
  {
    id: 'c2',
    username: 'sarah_travels',
    avatar: 'https://picsum.photos/201/201',
    lastMessage: 'That trip looked amazing!',
    messages: [
      { id: 'm5', sender: 'sarah_travels', content: 'Just got back from Bali!', timestamp: 'Yesterday', isDeleted: false, type: 'received' },
      { id: 'm6', sender: 'me', content: 'That trip looked amazing!', timestamp: 'Yesterday', isDeleted: false, type: 'sent' },
    ]
  },
  {
    id: 'c3',
    username: 'crypto_king_99',
    avatar: 'https://picsum.photos/202/202',
    lastMessage: 'Click this link for free BTC',
    messages: [
      { id: 'm7', sender: 'crypto_king_99', content: 'Click this link for free BTC', timestamp: '2 days ago', isDeleted: false, type: 'received' },
    ]
  }
];

export const NAV_ITEMS = [
  { id: 'DASHBOARD', label: 'Overview', icon: 'LayoutDashboard' },
  { id: 'MESSAGES', label: 'Message Cleaner', icon: 'Eraser' },
  { id: 'BACKUP_ANALYSIS', label: 'Backup Analysis', icon: 'FileText' },
  { id: 'PACKAGES', label: 'Premium Plans', icon: 'CreditCard' },
];