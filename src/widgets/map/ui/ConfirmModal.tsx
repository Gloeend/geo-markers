import {PropsWithChildren} from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction
} from "@shared/ui/shadcn/alert-dialog.tsx";

export const ConfirmModal =
    ({
         open,
         close,
         confirm,
         title,
         children
     }: {
        title: string,
        open: boolean,
        close: VoidFunction,
        confirm: VoidFunction,
    } & PropsWithChildren) => {
        return <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{children}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={close}>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={confirm}>Подтвердить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>;
    }