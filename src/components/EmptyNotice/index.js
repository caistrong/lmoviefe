import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.scss'

class EmptyNotice extends Component {
  render() {
    return (
      <View className='empty-page'>
        <Text>内容为空</Text>
      </View>
    )
  }
}

export default EmptyNotice
