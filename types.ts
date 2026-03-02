import React from 'react';

export interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

export enum EditionType {
  PRINT = 'PRINT',
  DIGITAL = 'DIGITAL',
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export type ViewState = 'HOME' | 'ARCHIVES' | 'ADVENTURE' | 'CONTACT' | 'DASHBOARD';

export interface UserSession {
  isLoggedIn: boolean;
  name?: string;
  email?: string;
}
