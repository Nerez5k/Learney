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
import { Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

type Props = {};

const SettingsPomodoro = (props: Props) => {
  return (
    <div className="grid gap-6 py-6">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right" htmlFor="work-duration">
          Work Duration
        </Label>
        <Input className="col-span-3" id="work-duration" placeholder="25" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right" htmlFor="break-duration">
          Break Duration
        </Label>
        <Input className="col-span-3" id="break-duration" placeholder="5" />
      </div>
      <div className="flex items-center">
        <Label className="text-right mr-4" htmlFor="sound-notification">
          Sound Notifications
        </Label>
        <Switch className="ml-auto" id="sound-notification" />
      </div>
    </div>
  );
};

const SettingsButton = () => {
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
          <Settings className="text-purple-500 w-9 h-9" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pomodoro Settings</DialogTitle>
          <DialogDescription>
            Adjust your work and break durations, and sound notifications here.
          </DialogDescription>
        </DialogHeader>
        <SettingsPomodoro />
        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsButton;
