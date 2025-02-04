import React, { ReactElement } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface ContentDialogProps {
  Title: ReactElement;
  Description?: ReactElement;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const ContentDialog = ({
  Title,
  Description,
  children,
  isOpen,
  onClose,
}: ContentDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{Title}</DialogTitle>
          <DialogDescription>{Description}</DialogDescription>
        </DialogHeader>

        {children}

        <DialogClose asChild className="px-10 mx-auto">
          <Button type="button" variant="destructive" onClick={onClose}>
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
