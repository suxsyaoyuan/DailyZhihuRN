import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import {Provider, observer} from 'mobx-react';
import stores from './store';
import './utils/storage';
import AppNavigation from './routers/AppRouter';
import RNRestart from 'react-native-restart';
import DeviceInfo from 'react-native-device-info';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import {Axios} from './utils';
import RNBootSplash from 'react-native-bootsplash';

import Geolocation from '@react-native-community/geolocation';

// 使用 Mobx 观察者
const App = observer(() => {
  const [progress, setProgress] = useState(0);
  const [progressModalVisible, setProgressModalVisible] = useState(false);
  const [totalPackageSize, setTotalPackageSize] = useState(null);
  const [receivedPackageSize, setReceivedPackageSize] = useState(null);

  const prefix = 'daily://'; // react-navigation 深连接的URI前缀

  const errorHandler = (e, isFatal) => {
    if (isFatal) {
      Alert.alert(
        '系统错误',
        `应用发生致命错误： ${isFatal ? '错误信息:' : ''} ${e.name} ${
          e.message
        }建议您重启应用.`,
        [
          {
            text: '重启应用',
            onPress: () => RNRestart.Restart(),
          },
        ],
      );
    } else {
      console.log(e);
    }
  };

  setJSExceptionHandler(errorHandler);

  setNativeExceptionHandler(errorString => {
    const errInfo = {
      品牌: DeviceInfo.getBrand(),
      应用版本号: DeviceInfo.getReadableVersion(),
      系统版本: DeviceInfo.getSystemVersion(),
      是否为平板电脑: DeviceInfo.isTablet(),
      触发时间: new Date(),
      错误信息: errorString,
    };

    Axios.post('http://106.52.75.247:3000/feedback', {
      title: '知乎日报APP错误日志',
      content: JSON.stringify(errInfo),
    })
      .then(() => {})
      .catch(() => {});
  });

  useEffect(() => {
    // JPushModule.initPush(); // 初始化极光推送
    // Geolocation 获取当前位置
    Geolocation.getCurrentPosition(info => console.log(info));

    // 隐藏启动屏
    RNBootSplash.hide({duration: 250});

    // 清理副作用
    return () => {
      // JPushModule.removeReceiveOpenNotificationListener();
    };
  }, []);

  return (
    <Provider {...stores}>
      {/* <Provider> 用于集成 Mobx <MenuProvider> 是弹出菜单组件  */}
      <MenuProvider>
        <AppNavigation
          uriPrefix={prefix}
          screenProps={{theme: stores.theme.colors.navBackground}}
        />
        {/* 更新下载进度组件 */}
        {/* <ProgressBarModal
          progress={progress}
          totalPackageSize={totalPackageSize + "MB"}
          receivedPackageSize={receivedPackageSize}
          progressModalVisible={progressModalVisible}
        /> */}
      </MenuProvider>
    </Provider>
  );
});

export default App;
