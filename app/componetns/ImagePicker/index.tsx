import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

export default class App extends React.Component {
  state = {
    avatarSource: null, // 保存选中的图片
    videoSource: null, // 保存选中的视频
  };

  // 选择照片
  selectPhotoTapped = () => {
    const options = {
      mediaType: 'photo', // 选择媒体类型为照片
      quality: 1.0, // 图片质量
      maxWidth: 500, // 图片最大宽度
      maxHeight: 500, // 图片最大高度
    };

    // 打开图片库选择图片
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('用户取消了照片选择');
      } else if (response.errorMessage) {
        console.log('ImagePicker 错误: ', response.errorMessage);
      } else {
        // 获取图片的URI并更新状态
        const source = {uri: response.assets[0].uri};
        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  // 选择视频
  selectVideoTapped = () => {
    const options = {
      mediaType: 'video', // 选择媒体类型为视频
      videoQuality: 'medium', // 视频质量
    };

    // 打开图片库选择视频
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('用户取消了视频选择');
      } else if (response.errorMessage) {
        console.log('ImagePicker 错误: ', response.errorMessage);
      } else {
        // 获取视频的URI并更新状态
        this.setState({
          videoSource: response.assets[0].uri,
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* 按钮：选择照片 */}
        <TouchableOpacity onPress={this.selectPhotoTapped}>
          <View
            style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
            {this.state.avatarSource === null ? (
              <Text>选择照片</Text>
            ) : (
              <Image style={styles.avatar} source={this.state.avatarSource} />
            )}
          </View>
        </TouchableOpacity>

        {/* 按钮：选择视频 */}
        <TouchableOpacity onPress={this.selectVideoTapped}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            <Text>选择视频</Text>
          </View>
        </TouchableOpacity>

        {/* 显示选中的视频 URI */}
        {this.state.videoSource && (
          <Text style={{margin: 8, textAlign: 'center'}}>
            {this.state.videoSource}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
});
