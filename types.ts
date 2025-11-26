export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isDeleted: boolean; // Simulated deleted status
  type: 'received' | 'sent';
}

export interface Conversation {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  messages: Message[];
}

export interface AnalysisResult {
  summary: string;
  sentiment: string;
  topics: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface Product {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  tier: 'free' | 'pro' | 'ultimate';
}

export interface PurchaseResult {
  success: boolean;
  message: string;
  transactionId?: string;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  MESSAGES = 'MESSAGES',
  BACKUP_ANALYSIS = 'BACKUP_ANALYSIS',
  PACKAGES = 'PACKAGES',
  SETTINGS = 'SETTINGS',
  PROFILE = 'PROFILE',
  PRIVACY = 'PRIVACY',
}
