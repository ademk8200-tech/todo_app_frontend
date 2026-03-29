import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Interfaces matching the frontend ones
export interface TodoList {
  id: string;
  userId: string;
  title: string;
  date: string;
  createdAt?: any;
}

export interface Todo {
  id: string;
  userId: string;
  listId: string;
  text: string;
  completed: boolean;
  timeRange?: string;
  date: string;
  createdAt?: any;
}

// -----------------------------------------------------
// Lists Operations
// -----------------------------------------------------

export const subscribeToLists = (userId: string, callback: (lists: TodoList[]) => void) => {
  const q = query(
    collection(db, 'lists'), 
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const listsData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as TodoList));
    callback(listsData);
  });
};

export const createList = async (userId: string, title: string) => {
  await addDoc(collection(db, 'lists'), {
    userId,
    title,
    date: new Date().toLocaleDateString(),
    createdAt: serverTimestamp()
  });
};

export const deleteList = async (listId: string) => {
  await deleteDoc(doc(db, 'lists', listId));
};


// -----------------------------------------------------
// Todos Operations 
// -----------------------------------------------------

export const subscribeToTodos = (userId: string, callback: (todos: Todo[]) => void) => {
  const q = query(
    collection(db, 'todos'), 
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const todosData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Todo));
    callback(todosData);
  });
};

export const createTodo = async (userId: string, todoData: Omit<Todo, 'id' | 'createdAt' | 'userId'>) => {
  await addDoc(collection(db, 'todos'), {
    ...todoData,
    userId,
    createdAt: serverTimestamp()
  });
};

export const toggleTodoCompleted = async (todoId: string, currentCompleted: boolean) => {
  const todoRef = doc(db, 'todos', todoId);
  await updateDoc(todoRef, {
    completed: !currentCompleted
  });
};

export const deleteTodo = async (todoId: string) => {
  await deleteDoc(doc(db, 'todos', todoId));
};
