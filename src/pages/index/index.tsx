import { IThread } from "../../interfaces/thread";
import React, { useCallback, useEffect, useState } from "react";
import api from "../../utils/api";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import ThreadList from "../../components/thread/thread_list";

interface IState {
  loading: boolean;
  threads: IThread[];
}
const Index: React.FC<IState> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [threads, setThreads] = useState<IThread[]>([]);

  const getTopics = useCallback(async () => {
    try {
      const res = await Taro.request<IThread[]>({
        url: api.getLatestTopic(),
      });
      setLoading(false);
      setThreads(res.data);
    } catch (e) {
      Taro.showToast({
        title: "载入远程数据错误",
      });
    }
  }, []);

  useEffect(() => {
    getTopics();
  }, [getTopics]);

  return (
    <View className={"index"}>
      <ThreadList threads={threads} loading={loading} />
    </View>
  );
};
export default Index;
