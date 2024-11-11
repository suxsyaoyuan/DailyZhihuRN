import React from 'react';
import {View, Linking, TouchableOpacity, ScrollView} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {observer, inject} from 'mobx-react';

const About = () => {
  const handleLinkOpen = () => {
    Linking.openURL(
      'https://github.com/liganghui/react-native-zhihuDaily/',
    ).catch(err => console.error('An error occurred', err));
  };

  return (
    <ScrollView contentContainerStyle={{padding: 10}}>
      <View style={{marginVertical: 10}}>
        <Text style={{fontSize: 18}}>请注意：</Text>
        <Text style={{lineHeight: 22}}>
          本应用为开源应用 ,
          在未经知乎日报官方授权下使用日报的数据API接口，仅限学习开发之用，请勿用于任何商业用途。
        </Text>
      </View>
      <View style={{flexDirection: 'row', height: 50, alignItems: 'center'}}>
        <Text style={{marginVertical: 15}}>Github开源项目地址：</Text>
        <TouchableOpacity onPress={handleLinkOpen} style={{marginLeft: 5}}>
          <Icon type="font-awesome" name="github" size={32} color="#000" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default inject('theme')(observer(About));
