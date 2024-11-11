import {makeObservable, observable, action} from 'mobx';
import DefaultTheme from '../theme/defaultTheme';
import BlackTheme from '../theme/blackTheme';

class ThemeStore {
  colors = DefaultTheme;

  constructor() {
    makeObservable(this, {
      colors: observable,
      switchTheme: action,
    });
  }

  switchTheme(type: 'default' | 'black') {
    if (this.colors.themeType === 'default') {
      this.colors = BlackTheme;
    } else if (this.colors.themeType === 'black') {
      this.colors = DefaultTheme;
    }
  }
}

export const theme = new ThemeStore();
