'use client';

import { useCallback, useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'sonner';

import { NewPostNotificationToastView } from '@/components/NewPostNotificationToast';

import { useAppSelector } from '@/hooks/store/useAppSelector';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

const SOCKET_EVENTS = {
  connect: 'connect',
  newPost: 'newPost',
} as const;

type NewPostData = {
  user: string;
  message: string;
};

export function NewPostNotificationListener() {
  const { isAuthorized, username } = useAppSelector((state) => state.user);

  const handleNewPost = useCallback(
    ({ user }: NewPostData) => {
      if (user !== username) {
        toast(<NewPostNotificationToastView username={user} />, { position: 'bottom-left' });
      }
    },
    [username],
  );

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    const socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
    });

    socket.on(SOCKET_EVENTS.newPost, handleNewPost);

    return () => {
      socket.disconnect();
    };
  }, [isAuthorized, handleNewPost]);

  return null;
}
