//  日报详情页
import Storage from "react-native-storage";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  AsyncStorage,
  TouchableOpacity,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import AutoHeightWebView from "react-native-autoheight-webview";
import LinearGradient from "react-native-linear-gradient";
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const IMG_MAX_HEIGHT = 200;
const HEAD_HEIGHT = 50;
const HEADER_MIN_HEIGHT = 0;
// 记录当前Header高度
var  tempHeight=HEAD_HEIGHT;

export default class index extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTransparent: true,
      headerStyle: {
        overflow: "hidden",
        height: params.height ? params.height : HEAD_HEIGHT,
        backgroundColor: "#00a2ed",
        opacity: params.opacity
      }
    };
  };
  constructor(props) {
    super(props);
    const id = this.props.navigation.getParam("itemId");
    // 记录Y轴滚动坐标 用户计算滚动方向
    let oldOffsetY = "";
    this.state = {
      itemId: id,
      daily: {
        css: [], //weview样式文件地址
        section: null //栏目分类信息
      },
      // 动态调整webview为设备的宽度
      webviewWidth: null,
      // 记录webviewI初始化状态
      webviewInit: false,
      opacity: new Animated.Value(0),
      headerHeight: new Animated.Value(HEAD_HEIGHT)
    };
    this.scrollY = new Animated.Value(0);
    let opacity = this.scrollY.interpolate({
      inputRange: [0, IMG_MAX_HEIGHT, 210, 211],
      outputRange: [1, 0, 0, 1],
      extrapolate: "clamp"
    });

    this.props.navigation.setParams({ height: this.state.headerHeight });
    this.props.navigation.setParams({ opacity: opacity });
  }
  componentDidMount() {
    this.init();
  }
  init() {
    // TODO:封装接口
    fetch(API.details + this.state.itemId)
      .then(response => response.json())
      .then(responseJson => {
        let html = `<!DOCTYPE html><html><head><meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no"></head><body>${ responseJson.body }</body></html>`;
        responseJson.body = html;
        this.setState({
          daily: responseJson
        });
      })
      .catch(error => {
        // TODO:接口异常处理
      });
  }
  bindMessage(event) {
    let data = event.nativeEvent.data;
    if (String(data).indexOf("url:") !== -1) {
      let url = data.split("url:")[1].replace('"', "");
      this.props.navigation.navigate("ImgView", {
        url
      });
    }else if (String(data).indexOf("init:") !== -1) {
      this.setState({ webviewInit: true });
    }
  }
  bindOnScroll = event => {
    let y = event.nativeEvent.contentOffset.y;
    let direction = y > this.oldOffsetY ? "down" : "up";
    this.oldOffsetY = y;
    if (y < IMG_MAX_HEIGHT) {
      this.state.headerHeight.setValue(HEAD_HEIGHT);
    } else {
      if (direction == "down") {
        if (tempHeight == HEAD_HEIGHT) {
          this.state.headerHeight.setValue(HEADER_MIN_HEIGHT);
          tempHeight= HEADER_MIN_HEIGHT;
        }
      } else if (direction == "up") {
        if (tempHeight == HEADER_MIN_HEIGHT) {
          this.state.headerHeight.setValue(HEAD_HEIGHT);
          tempHeight=HEAD_HEIGHT;
        }
      }
    }
  };
  renderSectioHeader=()=>{
    const imgTop = this.scrollY.interpolate({
      inputRange: [0, 400],
      outputRange: [HEAD_HEIGHT, -HEAD_HEIGHT],
      extrapolate: "clamp"
    });
    return <Animated.View key="background" style={{translateY: imgTop}} >
    <Image
      style={[styles.backgroundImage]}
      source={{ uri: this.state.daily.image }}
    />
    <LinearGradient
      colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
      style={styles.linearGradient}
    >
      <Text style={[styles.title]}>
        {this.state.daily.title}
      </Text>
      <Text style={[styles.source]}>
        {this.state.daily.image_source}
      </Text>
    </LinearGradient>
  </Animated.View>
  }
  render() {
   
    return (
      <View
        style={styles.fill}
        onLayout={event => {
          this.setState({ webviewWidth: event.nativeEvent.layout.width });
        }}
      >
        <ParallaxScrollView
          backgroundColor={'#fff'}
          onMessage={this.bindMessage}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
            {
              listener: this.bindOnScroll
            }
          )}
          parallaxHeaderHeight={250}
          renderBackground={this.renderSectioHeader}
        >
          {/* TODO : Webview在安卓模拟器7.0+以上版本时 存在内容被裁切情况  */}
          <AutoHeightWebView
            style={{ width: this.state.webviewWidth }}
            source={{ html: this.state.daily.body }}
            onMessage={this.bindMessage.bind(this)}
            files={[
              {
                href: this.state.daily.css[0],
                type: "text/css",
                rel: "stylesheet"
              }
            ]}
            // 为webview图片绑定点击事件 , 触发查看大图
            customScript={`
              window.onload=function(){
                window.ReactNativeWebView.postMessage(JSON.stringify("init:true"));
                var imgs = document.getElementsByTagName("img");
                if(imgs){
                  for(var i=0;i<imgs.length;i++){
                    imgs[i].addEventListener('click',function(e){
                      var src=this.src;
                      window.ReactNativeWebView.postMessage(JSON.stringify("url:"+src));
                    })
                  }
                }
              }
            `}
            customStyle={`
              .img-place-holder{ 
                display:none
              }
              body{
                background:none !important;
              }
            `}
          />
          {/* 栏目信息  */}
          {this.state.daily.section && this.state.webviewInit ? (
            <TouchableOpacity
              style={styles.sectionWrapper}
              onPress={() => {
                console.warn(this.state.daily.section.id);
              }}
            >
              <Image
                style={styles.thumbnailImg}
                source={{ uri: this.state.daily.section.thumbnail }}
              />
              <Text style={styles.thumbnailName}>
                本文来自：{this.state.daily.section.name} · 合集
              </Text>
              <Icon
                iconStyle={styles.iconRightArrow}
                name="angle-right"
                type="font-awesome"
                color="#333"
                size={22}
              />
            </TouchableOpacity>
          ) : null}
        </ParallaxScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  title: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: 18
  },
  linearGradient: {
    width: "100%",
    height: IMG_MAX_HEIGHT,
    position: "absolute",
    zIndex: 2
  },
  
  backgroundImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 1,
    height: IMG_MAX_HEIGHT,
    resizeMode: "cover"
  },
  title: {
    fontSize: 22,
    color: "#fff",
    position: "absolute",
    paddingHorizontal: 15,
    bottom: 30,
    textAlign: "left"
  },
  source: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    position: "absolute",
    bottom: 10,
    right: 20
  },
  sectionWrapper: {
    backgroundColor: "#f0f0f0",
    marginHorizontal: 20,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center"
  },
  thumbnailImg: {
    height: 50,
    width: 50
  },
  thumbnailName: {
    flex: 1,
    color: "#000",
    marginLeft: 10
  },
  iconRightArrow: {
    right: 10,
    position: "absolute"
  }
});
