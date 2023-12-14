"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Maximize, Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {};

const FullscreenPomodoro = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 p-4">
        <Badge className="bg-red-500 w-full h-8 cursor-pointer" />
        <Badge className="bg-blue-500 w-full h-8 cursor-pointer" />
        <Badge className="bg-green-500 w-full h-8 cursor-pointer" />
        <Badge className="bg-yellow-500 w-full h-8 cursor-pointer" />
        <Badge className="bg-purple-500 w-full h-8 cursor-pointer" />
        <Badge className="bg-pink-500 w-full h-8 cursor-pointer" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4 py-5">
        <Label className="text-right" htmlFor="work-duration">
          Work Duration
        </Label>
        <Input className="col-span-3" id="work-duration" placeholder="25" />
      </div>
    </div>
  );
};

const FullscreenButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <button>
          <Maximize className="text-purple-500 w-9 h-9" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fullscreen Settings</DialogTitle>
          <DialogDescription>
            Adjust your settings for the fullscreen pomodoro.
          </DialogDescription>
        </DialogHeader>
        <FullscreenPomodoro />
        <DialogFooter className="flex justify-between">
          <Button type="submit">Cancel</Button>
          <Button type="submit">Open Fullscreen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FullscreenButton;
