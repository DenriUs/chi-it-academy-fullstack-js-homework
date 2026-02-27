import { Trash2Icon } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '../ui/AlertDialog';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';

type DeleteAlertDialog = {
  title: string;
  description?: string;
  isActionPending: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActionSubmit: () => void;
};

export function DeleteAlertDialog({
  title,
  description,
  isActionPending,
  open,
  onOpenChange,
  onActionSubmit,
}: DeleteAlertDialog) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size='sm'>
        <AlertDialogHeader>
          <AlertDialogMedia className='bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive'>
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant='outline' disabled={isActionPending}>
            Cancel
          </AlertDialogCancel>
          <Button variant='destructive' disabled={isActionPending} onClick={onActionSubmit}>
            {isActionPending && <Spinner />} Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
