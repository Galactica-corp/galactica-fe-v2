import { useEffect } from "react";

export const useLocalStorageMigrations = () => {
  useEffect(() => {
    const migrate = async () => {
      await deleteDefaultWagmiStoreKeys();
    };

    migrate();
  }, []);
};

async function deleteDefaultWagmiStoreKeys() {
  const keys = [
    "wagmi.store",
    "galactica-wagmi.store.Galactica-reticulum.store",
  ];

  keys.forEach((k) => {
    localStorage.removeItem(k);
  });
}
