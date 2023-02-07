import { IMember } from './member';
import { INode } from './node';

export interface IThread {
  node: INode;
  member: IMember;
  last_reply_by: string;
  last_touched: number;
  title: string;
  url: string;
  created: number;
  content: string;
  content_rendered: string;
  last_modified: number;
  replies: number;
  id: number;
}
