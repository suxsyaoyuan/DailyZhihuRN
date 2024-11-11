import React, {useState, useRef} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Form, Item, Input, Label, Icon, Button} from 'native-base';
import Spinner from 'react-native-spinkit';
import {Tools} from '../../utils';
import {observer, inject} from 'mobx-react';

const Login = ({navigation}) => {
  const [userName, setUserName] = useState(null);
  const [passWord, setPassWord] = useState(null);
  const [signInLoading, setSignInLoading] = useState(false);
  const [pwdVisibility, setPwdVisibility] = useState(false);

  const secondTextInput = useRef(null); // Reference for second input (password)

  const bindOnChangeText = (text, name) => {
    if (name === 'userName') {
      setUserName(text);
    } else if (name === 'passWord') {
      setPassWord(text);
    }
  };

  const switchPwdVisibility = () => {
    setPwdVisibility(!pwdVisibility);
  };

  const signIn = () => {
    if (!passWord || !userName) {
      Tools.toast('请填写账户信息');
    } else {
      setSignInLoading(true);

      storage
        .save({
          key: 'userToken',
          data: {
            name: '测试001',
            avatar:
              'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          },
        })
        .then(() => {
          setTimeout(() => {
            setSignInLoading(false);
            Tools.toast('登录成功');
            navigation.navigate('Home');
          }, 1000);
        })
        .catch(() => {
          setSignInLoading(false);
          Tools.toast('登录失败');
        });
    }
  };

  return (
    <View style={styles.container}>
      <Form style={styles.inputContainer}>
        <Item inlineLabel style={styles.item}>
          <Label>账号</Label>
          <Input
            style={styles.input}
            placeholder="请输入手机号登录"
            placeholderTextColor={'#999'}
            clearButtonMode={'unless-editing'}
            autoComplete={'tel'}
            autoFocus={true}
            keyboardType={'numeric'}
            returnKeyType={'next'}
            onChangeText={text => bindOnChangeText(text, 'userName')}
            onSubmitEditing={() => secondTextInput.current._root.focus()}
          />
        </Item>
        <Item inlineLabel error={false} style={styles.item}>
          <Label>密码</Label>
          <Input
            style={styles.input}
            ref={secondTextInput}
            placeholder="请输入密码"
            placeholderTextColor={'#999'}
            blurOnSubmit={true}
            secureTextEntry={!pwdVisibility}
            returnKeyType={'go'}
            onChangeText={text => bindOnChangeText(text, 'passWord')}
            onSubmitEditing={signIn}
          />
          <TouchableOpacity onPress={switchPwdVisibility}>
            <Icon
              type="MaterialIcons"
              name="remove-red-eye"
              style={[
                styles.icon,
                pwdVisibility ? {color: '#333'} : {color: '#999'},
              ]}
            />
          </TouchableOpacity>
        </Item>
        <Button
          full
          style={[
            styles.submitBtn,
            userName && passWord
              ? {backgroundColor: '#00a2ed'}
              : {backgroundColor: '#eaeaea'},
          ]}
          onPress={!signInLoading ? signIn : null}>
          {signInLoading ? (
            <Spinner size={24} type={'FadingCircleAlt'} color={'#fff'} />
          ) : (
            <Text
              style={[
                styles.submitText,
                userName && passWord ? {color: '#fff'} : {color: '#494949'},
              ]}>
              登录
            </Text>
          )}
        </Button>
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  inputContainer: {
    marginTop: 40,
  },
  item: {
    height: 60,
    borderColor: '#e8e8e8',
  },
  input: {
    fontSize: 14,
  },
  submitBtn: {
    borderRadius: 2,
    justifyContent: 'center',
    marginTop: 30,
  },
  submitText: {
    color: '#494949',
  },
  icon: {
    marginRight: 20,
  },
});

export default inject('theme')(observer(Login));
