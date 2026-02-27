'use client';

import { ArrowUpRightIcon, EllipsisVerticalIcon, LinkIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';

import { usePost } from './PostContext';

export function PostActionMenu() {
  const { postId } = usePost();

  const handleOpenInNewTabClick = () => {
    window.open(`/${postId}`, '_blank')?.focus();
  };

  const handleCopyUrlClick = () => {
    const url = `${window.location.origin}/${postId}`;
    window.navigator.clipboard.writeText(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <EllipsisVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleOpenInNewTabClick}>
            <ArrowUpRightIcon />
            Open in new tab
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyUrlClick}>
            <LinkIcon />
            Copy link
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
