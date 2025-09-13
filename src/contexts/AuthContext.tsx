import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock users for testing
  const mockUsers = [
    { id: '1', name: 'Admin User', email: 'admin@test.com', password: '123456', role: 'admin' as const },
    { id: '2', name: 'Editor User', email: 'editor@test.com', password: '123456', role: 'editor' as const },
    { id: '3', name: 'Viewer User', email: 'viewer@test.com', password: '123456', role: 'viewer' as const },
  ];

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('quizz_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('quizz_user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role: 'editor' as const
    };
    
    setUser(newUser);
    localStorage.setItem('quizz_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quizz_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};