"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{ loop: true }}
      onInit={(typewriter) => {
        typewriter.typeString("documents")
        .pauseFor(1000).deleteAll()
        .typeString("notes")
        .pauseFor(1000).deleteAll()
        .typeString("books")
        .pauseFor(1000).deleteAll()
        .start();
      }}
    />
  );
};

export default TypewriterTitle;
