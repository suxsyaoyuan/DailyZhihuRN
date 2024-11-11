// 获取新闻列表
export const getNewsList = async type => {
  const key = '6d7ee8d88bd4fb137f5d20ce7066a700'; // 聚合新闻 自己申请
  const url = `http://v.juhe.cn/toutiao/index?key=${key}&type=${type}`;

  try {
    const response = await fetch(url);
    const jsonResponse = await response.json();

    if (jsonResponse.error_code === 0) {
      return jsonResponse.result.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log('Fetch Error:', error);
  }
};

// 获取城市信息
export const getCityInfo = async coords => {
  const key = '687e517f06684448a9f4695721414a07';
  const url = `https://geoapi.qweather.com/v2/city/lookup?key=${key}&location=${
    coords.longitude
  },${coords.latitude}`;
  // console.log('url', url);

  try {
    const response = await fetch(url);
    const jsonResponse = await response.json(); // 把响应结果转为json

    if (jsonResponse.code === '200') {
      return jsonResponse.location[0];
    } else {
      return {};
    }
  } catch (error) {
    console.log('Fetch Error:', error);
  }
};

// 获取三天天气预报
export const getThreeDays = async coords => {
  const key = '687e517f06684448a9f4695721414a07';
  const url = `https://devapi.qweather.com/v7/weather/3d?key=${key}&location=${
    coords.longitude
  },${coords.latitude}`;

  try {
    const response = await fetch(url);
    const jsonResponse = await response.json();

    if (jsonResponse.code === '200') {
      return jsonResponse.daily;
    } else {
      return [];
    }
  } catch (error) {
    console.log('Fetch Error:', error);
    return [];
  }
};
