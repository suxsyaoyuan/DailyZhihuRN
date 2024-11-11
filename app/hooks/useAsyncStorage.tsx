import {useState, useEffect} from 'react';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

const useStorage = key => {
  const [storedValue, setStoredValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 获取存储的值
  const getItem = async () => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setStoredValue(value);
      } else {
        setStoredValue(null);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 设置值
  const setItem = async value => {
    try {
      await AsyncStorage.setItem(key, value);
      setStoredValue(value);
    } catch (err) {
      setError(err);
    }
  };

  // 移除存储的值
  const removeItem = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue(null);
    } catch (err) {
      setError(err);
    }
  };

  // 在组件挂载时获取数据
  useEffect(() => {
    getItem();
  }, [key]);

  return {
    storedValue,
    setStoredValue: setItem,
    removeStoredValue: removeItem,
    loading,
    error,
  };
};

export default useStorage;
