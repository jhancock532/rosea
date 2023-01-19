import React, { createContext, useContext, useState } from "react";

export const EditorContext = createContext({
  editorContents: {},
  setEditorContents: (data: any) => {},
});

EditorContext.displayName = "Editor";

type EditorProviderType = {
  children: React.ReactNode;
  data: any;
};

export const EditorProvider = ({ children, data }: EditorProviderType) => {
  return (
    <EditorContext.Provider value={data}>{children}</EditorContext.Provider>
  );
};

export const useEditorContext = () => useContext(EditorContext);
