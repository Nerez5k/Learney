import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import SettingsButton from "./SettingsPomodoro";
import FullscreenButton from "./FullscreenPomodoro";

type Props = {
  stage: number;
  switchStage: (index: number) => void;
  getTickingTime: () => number;
  seconds: number;
  ticking: boolean;
  setTicking: (ticking: boolean) => void;
};

const Timer = ({
  stage,
  switchStage,
  getTickingTime,
  seconds,
  ticking,
  setTicking,
}: Props) => {
  const options = ["Pomodoro", "Short Break", "Long Break"];
  return (
    <div className="w-10/12 mx-auto text-purple-500 flex flex-col justify-center items-center mt-10">
      <div className="flex flex-col">
        <Card className="mt-8 mb-6">
          <CardHeader className="items-center justify-center text-center">
            <div className="flex gap-5 items-center">
              {options.map((option, index) => {
                return (
                  <h1
                    key={index}
                    className={` ${
                      index === stage ? "bg-gray-500 bg-opacity-30" : ""
                    } p-1 cursor-pointer transition-all rounded`}
                    onClick={() => switchStage(index)}
                  >
                    {option}
                  </h1>
                );
              })}
            </div>
          </CardHeader>
          <CardContent className="mt-10 mb-10 justify-center items-center text-center">
            <h1 className="text-9xl font-bold select-none m-0">
              {getTickingTime()}:{seconds.toString().padStart(2, "0")}
            </h1>
          </CardContent>
          <CardFooter className="justify-center items-center flex gap-2">
            <Button onClick={() => setTicking(true)}>Start</Button>
            <Button
              variant="destructive"
              className="bg-red-500 text-white"
              onClick={() => setTicking(false)}
            >
              Stop
            </Button>
          </CardFooter>
        </Card>
        <div className="flex justify-between">
          <SettingsButton />
          <FullscreenButton />
        </div>
      </div>
    </div>
  );
};
export default Timer;
