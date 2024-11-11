import {useObservable} from 'mobx-react-lite';
import React from 'react';

// 创建函数组件并在其中使用 MobX 状态
export const useAppStore = () => {
  const store = useObservable(() => ({
    isDrawerOpen: false,

    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
  }));

  return store;
};
