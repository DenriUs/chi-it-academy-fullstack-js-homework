import { DeleteAlertDialog } from './DeleteAlertDialog';

type DeletePostAlertDialog = {
  open: boolean;
  isActionPending: boolean;
  onOpenChange: (open: boolean) => void;
  onActionSubmit: () => void;
};

export function DeletePostAlertDialog({
  open,
  onOpenChange,
  isActionPending,
  onActionSubmit,
}: DeletePostAlertDialog) {
  return (
    <DeleteAlertDialog
      title='Delete the post?'
      description='This will permanently delete this post.'
      open={open}
      onOpenChange={onOpenChange}
      isActionPending={isActionPending}
      onActionSubmit={onActionSubmit}
    />
  );
}
