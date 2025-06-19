// types.ts - Type definitions for authentication components

export interface LoginFormData {
    email: string;
    password: string;
  }
  
  export interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }
  
  export interface LoginFormProps {
    onSubmit?: (data: LoginFormData) => void;
  }
  
  export interface RegisterFormProps {
    onSubmit?: (data: RegisterFormData) => void;
  }
  
  export type AuthMode = 'login' | 'register';
  
  export interface AuthContainerProps {
    defaultMode?: AuthMode;
    onLogin?: (data: LoginFormData) => void;
    onRegister?: (data: RegisterFormData) => void;
  }
  
  export interface SocialProvider {
    name: string;
    icon: React.ReactNode;
    onClick: () => void;
  }