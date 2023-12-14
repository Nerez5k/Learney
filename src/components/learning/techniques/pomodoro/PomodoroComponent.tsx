"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import AboutPomodoro from "./About";

type Props = {};

const PomodoroComponent = (props: Props) => {
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [seconds, setSeconds] = useState(0);
  const [ticking, setTicking] = useState(false);

  const [stage, setStage] = useState(0);

  const switchStage = (index: React.SetStateAction<number>) => {
    setStage(index);
  };

  const getTickingTime = () => {
    const timeStage = {
      0: pomodoro,
      1: shortBreak,
      2: longBreak,
    };
    return timeStage[stage as keyof typeof timeStage];
  };

  const updateMinute = () => {
    const updateStage = {
      0: setPomodoro,
      1: setShortBreak,
      2: setLongBreak,
    };
    return updateStage[stage as keyof typeof updateStage];
  };

  const clockTicking = () => {
    const minutes = getTickingTime();
    const setMinutes = updateMinute();

    if (minutes === 0 && seconds === 0) {
      alert("Time is up!");
    } else if (seconds === 0) {
      setMinutes((minute) => minute - 1);
      setSeconds(59);
    } else {
      setSeconds((second) => second - 1);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (ticking) clockTicking();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, pomodoro, shortBreak, longBreak, ticking]);

  return (
    <>
      <Timer
        stage={stage}
        switchStage={switchStage}
        getTickingTime={getTickingTime}
        seconds={seconds}
        ticking={ticking}
        setTicking={setTicking}
      />
      <AboutPomodoro />
    </>
  );
};

export default PomodoroComponent;
