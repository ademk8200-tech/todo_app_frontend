import { useState, useEffect } from 'react';
import { Check, Plus, Trash2, Calendar, ArrowLeft, ListTodo, PlusCircle, Clock, LogOut, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { TodoList, Todo } from '../services/todoService';
import { 
  subscribeToLists, createList, deleteList, 
  subscribeToTodos, createTodo, deleteTodo as deleteTodoService, toggleTodoCompleted
} from '../services/todoService';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function TodoPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // State for Multiple Lists
  const [lists, setLists] = useState<TodoList[]>([]);
  const [activeListId, setActiveListId] = useState<string>('');

  // State for Todos
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const [inputValue, setInputValue] = useState('');
  const [timeValue, setTimeValue] = useState('');

  // Setup Firestore Realtime Listeners
  useEffect(() => {
    if (!user) return;

    const unsubLists = subscribeToLists(user.uid, (fetchedLists) => {
      setLists(fetchedLists);
      // If we got lists but no active list is selected, auto-select the first one
      if (fetchedLists.length > 0) {
        setActiveListId(prev => prev ? prev : fetchedLists[0].id);
      }
    });

    const unsubTodos = subscribeToTodos(user.uid, (fetchedTodos) => {
      setTodos(fetchedTodos);
    });

    return () => {
      unsubLists();
      unsubTodos();
    };
  }, [user]);

  // Derived Values
  const activeList = lists.find(l => l.id === activeListId);
  const activeTodos = todos.filter(t => t.listId === activeListId);

  // List Actions
  const handleCreateList = async () => {
    if (!user) return;
    const title = window.prompt("Yeni liste adını girin:", "Yeni Liste");
    if (!title || !title.trim()) return;
    
    await createList(user.uid, title.trim());
  };

  const handleDeleteList = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Bu listeyi silmek istediğinize emin misiniz?")) {
      await deleteList(id);
      
      const remainingLists = lists.filter(l => l.id !== id);
      if (activeListId === id) {
        setActiveListId(remainingLists.length > 0 ? remainingLists[0].id : '');
      }
    }
  };
  
  // Todo Actions
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !activeListId || !user) return;
    
    try {
      await createTodo(user.uid, {
        listId: activeListId,
        text: inputValue.trim(),
        completed: false,
        timeRange: timeValue.trim() || undefined,
        date: new Date().toLocaleDateString()
      });
      setInputValue('');
      setTimeValue('');
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    await toggleTodoCompleted(id, completed);
  };

  const deleteTodo = async (id: string) => {
    await deleteTodoService(id);
  };

  const handleLogout = async () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      await signOut(auth);
      navigate('/');
    }
  };


  return (
    <div className="min-h-screen bg-[#141414] flex flex-col md:flex-row font-sans">
      
      {/* Sidebar - Past Todo Lists */}
      <div className="w-full md:w-80 bg-wine-950 border-b md:border-b-0 md:border-r border-white/10 flex flex-col h-auto md:h-screen shadow-2xl z-10">
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10 flex flex-col gap-4 bg-black/20">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Ana Sayfa
            </button>
            <button 
              onClick={handleLogout}
              className="text-white/40 hover:text-red-400 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              title="Çıkış Yap"
            >
              <LogOut className="w-4 h-4" />
              Çıkış
            </button>
          </div>

          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500">
              <UserIcon className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-white text-sm font-medium truncate">
                {user?.displayName || user?.email?.split('@')[0] || 'Kullanıcı'}
              </span>
              <span className="text-white/30 text-[10px] truncate">{user?.email}</span>
            </div>
          </div>
        </div>
        
        {/* Lists Header */}
        <div className="p-6 pb-4 flex items-center justify-between mt-2">
          <h2 className="text-xl font-serif text-gold-400">Listelerim</h2>
          <button 
            onClick={handleCreateList}
            className="p-2 text-gold-500 bg-gold-500/10 hover:bg-gold-500/20 rounded-lg transition-colors shadow-sm"
            title="Yeni Liste Oluştur"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Lists Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-6 space-y-2">
          {lists.map(list => {
            const listTodoCount = todos.filter(t => t.listId === list.id && !t.completed).length;
            
            return (
              <div 
                key={list.id}
                onClick={() => setActiveListId(list.id)}
                className={`w-full text-left p-4 rounded-xl cursor-pointer transition-all flex items-center gap-3 group border ${
                  activeListId === list.id 
                    ? 'bg-gold-500/10 border-gold-500/30 shadow-md' 
                    : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10'
                }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  activeListId === list.id ? 'bg-gold-500/20 text-gold-400' : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/60'
                }`}>
                  <ListTodo className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium truncate ${activeListId === list.id ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                    {list.title}
                  </h3>
                  <p className="text-xs text-white/30 mt-1">{list.date}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  {listTodoCount > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 bg-gold-500/20 text-gold-400 text-[10px] font-bold rounded-full">
                      {listTodoCount}
                    </span>
                  )}
                  <button
                    onClick={(e) => handleDeleteList(list.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-all"
                    title="Listeyi Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
          
          {lists.length === 0 && (
            <div className="text-center p-8 text-white/40 mt-4 border border-white/5 rounded-xl border-dashed">
              <p className="text-sm">Hiç liste yok.</p>
              <button onClick={handleCreateList} className="text-gold-500 text-sm mt-2 hover:underline">
                Yeni oluştur
              </button>
            </div>
          )}
        </div>

        {/* Branding Footer */}
        <div className="p-6 border-t border-white/10 bg-black/20 text-center opacity-70">
           <p className="text-xs text-white/40 tracking-wider">GÖREVYAP V2.0</p>
        </div>
      </div>

      {/* Main Content - Active Todo List */}
      <div className="flex-1 flex flex-col h-[calc(100vh-theme(spacing.64))] md:h-screen bg-[#141414] overflow-hidden relative">
        {activeListId && activeList ? (
          <div className="h-full flex flex-col animate-fade-in relative z-0">
            
            {/* Main Header */}
            <div className="p-8 md:p-12 border-b border-white/10 bg-wine-900/60 flex items-end justify-between backdrop-blur-sm z-10 transition-colors">
              <div className="flex-1 min-w-0 pr-4">
                <h1 className="text-4xl md:text-5xl font-serif text-white mb-3 tracking-tight truncate filter drop-shadow-md">
                  {activeList.title}
                </h1>
                <p className="text-gold-500/80 tracking-wide text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {activeList.date} &nbsp;•&nbsp; Toplam {activeTodos.length} Görev
                </p>
              </div>
              
              <div className="text-right hidden sm:block shrink-0 pl-6 border-l border-white/10">
                 <div className="text-5xl font-serif text-white drop-shadow-sm">
                   {activeTodos.filter(t => !t.completed).length}
                 </div>
                 <div className="text-xs text-gold-500 font-bold uppercase tracking-widest mt-2">Kalan Görev</div>
              </div>
            </div>

            {/* Main Input Form */}
            <form onSubmit={addTodo} className="px-8 md:px-12 py-4 border-b border-white/5 bg-black/40 z-10">
               <div className="flex items-center max-w-4xl mx-auto gap-3">
                 <input
                   type="text"
                   value={timeValue}
                   onChange={(e) => setTimeValue(e.target.value)}
                   placeholder="Saat (Örn: 14:00 - 15:30)"
                   className="w-32 lg:w-44 bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/80 transition-all font-sans shadow-inner hidden sm:block"
                 />
                 <input
                   type="text"
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   placeholder="Yeni görev ekle ve enter'a bas..."
                   className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-lg py-3 px-4 lg:px-5 text-base text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/80 transition-all font-sans shadow-inner"
                 />
                 <button 
                   type="submit"
                   disabled={!inputValue.trim()}
                   className="flex-shrink-0 p-3 bg-gold-500 text-wine-950 rounded-lg hover:bg-gold-400 disabled:opacity-50 disabled:hover:bg-gold-500 transition-colors shadow-lg"
                 >
                   <Plus className="w-5 h-5 font-bold" />
                 </button>
               </div>
            </form>

            {/* Main Todo List Area - White Notebook Layout */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 border-l border-white/5 md:p-12 bg-[#1a1a1a] flex justify-center items-start">
               <div 
                 className="w-full max-w-4xl min-h-[60vh] relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-r-2xl rounded-l-md overflow-hidden bg-[#fdfbf7]"
                 style={{
                   backgroundImage: 'repeating-linear-gradient(transparent, transparent 47px, #e2e8f0 47px, #e2e8f0 48px)',
                   backgroundAttachment: 'local'
                 }}
               >
                 {/* Left Margin Red Lines */}
                 <div className="absolute top-0 bottom-0 left-12 md:left-16 w-0.5 bg-red-400/30 z-0"></div>
                 <div className="absolute top-0 bottom-0 left-[52px] md:left-[68px] w-px bg-red-400/20 z-0"></div>

                 {/* Ring Binding holes */}
                 <div className="absolute top-0 bottom-0 left-2 w-4 flex flex-col justify-evenly z-0 py-8">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-3.5 h-3.5 rounded-full bg-[#141414] shadow-inner opacity-90 mx-auto" />
                    ))}
                 </div>

                 {/* Notebook Content Overlay */}
                 <div className="relative z-10 pt-6 pl-20 md:pl-28 pr-6 md:pr-12 pb-16 min-h-[60vh]">
                   {activeTodos.length === 0 ? (
                     <div className="mt-16 flex flex-col items-center justify-center text-slate-400">
                       <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6 shadow-sm border border-slate-200">
                          <ListTodo className="w-8 h-8 opacity-40 text-slate-600" />
                       </div>
                       <p className="text-2xl font-serif mb-2 text-slate-700 font-medium">Bu listede henüz görev yok.</p>
                       <p className="text-slate-500">Yukarıdaki formdan yeni görevler ekleyebilirsiniz.</p>
                     </div>
                   ) : (
                     <ul className="space-y-4">
                       {activeTodos.map((todo) => (
                         <li 
                           key={todo.id}
                           className={`group flex items-center justify-between p-4 md:p-5 rounded-xl border transition-all duration-300 ${
                             todo.completed 
                               ? 'bg-slate-50 border-slate-200 opacity-60 shadow-sm' 
                               : 'bg-white border-slate-200 hover:border-gold-400 shadow-md hover:shadow-lg'
                           }`}
                         >
                           <div className="flex items-center gap-4 md:gap-5 flex-1 overflow-hidden cursor-pointer" onClick={() => toggleTodo(todo.id, todo.completed)}>
                             <button
                               className={`flex-shrink-0 w-7 h-7 rounded-sm border-2 flex items-center justify-center transition-all duration-300 ${
                                 todo.completed 
                                   ? 'bg-emerald-500 border-emerald-500 text-white scale-100' 
                                   : 'border-slate-300 group-hover:border-gold-500 scale-110'
                               }`}
                             >
                               {todo.completed && <Check className="w-4 h-4 font-bold" />}
                             </button>
                             
                             <div className="flex flex-col min-w-0 flex-1">
                               <span className={`text-lg transition-all duration-300 ${
                                 todo.completed ? 'text-slate-400 line-through' : 'text-slate-800 font-medium'
                               }`}>
                                 {todo.text}
                               </span>
                             </div>
                           </div>

                           <div className="flex items-center gap-4 ml-4">
                             {todo.timeRange && (
                               <span className={`text-xs font-mono px-2 py-1 rounded hidden sm:flex items-center gap-1.5 transition-all duration-300 ${
                                 todo.completed ? 'text-slate-400 bg-slate-100' : 'text-amber-700 bg-amber-50 font-medium border border-amber-100'
                               }`}>
                                 <Clock className="w-3.5 h-3.5" />
                                 {todo.timeRange}
                               </span>
                             )}
                             <button
                               onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}
                               className="flex-shrink-0 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                               title="Görevi Sil"
                             >
                               <Trash2 className="w-5 h-5" />
                             </button>
                           </div>
                         </li>
                       ))}
                     </ul>
                   )}
                 </div>
               </div>
            </div>
            
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-white/30 bg-wine-900/10">
             <ListTodo className="w-20 h-20 mb-6 opacity-20" />
             <p className="text-2xl font-serif">Hiçbir liste seçilmedi.</p>
             <p className="text-white/40 mt-2">Soldaki panelden bir liste seçin veya yeni liste oluşturun.</p>
          </div>
        )}
      </div>
      
    </div>
  );
}
