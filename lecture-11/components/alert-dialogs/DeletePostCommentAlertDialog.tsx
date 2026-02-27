import { DeleteAlertDialog } from './DeleteAlertDialog';

type DeletePostAlertDialog = {
  open: boolean;
  isActionPending: boolean;
  onOpenChange: (open: boolean) => void;
  onActionSubmit: () => void;
};

export function DeletePostCommentAlertDialog({
  open,
  onOpenChange,
  isActionPending,
  onActionSubmit,
}: DeletePostAlertDialog) {
  return (
    <DeleteAlertDialog
      title='Delete the comment?'
      open={open}
      onOpenChange={onOpenChange}
      isActionPending={isActionPending}
      onActionSubmit={onActionSubmit}
    />
  );
}
