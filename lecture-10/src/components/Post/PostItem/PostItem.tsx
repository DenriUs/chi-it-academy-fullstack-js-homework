import type { Post } from '@/types';

import { PostProvider } from '@components/Post/PostProvider';
import { PostHeader } from '@components/Post/PostHeader';
import { PostImage } from '@components/Post/PostImage';
import { PostCaption } from '@components/Post/PostCaption';
import { PostCommentSection } from '@components/Post/PostCommentSection/PostCommentSection';
import { PostCommentSectionWrapper } from '@components/Post/PostCommentSection/PostCommentSectionWrapper';

type PostProps = {
  post: Post;
};

export function PostItem({ post }: PostProps) {
  const { id, description, user } = post;

  return (
    <PostProvider postId={id} authorId={user.id} commentsDefaultVisibility={false}>
      <li className='flex flex-col max-w-2xl w-full rounded-xl border bg-card'>
        <PostHeader username={user.username} />
        <PostImage
          src={`https://rickandmortyapi.com/api/character/avatar/${post.id}.jpeg`}
          alt={''}
        />
        <PostCaption description={description} />
        <PostCommentSectionWrapper>
          <PostCommentSection postId={id} />
        </PostCommentSectionWrapper>
      </li>
    </PostProvider>
  );
}
