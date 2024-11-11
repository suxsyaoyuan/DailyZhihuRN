import {useObservable} from 'mobx-react-lite';
import DefaultTheme from '../theme/defaultTheme';
import BlackTheme from '../theme/blackTheme';

// 创建 ThemeStore 的函数组件形式
export const useThemeStore = () => {
  const store = useObservable(() => ({
    colors: DefaultTheme,

    // 使用 action 修改状态
    switchTheme(type: 'default' | 'black') {
      if (this.colors.themeType === 'default') {
        this.colors = BlackTheme;
      } else if (this.colors.themeType === 'black') {
        this.colors = DefaultTheme;
      }
    },
  }));

  return store;
};
