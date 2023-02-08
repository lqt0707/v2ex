import { IThread } from "../../interfaces/thread";
import { GlobalState, IThreadProps, timeagoInst } from "../../utils";
import React, { useCallback, useEffect, useState } from "react";
import api from "../../utils/api";
import Taro from "@tarojs/taro";
import { Image, RichText, View } from "@tarojs/components";
import Thread from "../../components/thread/thread";
import { Loading } from "../../components/loading/loading";
import "./index.less";
interface IState {
  loading: boolean;
  replies: IThread[];
  content: string;
  thread: IThreadProps;
}

function prettyHTML(str: string) {
  const lines = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];

  lines.forEach((line) => {
    const regex = new RegExp(`<${line}`, "gi");
    str = str.replace(regex, `<${line} class='line`);
  });
  return str.replace(/<img/gi, '<img class="img"');
}

const ThreadDetail: React.FC<IState> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [replies, setReplies] = useState<IThread[]>([]);
  const [content, setContent] = useState<string>("");
  const [thread, setThread] = useState<IThread>(GlobalState.thread);

  const getThread = useCallback(async () => {
    try {
      const id = GlobalState.thread.tid;
      const [
        { data },
        {
          data: [{ content_rendered }],
        },
      ] = await Promise.all([
        Taro.request<IThread[]>({
          url: api.getReplies({
            topic_id: id,
          }),
        }),
        Taro.request<IThread[]>({
          url: api.getTopics({
            id,
          }),
        }),
      ]);
      setLoading(false);
      setReplies(data);
      setContent(prettyHTML(content_rendered));
    } catch (e) {
      Taro.showToast({
        title: "载入远程数据失败",
      });
    }
  }, []);

  useEffect(() => {
    getThread();
  }, [getThread]);

  const replieEl = replies.map((reply, index) => {
    const time = timeagoInst.format(reply.last_modified * 1000, "zh");
    return (
      <View className={"reply"} key={reply.id}>
        <Image src={reply.member.avatar_large} className={"avatar"} />
        <View className={"main"}>
          <View className={"author"}>{reply.member.username}</View>
          <View className={"time"}>{time}</View>
          {Taro.getEnv() === Taro.ENV_TYPE.ALIPAY ? (
            <View className={"content"}>{reply.content}</View>
          ) : (
            <RichText nodes={reply.content} className={"content"} />
          )}
          <View className={"floor"}>{index + 1} 楼</View>
        </View>
      </View>
    );
  });

  const contentEl = loading ? (
    <Loading />
  ) : (
    <View>
      <View className={"main-content"}>
        {Taro.getEnv() === Taro.ENV_TYPE.ALIPAY ? (
          <View>{content}</View>
        ) : (
          <RichText nodes={content} />
        )}
      </View>
      <View className={"replies"}>{replieEl}</View>
    </View>
  );

  return (
    <View className={"detail"}>
      <Thread
        node={thread.node}
        title={thread.title}
        last_modified={thread.last_modified}
        replies={thread.replies}
        tid={thread.id}
        member={thread.member}
        not_navi={true}
      />
      {contentEl}
    </View>
  );
};
export default ThreadDetail;
