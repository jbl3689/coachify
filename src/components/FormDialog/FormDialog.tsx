import React, { ReactElement } from 'react';

import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface FormDialogProps {
  Heading: ReactElement;
  children: React.ReactNode;
  onClose: () => void;
}

function FormDialog({ Heading, children, onClose }: FormDialogProps) {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{Heading}</DialogTitle>
        </DialogHeader>

        {children}

        <DialogClose asChild className="w-2/6 mx-auto">
          <Button type="button" variant="destructive" onClick={onClose}>
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default FormDialog;
