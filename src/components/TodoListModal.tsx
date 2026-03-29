import { useState, useEffect } from 'react';
import { X, Check, Plus, Trash2, Calendar } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  date: string;
}

export function TodoListModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('gorevyap_todos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      { id: '1', text: 'GörevYap platformuna giriş yap', completed: true, date: new Date().toLocaleDateString() },
      { id: '2', text: 'İlk görevimi oluştur', completed: false, date: new Date().toLocaleDateString() },
      { id: '3', text: 'Takım arkadaşlarımı davet et', completed: false, date: new Date().toLocaleDateString() },
    ];
  });
  
  const [inputValue, setInputValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem('gorevyap_todos', JSON.stringify(todos));
  }, [todos]);

  if (!isOpen && !isVisible) return null;

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setTodos([
      {
        id: Date.now().toString(),
        text: inputValue.trim(),
        completed: false,
        date: new Date().toLocaleDateString()
      },
      ...todos
    ]);
    setInputValue('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className={`relative w-full max-w-lg mx-4 bg-wine-900 border border-wine-800 shadow-2xl rounded-xl overflow-hidden transition-all duration-500 ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-wine-800 to-wine-900">
          <div>
            <h2 className="text-2xl font-serif text-gold-400">Görevlerim</h2>
            <p className="text-sm text-white/50 mt-1">Bugün yapılması gerekenler</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={addTodo} className="p-6 pb-2 border-b border-white/5 bg-wine-900/50">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Yeni bir görev ekle..."
              className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-4 pr-12 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-sans"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 p-2 text-gold-400 hover:text-gold-300 disabled:opacity-50 disabled:hover:text-gold-400 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Todo List */}
        <div className="p-6 pt-4 max-h-[50vh] overflow-y-auto custom-scrollbar">
          {todos.length === 0 ? (
            <div className="text-center py-8 text-white/40">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Henüz hiç görev yok.</p>
              <p className="text-sm">Yeni bir görev ekleyerek başlayın.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li 
                  key={todo.id}
                  className={`group flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                    todo.completed 
                      ? 'bg-black/20 border-white/5 opacity-60' 
                      : 'bg-wine-800/40 border-gold-500/20 hover:border-gold-500/40 hover:bg-wine-800/60 shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1 overflow-hidden">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        todo.completed 
                          ? 'bg-gold-500 border-gold-500 text-wine-900' 
                          : 'border-white/20 group-hover:border-gold-500/50'
                      }`}
                    >
                      {todo.completed && <Check className="w-3.5 h-3.5" />}
                    </button>
                    
                    <div className="flex flex-col min-w-0">
                      <span className={`text-sm md:text-base truncate transition-all ${
                        todo.completed ? 'text-white/40 line-through' : 'text-white/90'
                      }`}>
                        {todo.text}
                      </span>
                      <span className="text-[10px] text-white/30">{todo.date}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="flex-shrink-0 ml-4 p-2 text-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-md opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Footer info */}
        <div className="p-4 text-center border-t border-white/10 bg-wine-900/80">
          <p className="text-xs text-white/30">GörevYap ile verimliliğinizi artırın. Verileriniz tarayıcınızda kaydedilir.</p>
        </div>
      </div>
    </div>
  );
}
