import { PostForm } from '@/components/forms/PostForm';
import { NavigateBackButton } from '@/components/NavigateBackButton';

export default function NewPostPage() {
  return (
    <div className='flex flex-col flex-1 w-full p-6'>
      <NavigateBackButton title='Back Home' to='/' />
      <div className='flex flex-col flex-1 justify-center items-center mb-16 w-full'>
        <div className='max-w-md w-full'>
          <PostForm />
        </div>
      </div>
    </div>
  );
}
