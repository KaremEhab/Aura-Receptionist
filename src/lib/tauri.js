// Tauri API mocks/proxies for web compatibility
export const isTauri = () => !!window.__TAURI__;

export const minimizeWindow = async () => {
  if (isTauri()) {
    const { getCurrent } = await import('@tauri-apps/api/window');
    await getCurrent().minimize();
  }
};

export const maximizeWindow = async () => {
  if (isTauri()) {
    const { getCurrent } = await import('@tauri-apps/api/window');
    await getCurrent().toggleMaximize();
  }
};

export const closeWindow = async () => {
  if (isTauri()) {
    const { getCurrent } = await import('@tauri-apps/api/window');
    await getCurrent().close();
  }
};
