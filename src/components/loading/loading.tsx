import {Image, View} from "@tarojs/components";
const url = require('../../resource/spiner.gif')
import './loading.less'

export const Loading=()=>{
  return <View className={'loading'}>
    <Image src={url} className={'img'}/>
  </View>
}
