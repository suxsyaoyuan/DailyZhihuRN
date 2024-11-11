import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import Video from 'react-native-video';
import {System} from '../../utils';

const Index = ({navigation}) => {
  const [paused, setPaused] = useState(false); // 视频是否暂停
  const [muted, setMuted] = useState(true); // 视频是否静音
  const player = useRef(null);

  useEffect(() => {
    const willFocus = navigation.addListener('willFocus', () => {
      setPaused(false);
      setMuted(true);
    });

    const willBlur = navigation.addListener('willBlur', () => {
      setPaused(true);
      setMuted(true);
    });

    return () => {
      willFocus.remove();
      willBlur.remove();
    };
  }, [navigation]);

  const loginTo = () => {
    navigation.navigate('SignIn');
  };

  const signUp = () => {
    navigation.navigate('Registered');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setMuted(!muted)}
        style={styles.mask}
      />
      <Video
        style={styles.backgroundVideo}
        source={require('../../assets/video/login-background.mp4')}
        muted={muted}
        paused={paused}
        resizeMode="cover"
        ref={player}
      />
      {muted ? (
        <View style={styles.noticeContainer}>
          <View style={styles.noticeBackground}>
            <Icon name="volume-up" type="material" size={24} color="#fff" />
            <Text style={styles.noticeText}>点击屏幕取消静音</Text>
          </View>
        </View>
      ) : null}

      <View style={styles.buttonContainer}>
        <Button
          title="登录"
          onPress={loginTo}
          buttonStyle={styles.signInBtn}
          titleStyle={styles.buttonTitle}
        />
        <Button
          title="注册"
          onPress={signUp}
          buttonStyle={styles.signUpBtn}
          titleStyle={[styles.buttonTitle, styles.signUpTitle]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  buttonContainer: {
    position: 'absolute',
    width: System.SCREEN_WIDTH,
    bottom: 40,
    zIndex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  signUpBtn: {
    backgroundColor: 'rgba(27, 163, 225, 0.7)',
    height: 50,
    width: 150,
  },
  signInBtn: {
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: 150,
  },
  buttonTitle: {
    color: '#333',
    letterSpacing: 4,
    fontSize: 20,
  },
  signUpTitle: {
    color: '#fff',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2,
  },
  noticeContainer: {
    zIndex: 2,
    top: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noticeBackground: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 200,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  noticeText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 2,
  },
});

export default Index;
