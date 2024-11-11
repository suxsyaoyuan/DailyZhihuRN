import React from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

const SwiperComponent = () => (
  <Swiper
    style={styles.wrapper}
    showsButtons={true}
    autoplay={true}
    autoplayTimeout={3}>
    <ScrollView style={styles.slide}>
      <Image
        style={styles.image}
        source={{uri: 'https://example.com/image1.jpg'}}
      />
    </ScrollView>
    <ScrollView style={styles.slide}>
      <Image
        style={styles.image}
        source={{uri: 'https://example.com/image2.jpg'}}
      />
    </ScrollView>
    <ScrollView style={styles.slide}>
      <Image
        style={styles.image}
        source={{uri: 'https://example.com/image3.jpg'}}
      />
    </ScrollView>
  </Swiper>
);

export default SwiperComponent;
