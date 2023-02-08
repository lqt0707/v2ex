import React from 'react';
import all_node from './all_node';
import { Navigator, Text, View } from '@tarojs/components';
import api from '../../utils/api';
import './index.less'
const Nodes: React.FC = () => {
  const element = all_node.map((item) => {
    const nodes = item.nodes.map((node) => {
      return (
        <Navigator
          className={'tag'}
          url={`/pages/node_detail/node_detail${api.queryString(node)}`}
          key={node.full_name}
        >
          <Text>{node.full_name}</Text>
        </Navigator>
      );
    });
    return (
      <View key={item.title} className={'container'}>
        <View className={'title'}>
          <Text style="margin-left:5px">{item.title}</Text>
        </View>
        <View className={'nodes'}>{nodes}</View>
      </View>
    );
  });
  return <View className={'node-container'}>{element}</View>;
};
export default Nodes;
