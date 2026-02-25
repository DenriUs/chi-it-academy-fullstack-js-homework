import type { PropsWithChildren } from 'react';

import { usePost } from '@components/Post/PostContext';

type PostFooterProps = PropsWithChildren;

export function PostCommentSectionWrapper({ children }: PostFooterProps) {
  const { areCommentsVisible } = usePost();

  return areCommentsVisible ? children : null;
}
