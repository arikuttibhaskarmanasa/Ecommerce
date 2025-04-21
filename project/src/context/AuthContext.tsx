import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration purposes
const MOCK_USERS = [
  {
    id: 'user1',
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
    isAdmin: false,
    password: 'password',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'admin1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    isAdmin: true,
    password: 'admin123',
    createdAt: new Date().toISOString(),
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check for stored authentication on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user with matching credentials
    const foundUser = MOCK_USERS.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (foundUser) {
      // Remove password before storing user data
      const { password: _, ...secureUser } = foundUser;
      setUser(secureUser);
      localStorage.setItem('user', JSON.stringify(secureUser));
      return true;
    }
    
    return false;
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if email already exists
    if (MOCK_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return false;
    }
    
    // Create new user
    const newUser = {
      id: `user${Date.now()}`,
      email,
      firstName,
      lastName,
      isAdmin: false,
      createdAt: new Date().toISOString(),
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    // In a real app, you would send this data to your API
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};