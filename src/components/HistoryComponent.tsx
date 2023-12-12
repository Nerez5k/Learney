import React from "react";
import { db } from "@/db";
import { Clock, CopyCheck } from "lucide-react";
import Link from "next/link";

type Props = {
  limit: number;
  userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  const games = await db.game
    .findMany({
      where: { userId },
      take: limit,
      orderBy: { timeStarted: "desc" },
    })
    .then((games) =>
      games.map((game) => ({ ...game, type: "Game", date: game.timeStarted }))
    );

  const courses = await db.course
    .findMany({
      where: { userId },
      take: limit,
      orderBy: { createdAt: "desc" },
    })
    .then((courses) =>
      courses.map((course) => ({
        ...course,
        type: "Course",
        date: course.createdAt,
      }))
    );

  const flashcards = await db.flashcard
    .findMany({
      where: { userId },
      take: limit,
      orderBy: { createdAt: "desc" },
    })
    .then((flashcards) =>
      flashcards.map((flashcard) => ({
        ...flashcard,
        type: "Flashcard",
        date: flashcard.createdAt,
      }))
    );

  const files = await db.file
    .findMany({
      where: { userId },
      take: limit,
      orderBy: { createdAt: "desc" },
    })
    .then((files) =>
      files.map((file) => ({ ...file, type: "File", date: file.createdAt }))
    );

  const allItems = [...games, ...courses, ...flashcards, ...files].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Render items
  return (
    <div className="space-y-8">
      {allItems.map((item) => {
        const date = new Date(item.date).toLocaleDateString();
        let linkHref = ``;
        if (item.type === "Game") linkHref = `/quizzes/${item.id}`;
        else if (item.type === "Course") linkHref = `/courses/${item.id}`;
        else if (item.type === "File") linkHref = `/files/${item.id}`;
        let title = "";
        if ("name" in item) {
          title = item.name;
        }
        if ("title" in item && item.title !== null) {
          title = item.title;
        } else if ("topic" in item) {
          title = item.topic;
        }

        return (
          <div className="flex items-center justify-between" key={item.id}>
            <div className="flex items-center">
              <CopyCheck className="mr-3" />
              <div className="ml-4 space-y-1">
                <Link
                  href={linkHref}
                  className="text-base font-medium leading-none underline"
                >
                  {title} ({item.type})
                </Link>
                <p className="flex items-center px-2 py-1 text-sm text-white rounded-lg w-fit bg-slate-800">
                  <Clock className="w-4 h-4 mr-1" />
                  {date}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryComponent;
