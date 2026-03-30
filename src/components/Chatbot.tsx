import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot } from 'lucide-react';
import { studentData } from '../data/mockData';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm your attendance assistant. Ask me anything! 👋", sender: 'bot' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "How many can I bunk?",
    "My risk level?",
    "Low attendance subjects",
    "Improvement tips"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const processBotResponse = (userText: string) => {
    setTimeout(() => {
      let botResponse = "I can help you analyze your attendance. Select one of the quick options below!";
      const lowerInput = userText.toLowerCase();

      if (lowerInput.includes('how many')) {
        botResponse = `Based on your current ${studentData.overallAttendance}% overall attendance, you can safely miss about 4 more classes in total before hitting the 75% threshold. CS403 needs immediate attention! 🚨`;
      } else if (lowerInput.includes('risk level')) {
        botResponse = "🟡 Moderate Risk. 2 subjects are below 75%: CS403 at 68% and CS406 at 71%. Prioritize attending these classes.";
      } else if (lowerInput.includes('low attendance')) {
        botResponse = "Your low attendance subjects are:\n⚠️ CS403 - Computer Organization: 68% (Need 10 more classes)\n⚠️ CS406 - Internet of Things: 71% (Need 3 more classes)";
      } else if (lowerInput.includes('improvement')) {
        botResponse = "Top tips for you:\n1. Never skip CS403 — attend every class\n2. Use the Bunk Planner before skipping\n3. Submit absence requests on time\n4. Set attendance reminders each week 📱";
      }

      setMessages(prev => [...prev, { id: Date.now(), text: botResponse, sender: 'bot' }]);
    }, 600);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newMessage: Message = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInput('');

    processBotResponse(text);
  };

  return (
    <>
      {/* Floating Button container mapping to the robot head */}
      <div 
        className={`fixed bottom-28 lg:bottom-8 right-5 lg:right-8 z-50 flex flex-col items-center transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="w-[60px] h-[60px] rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center relative border border-white/20"
        >
          <span className="text-3xl">🤖</span>
        </button>
      </div>

      {/* Chat Window Base: Light UI matching main portal */}
      <div 
        className={`fixed bottom-[110px] lg:bottom-8 right-4 lg:right-8 w-[92vw] lg:w-[380px] max-w-[400px] bg-white rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col z-50 transition-all duration-500 origin-bottom-right overflow-hidden ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-5 text-white flex justify-between items-start">
          <div>
            <h3 className="font-display font-bold text-xl tracking-tight leading-tight">SmartBunk Assistant</h3>
            <p className="text-white/90 text-sm font-medium mt-0.5">Always here to help!</p>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-5 overflow-y-auto h-[380px] bg-slate-50 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`p-4 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-white rounded-[20px] rounded-br-sm shadow-sm' 
                    : 'bg-white text-slate-700 border border-slate-200 rounded-[20px] rounded-bl-sm font-medium shadow-sm'
                }`}
                style={{ maxWidth: '85%' }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Fixed Footer: Suggested Actions + Input Bar */}
        <div className="bg-white border-t border-slate-100 p-4">
          
          {/* Persistent Action Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="text-xs font-bold text-slate-600 bg-slate-50 hover:bg-primary/10 hover:text-primary hover:border-primary/20 border border-slate-200 transition-colors px-3 py-1.5 rounded-full"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Form Input */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
            className="flex items-center gap-3 relative"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 font-bold border border-slate-200 rounded-[14px] pl-4 pr-12 py-3.5 focus:outline-none focus:border-primary transition-all focus:ring-1 focus:ring-primary shadow-inner"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute right-1.5 top-1.5 bottom-1.5 w-10 bg-primary text-white rounded-[10px] hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center shadow-md shadow-primary/20"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </form>

        </div>
      </div>
    </>
  );
};
