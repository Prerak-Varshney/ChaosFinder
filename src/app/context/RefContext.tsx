"use client";
import { createContext, useContext, useRef, RefObject } from "react";

const RefContext = createContext<RefObject<HTMLInputElement | null> | null>(null);

export const RefProvider = ({ children }: { children: React.ReactNode }) => {
  const searchRef = useRef<HTMLInputElement>(null);
  return <RefContext.Provider value={searchRef}>{children}</RefContext.Provider>;
};

export const useSharedRef = () => {
  const context = useContext(RefContext);
  if (!context) throw new Error("useSharedRef must be used inside RefProvider");
  return context;
};
