import React, { useState, useRef } from 'react';
import { View, Button, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const LanguagePicker: React.FC = () => {
  // 定义 Picker 选中的状态
  const [selectedLanguage, setSelectedLanguage] = useState<string>('java');

  // 引用 Picker，用于在 Android 上实现编程控制
  const pickerRef = useRef<Picker<string> | null>(null);

  // 打开 Picker
  const openPicker = () => {
    pickerRef.current?.focus();
  };

  // 关闭 Picker
  const closePicker = () => {
    pickerRef.current?.blur();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>选择编程语言:</Text>
      
      {/* Picker 组件 */}
      <Picker
        ref={pickerRef}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
              style={{ height: 50, width: 200 }}
              mode='dropdown'
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
        <Picker.Item label="Python" value="python" />
        <Picker.Item label="C++" value="cpp" />
      </Picker>

      {/* 显示选择的结果 */}
      <Text style={{ marginTop: 20 }}>已选择: {selectedLanguage}</Text>

      {/* 控制 Picker 的按钮 */}
      <Button title="打开 Picker" onPress={openPicker} />
      <Button title="关闭 Picker" onPress={closePicker} style={{ marginTop: 10 }} />
    </View>
  );
};

export default LanguagePicker;