import React, { useState } from 'react';
import { Search, Trash2, Filter, CheckSquare, Square, AlertTriangle, Shield } from 'lucide-react';
import { MOCK_CONVERSATIONS } from '../constants';
import { Conversation, Message } from '../types';

const MessageCleaner: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(MOCK_CONVERSATIONS[0].id);
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const activeConversation = conversations.find(c => c.id === selectedConversation);

  const toggleMessageSelection = (msgId: string) => {
    const newSelected = new Set(selectedMessages);
    if (newSelected.has(msgId)) {
      newSelected.delete(msgId);
    } else {
      newSelected.add(msgId);
    }
    setSelectedMessages(newSelected);
  };

  const toggleSelectAll = () => {
    if (!activeConversation) return;
    const allIds = activeConversation.messages.map(m => m.id);
    const allSelected = allIds.every(id => selectedMessages.has(id));

    const newSelected = new Set(selectedMessages);
    if (allSelected) {
      allIds.forEach(id => newSelected.delete(id));
    } else {
      allIds.forEach(id => newSelected.add(id));
    }
    setSelectedMessages(newSelected);
  };

  const handleDeleteSelected = () => {
    if (selectedMessages.size === 0) return;
    
    setConversations(prev => prev.map(c => {
      if (c.id !== selectedConversation) return c;
      return {
        ...c,
        messages: c.messages.map(m => selectedMessages.has(m.id) ? { ...m, isDeleted: true } : m)
      };
    }));
    setSelectedMessages(new Set());
  };

  const handleNukeConversation = () => {
    if (!selectedConversation) return;
    setConversations(prev => prev.map(c => {
      if (c.id !== selectedConversation) return c;
      return {
        ...c,
        messages: c.messages.map(m => ({ ...m, isDeleted: true }))
      };
    }));
  };

  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col md:flex-row gap-6 animate-fade-in">
      {/* Conversation List */}
      <div className="w-full md:w-1/3 bg-canvas-800/50 rounded-2xl border border-canvas-700 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-canvas-700 space-y-3">
          <h2 className="text-lg font-semibold text-white">Conversations</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-canvas-400" size={18} />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full bg-canvas-900 text-white pl-10 pr-4 py-2 rounded-lg border border-canvas-700 focus:outline-none focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.filter(c => c.username.toLowerCase().includes(searchTerm.toLowerCase())).map(c => (
            <div 
              key={c.id}
              onClick={() => setSelectedConversation(c.id)}
              className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-canvas-700/50 transition-colors border-b border-canvas-800 last:border-0 ${selectedConversation === c.id ? 'bg-primary-500/10 border-l-2 border-l-primary-500' : ''}`}
            >
              <img src={c.avatar} alt={c.username} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white truncate">{c.username}</h3>
                <p className="text-sm text-canvas-400 truncate">{c.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 bg-canvas-800/50 rounded-2xl border border-canvas-700 flex flex-col overflow-hidden">
        {activeConversation ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-canvas-700 flex justify-between items-center bg-canvas-800/80 backdrop-blur">
              <div className="flex items-center gap-3">
                <img src={activeConversation.avatar} alt="" className="w-8 h-8 rounded-full" />
                <span className="font-semibold text-white">{activeConversation.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleSelectAll}
                  className="p-2 text-canvas-400 hover:text-white hover:bg-canvas-700 rounded-lg transition-colors"
                  title="Select All"
                >
                  <CheckSquare size={20} />
                </button>
                <button 
                  onClick={handleDeleteSelected}
                  disabled={selectedMessages.size === 0}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedMessages.size > 0 ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'text-canvas-600 cursor-not-allowed'}`}
                >
                  <Trash2 size={16} />
                  Delete ({selectedMessages.size})
                </button>
                <button 
                    onClick={handleNukeConversation}
                    className="ml-2 flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-500 transition-all shadow-lg shadow-red-900/20"
                >
                    <AlertTriangle size={16} />
                    Nuke All
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-canvas-900/30">
                {activeConversation.messages.length === 0 && (
                     <div className="text-center text-canvas-500 mt-10">No messages found.</div>
                )}
              {activeConversation.messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 ${msg.type === 'sent' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className="flex flex-col items-end gap-1">
                     <button onClick={() => toggleMessageSelection(msg.id)} className="text-canvas-500 hover:text-white">
                        {selectedMessages.has(msg.id) ? <CheckSquare size={16} className="text-primary-400" /> : <Square size={16} />}
                     </button>
                  </div>
                  <div 
                    className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                      msg.isDeleted 
                        ? 'bg-canvas-800 border border-dashed border-canvas-600 text-canvas-500 italic'
                        : msg.type === 'sent' 
                            ? 'bg-primary-600 text-white rounded-tr-none' 
                            : 'bg-canvas-700 text-white rounded-tl-none'
                    }`}
                  >
                    {msg.isDeleted ? 'This message has been securely removed.' : msg.content}
                  </div>
                  <span className="text-xs text-canvas-600 self-end mb-1">{msg.timestamp}</span>
                </div>
              ))}
            </div>
            
            {/* Disclaimer */}
            <div className="p-2 text-center bg-canvas-900/50 border-t border-canvas-800">
                <p className="text-xs text-canvas-500 flex items-center justify-center gap-2">
                    <Shield size={12} /> Local Simulation Mode: Actual deletion requires API connection.
                </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col text-canvas-500">
             <Filter size={48} className="mb-4 opacity-50" />
             <p>Select a conversation to manage messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCleaner;