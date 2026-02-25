import { useState } from 'react';
import type { ComponentProps, SyntheticEvent } from 'react';
import { ImageOffIcon } from 'lucide-react';

import { cn } from '@lib/styling.helpers';

import { Skeleton } from '@components/ui/Skeleton';

const ASPECT_RATIO_STYLE = {
  default: '4/3',
  portrait: '3/4',
  widescreen: '16/9',
} as const;

const ASPECT_RATIO = {
  widescreen: 1.5,
  portrait: 0.8,
} as const;

type AspectRatioStyle = (typeof ASPECT_RATIO_STYLE)[keyof typeof ASPECT_RATIO_STYLE];

type PostImageObjectFit = 'cover' | 'contain';

type PostImageProps = Pick<ComponentProps<'img'>, 'src' | 'alt'>;

export function PostImage({ src, alt }: PostImageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(!src);

  const [aspectRatio, setAspectRatio] = useState<AspectRatioStyle>(ASPECT_RATIO_STYLE.widescreen);
  const [objectFit, setObjectFit] = useState<PostImageObjectFit>('cover');

  const handleImageLoadStart = () => {
    setTimeout(() => setIsLoading(true), 0);
  };

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    const ratio = img.naturalWidth / img.naturalHeight;
    if (ratio >= ASPECT_RATIO.widescreen) {
      setAspectRatio(ASPECT_RATIO_STYLE.widescreen);
    } else if (ratio <= ASPECT_RATIO.portrait) {
      setAspectRatio(ASPECT_RATIO_STYLE.portrait);
      setObjectFit('contain');
    } else {
      setAspectRatio(ASPECT_RATIO_STYLE.default);
    }
    setIsLoaded(true);
    setIsLoading(false);
  };

  const handleImageLoadError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  return (
    <div
      className='w-full max-h-[calc(100vh-16rem)] min-h-45 h-full overflow-hidden bg-black'
      style={{ aspectRatio }}
    >
      {isError ? (
        <div className='flex w-full h-full justify-center items-center'>
          <ImageOffIcon size={60} />
        </div>
      ) : (
        <>
          {isLoading && <Skeleton className='w-full h-full rounded-none' />}
          <img
            src={src}
            alt={alt}
            loading='lazy'
            onLoadStart={handleImageLoadStart}
            onLoad={handleImageLoad}
            onError={handleImageLoadError}
            className={cn(
              'w-full h-full opacity-0 transition-opacity ease-in',
              isLoaded && 'opacity-100',
            )}
            style={{ objectFit }}
          />
        </>
      )}
    </div>
  );
}
