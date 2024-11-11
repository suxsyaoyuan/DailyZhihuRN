// stores.ts
import {useThemeStore} from './themeStore';
import {useAppStore} from './appStore';

type Stores = {
  theme: ReturnType<typeof useThemeStore>;
  app: ReturnType<typeof useAppStore>;
};

const useStores = (): Stores => {
  const theme = useThemeStore();
  const app = useAppStore();

  return {
    theme,
    app,
  };
};

export default useStores;
