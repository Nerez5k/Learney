"use client";

import { trpc } from "@/app/_trpc/client";
import UploadButton from "./UploadButton";
import {
  DownloadIcon,
  EditIcon,
  Ghost,
  Loader2,
  MessageSquare,
  Plus,
  Trash,
  TrashIcon,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { ChangeEvent, SetStateAction, useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "./ui/context-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

const Files = () => {
  const [inputValue, setInputValue] = useState("");
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);

  const utils = trpc.useContext();

  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate({ id }) {
      setCurrentlyDeletingFile(id);
    },
    onSettled() {
      setCurrentlyDeletingFile(null);
    },
  });
  const { mutate: editFileName } = trpc.editFileName.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSaveChanges = (fileId: string) => {
    editFileName({
      id: fileId,
      name: inputValue,
    });
  };

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">My files</h1>

        <UploadButton />
      </div>

      {/* DISPLAY */}
      {files && files.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file) => (
              <Dialog>
                <ContextMenu>
                  <ContextMenuTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit file name</DialogTitle>
                        <DialogDescription>
                          Change your file name.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Input
                            id="name"
                            defaultValue={file.name.split(".pdf")[0]}
                            className="col-span-3"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            type="submit"
                            onClick={() => handleSaveChanges(file.id)}
                          >
                            Save changes
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                    <ContextMenuContent className="w-64">
                      <DialogTrigger className="w-64 pr-2">
                        <ContextMenuItem inset>
                          Edit file name
                          <ContextMenuShortcut>
                            <EditIcon className="h-4 w-4"></EditIcon>
                          </ContextMenuShortcut>
                        </ContextMenuItem>
                      </DialogTrigger>
                      <ContextMenuItem inset>
                        Download
                        <ContextMenuShortcut>
                          <DownloadIcon className="h-4 w-4"></DownloadIcon>
                        </ContextMenuShortcut>
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem
                        inset
                        onClick={() => deleteFile({ id: file.id })}
                      >
                        Delete
                        <ContextMenuShortcut>
                          <TrashIcon className="h-4 w-4 text-red-500"></TrashIcon>
                        </ContextMenuShortcut>
                      </ContextMenuItem>
                    </ContextMenuContent>
                    <li
                      key={file.id}
                      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
                    >
                      <Link
                        href={`/files/${file.id}`}
                        className="flex flex-col gap-2"
                      >
                        <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                          <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                              <h3 className="truncate text-lg font-medium text-zinc-900">
                                {file.name}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                        <div className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          {format(new Date(file.createdAt), "d MMM yyyy")}
                        </div>
                        <div>
                          <MessageSquare className="h-4 w-4" />3
                        </div>

                        <Button
                          size="sm"
                          className="w-full"
                          variant="destructive"
                          onClick={() => deleteFile({ id: file.id })}
                        >
                          {currentlyDeletingFile === file.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <TrashIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </li>
                  </ContextMenuTrigger>
                </ContextMenu>
              </Dialog>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className="my-2" count={3} />
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8 text-zinc-800" />
          <h3 className="font-semibold text-xl">Pretty empty around here</h3>
          <p>Let&apos;s upload your first PDF.</p>
        </div>
      )}
    </main>
  );
};
export default Files;
//https://stackoverflow.com/questions/77185827/shadcn-dialog-inside-of-dropdown-closes-automatically
