'use client'

export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const slice = store(callback) as F | undefined;

  if (slice !== undefined) {
    return slice;
  }

  const storeApi = store as unknown as {
    getState?: () => T;
  };

  if (typeof storeApi.getState === "function") {
    return callback(storeApi.getState());
  }

  return slice as F;
};
