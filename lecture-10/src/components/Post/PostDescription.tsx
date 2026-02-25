import { useEffect, useRef, useState } from 'react';

import { checkIfElementClamped, cn } from '@lib/styling.helpers';
import type { Post } from '@/types';

import { Button } from '@components/ui/Button';

type PostDescriptionProps = {
  text: Post['description'];
};

export function PostDescription({ text }: PostDescriptionProps) {
  const [isClamped, setIsClampled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const textRef = useRef<HTMLSpanElement>(null);

  const handleTextClamp = (textElement: HTMLSpanElement) => {
    const isTextClamped = checkIfElementClamped(textElement);
    setIsClampled(isTextClamped);
  };

  const renderToggleExpandButton = (title: string) => (
    <Button variant='link' onClick={() => setIsExpanded((prev) => !prev)} className='p-0 h-6'>
      {title}
    </Button>
  );

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) {
      return;
    }

    const textResizeObserver = new ResizeObserver(() => handleTextClamp(textElement));
    textResizeObserver.observe(textElement);

    handleTextClamp(textElement);

    return () => textResizeObserver.disconnect();
  }, []);

  return (
    <div className='flex flex-col items-start py-2 rounded-sm'>
      <span
        ref={textRef}
        className={cn(
          'text-sm leading-5 overflow-hidden break-all',
          !isExpanded && 'max-h-12',
          isClamped && !isExpanded && 'line-clamp-2',
        )}
      >
        {text}
      </span>
      {isClamped && !isExpanded && renderToggleExpandButton('...Read more')}
      {isExpanded && renderToggleExpandButton('Show less')}
    </div>
  );
}
