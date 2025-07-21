import React, { createContext, useContext, useRef, useState } from 'react';

const BottomSheetContext = createContext();

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};

export const BottomSheetProvider = ({ children }) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState(null);
  const sheetRef = useRef(null);

  const showBottomSheetWithContent = (content) => {
    setBottomSheetContent(content);
    setShowBottomSheet(true);
    // Open the bottom sheet after a short delay to ensure smooth animation
    setTimeout(() => {
      sheetRef.current?.expand();
    }, 100);
  };

  const hideBottomSheet = () => {
    setShowBottomSheet(false);
    setBottomSheetContent(null);
    sheetRef.current?.close();
  };

  const value = {
    showBottomSheet,
    bottomSheetContent,
    sheetRef,
    showBottomSheetWithContent,
    hideBottomSheet,
  };

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  );
}; 