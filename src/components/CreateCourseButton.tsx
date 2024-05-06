"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const CreateCourseButton = (props: Props) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(`/courses/create`);
      }}
    >
      Stwórz kurs
    </Button>
  );
};

export default CreateCourseButton;
