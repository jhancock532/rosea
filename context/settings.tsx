import React, { createContext, useContext } from "react";
import { Settings } from "types/settings";

const SettingsContext = createContext<Settings | null>(null);
SettingsContext.displayName = "Settings";

type SettingsProviderType = {
  children: React.ReactNode;
  settings: Settings;
};

export const SettingsProvider = ({
  children,
  settings,
}: SettingsProviderType) => (
  <SettingsContext.Provider value={settings}>
    {children}
  </SettingsContext.Provider>
);

export const useSettingsContext = () => useContext(SettingsContext);
