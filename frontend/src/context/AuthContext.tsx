import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Member } from "@/types/member";
import { members } from "@/data/members";

type LoginCredentials = {
  email: string;
  password: string;
};
type RegistrationData = {
  name: string;
  email: string;
  password: string;
};
type AuthContextType = {
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Member;
  logout: () => void;
  registration: (data: RegistrationData) => Member;
  currentMember: Member | null;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};
export function AuthProvider({ children }: AuthProviderProps) {

  const [currentMember, setCurrentMember] = useState<Member | null>(null);

  const [mockMembers, setMockMembers] = useState(members);

  const isAuthenticated = currentMember !== null;

  function login({ email, password }: LoginCredentials) {

    const foundMember = mockMembers.find(
      (member) => member.email === email && member.password === password,
    );

    if (!foundMember) {
      throw new Error("Invalid email or password");
    }

    const authenticatedMember: Member = {
      id: foundMember.id,
      name: foundMember.name,
    };
    setCurrentMember(authenticatedMember);
    return authenticatedMember;
  }

  function registration(data: RegistrationData) {

    if (mockMembers.some((member) => member.email === data.email)) {
      throw new Error("An account with this email already exists");
    }
    
    const newId = Math.max(...mockMembers.map((member) => member.id)) + 1;
    const newMember = {
      id: newId,
      name: data.name,
      email: data.email,
      password: data.password,
    };
    setMockMembers((current) => [...current, newMember]);

    const authenticatedMember: Member = {
      id: newMember.id,
      name: newMember.name,
    };
    setCurrentMember(authenticatedMember);
    return authenticatedMember;
  }

  function logout() {
    setCurrentMember(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        currentMember,
        registration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
