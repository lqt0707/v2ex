import { IMember } from "../../interfaces/member";
import { INode } from "../../interfaces/node";
import React from "react";
import Taro, { eventCenter } from "@tarojs/taro";
import { Thread_DETAIL_NAVIGATE, timeagoInst } from "../../utils";
import { Image, Text, View } from "@tarojs/components";
import "./thread.less";
interface IProps {
  title: string;
  member: IMember;
  node: INode;
  last_modified: number;
  tid: number;
  replies: number;
  key?: number;
  not_navi?: boolean; // 不导航到 detail
}

const Thread: React.FC<IProps> = (props) => {
  const { tid, title, member, last_modified, replies, node, not_navi } = props;

  const time = timeagoInst.format(last_modified * 1000, "zh");
  const usernameCls = `author ${not_navi ? "bold" : ""}`;

  const handleNavigate = () => {
    if (not_navi) {
      return;
    }
    eventCenter.trigger(Thread_DETAIL_NAVIGATE, props);
    Taro.navigateTo({
      url: "/pages/thread_detail/thread_detail",
    });
  };

  return (
    <View className={"thread"} onClick={handleNavigate}>
      <View className={"info"}>
        <View>
          <Image src={member.avatar_large} className={"avatar"} />
        </View>
        <View className={"middle"}>
          <View className={usernameCls}>{member.username}</View>
          <View className={"replies"}>
            <Text className={"mr10"}>{time}</Text>
            <Text>评论 {replies}</Text>
          </View>
        </View>
        <View className={"node"}>
          <Text className={"tag"}>{node.title}</Text>
        </View>
      </View>
      <Text className={"title"}>{title}</Text>
    </View>
  );
};
export default Thread;
