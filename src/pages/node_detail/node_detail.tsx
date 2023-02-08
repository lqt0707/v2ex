import { IThread } from '../../interfaces/thread';
import React, { useCallback, useEffect, useState } from 'react';
import Taro, { Current } from '@tarojs/taro';
import api from '../../utils/api';
import { View } from '@tarojs/components';
import ThreadList from '../../components/thread/thread_list';

interface IState {
  loading: boolean;
  threads: IThread[];
}

const NodeDetail: React.FC<IState> = () => {
  const { full_name, short_name } = Current.router?.params;

  const [loading, setLoading] = useState<boolean>(true);
  const [threads, setThreads] = useState<IThread[]>([]);

  const getNodeDetail = useCallback(async () => {
    try {
      const {
        data: { id },
      } = await Taro.request({
        url: api.getNodeInfo({
          name: short_name,
        }),
      });
      const res = await Taro.request<IThread[]>({
        url: api.getTopics({ node_id: id }),
      });
      setThreads(res.data);
      setLoading(false);
    } catch (e) {
      await Taro.showToast({
        title: '载入远程数据错误',
      });
    }
  }, []);

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: decodeURI(full_name) });
    getNodeDetail();
  }, []);

  return (
    <View className={'index'}>
      <ThreadList threads={threads} loading={loading} />
    </View>
  );
};
export default NodeDetail;
