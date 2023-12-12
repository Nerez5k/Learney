"use client";
import React, { useState } from "react";

// Typ dla pojedynczej fiszki
type Flashcard = {
  front: string;
  back: string;
};

// Przykładowe dane fiszek
const flashcardsData: Flashcard[] = [
  {
    front: "Primary Key",
    back: "A unique identifier for each record in a database table, ensuring no two rows are identical",
  },
  {
    front: "Foreign Key",
    back: "A field in one table that uniquely identifies a row of another table, establishing a link between them",
  },
  {
    front: "Normalization",
    back: "The process of organizing data to minimize redundancy and improve data integrity",
  },
  {
    front: "Indexing",
    back: "Creating indexes on columns to speed up the retrieval of data within a database",
  },
  {
    front: "SQL",
    back: "A standardized programming language used for managing and manipulating relational databases, performing tasks like querying, updating, and data management",
  },
];

type Props = {};

const Flashcards = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const currentCard = flashcardsData[currentIndex];

  // Funkcja do zmiany fiszki
  const changeCard = (next: boolean) => {
    setFlipped(false); // Resetuj stan odwrócenia fiszki
    if (next) {
      setCurrentIndex((currentIndex + 1) % flashcardsData.length);
    } else {
      setCurrentIndex(
        (currentIndex - 1 + flashcardsData.length) % flashcardsData.length
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div
        className={`w-full max-w-xl h-96 md:max-w-2xl md:h-96 lg:max-w-3xl lg:h-96 bg-purple-300 rounded-lg shadow-lg cursor-pointer ${
          flipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setFlipped(!flipped)}
        style={{ transformStyle: "preserve-3d", transition: "transform 0.5s" }}
      >
        <div className="absolute w-full h-full rounded-lg bg-purple-200 flex items-center justify-center font-bold text-xl text-center">
          {flipped ? currentCard.back : currentCard.front}
        </div>
      </div>

      <div className="flex mt-4">
        <button
          className="p-2 mx-2 bg-purple-500 text-white rounded-lg"
          onClick={() => changeCard(false)}
        >
          Poprzednia
        </button>
        <button
          className="p-2 mx-2 bg-purple-500 text-white rounded-lg"
          onClick={() => changeCard(true)}
        >
          Następna
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
