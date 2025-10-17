import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  role: 'super_admin' | 'company';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, otp: string) => boolean;
  logout: () => void;
  sendOTP: (email: string) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [otpStore, setOtpStore] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const sendOTP = (email: string): string => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpStore((prev) => ({ ...prev, [email]: otp }));
    console.log(`OTP for ${email}: ${otp}`);
    return otp;
  };

  const login = (email: string, otp: string): boolean => {
    if (otpStore[email] === otp) {
      const role: 'super_admin' | 'company' = email.includes('admin') ? 'super_admin' : 'company';
      const newUser: User = { email, role };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setOtpStore((prev) => {
        const newStore = { ...prev };
        delete newStore[email];
        return newStore;
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, sendOTP }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
