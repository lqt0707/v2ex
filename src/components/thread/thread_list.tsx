import { INode } from '../interfaces/node';
import { IMember } from '../interfaces/member';
import React from 'react';
import Thread from './thread/thread';
import {View} from "@tarojs/components";

interface IProps {
  threads: IThread[];
  loading: boolean;
}
interface IThread {
  title: string;
  member: IMember;
  node: INode;
  last_modified: number;
  id: number;
  replies: number;
  key?: number;
}

const ThreadList: React.FC<IProps> = (props: IProps) => {
  const { loading, threads } = props;

  const element = threads.map((thread: IThread) => {
    return (
      <Thread
        key={thread.id}
        node={thread.node}
        title={thread.title}
        last_modified={thread.last_modified}
        replies={thread.replies}
        tid={thread.id}
        member={thread.member}
      />
    );
  });

  return <View className={'thread-list'}>
    {loading? element:<Loading/>}
  </View>
};
export default ThreadList;
