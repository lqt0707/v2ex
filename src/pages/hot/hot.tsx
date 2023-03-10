import { IThread } from '../../interfaces/thread';
import React, { useCallback, useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import api from '../../utils/api';
import { View } from '@tarojs/components';
import ThreadList from '../../components/thread/thread_list';

interface IState {
  loading: boolean;
  threads: IThread[];
}

const Hot: React.FC<IState> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [threads, setThreads] = useState<IThread[]>([]);

  const getHotNodes = useCallback(async () => {
    try {
      const res = await Taro.request<IThread[]>({
        url: api.getHotNodes(),
      });
      setThreads(res.data);
      setLoading(false);
    } catch (e) {
      await Taro.showToast({
        title: '载入远程数据失败',
      });
    }
  }, []);

  useEffect(() => {
    getHotNodes();
  }, []);

  return (
    <View className={'index'}>
      <ThreadList threads={threads} loading={loading} />
    </View>
  );
};
export default Hot;
