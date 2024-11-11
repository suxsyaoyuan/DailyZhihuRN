import React from 'react';
import {WebView} from 'react-native-webview';

const MyWeb: React.FC = () => {
  return (
    <WebView source={{uri: 'https://m.baidu.com'}} style={{marginTop: 20}} />
    /* <WebView
        originWhitelist={['*']}
        source={{ html: '<h1>Hello world</h1>' }}
      /> */
  );
};

export default MyWeb;
