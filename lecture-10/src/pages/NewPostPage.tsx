import { BackButton } from '@components/router/BackButton';
import { PostForm } from '@components/forms/PostForm';

export function NewPostPage() {
  return (
    <div className='flex flex-col flex-1 w-full p-6'>
      <BackButton title='Back Home' to='/' />
      <div className='flex flex-col flex-1 justify-center items-center mb-16 w-full'>
        <div className='max-w-md w-full'>
          <PostForm />
        </div>
      </div>
    </div>
  );
}
