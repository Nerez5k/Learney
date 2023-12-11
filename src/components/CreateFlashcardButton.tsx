"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const CreateFlashcardButton = (props: Props) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(`/flashcards/create`);
      }}
    >
      Create Flashcard
    </Button>
  );
};

export default CreateFlashcardButton;
