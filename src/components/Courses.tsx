import { trpc } from "@/app/_trpc/client";
import UploadButton from "./UploadButton";
import { Ghost, Loader2, MessageSquare, Plus, TrashIcon } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useState } from "react";
import { db } from "@/db";
import Image from "next/image";
import CreateCourseButton from "./CreateCourseButton";

const Courses = async () => {
  const courses = await db.course.findMany({
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">My courses</h1>
        <CreateCourseButton />
      </div>
      {courses && courses.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <li
              key={course.id}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
            >
              <Link
                href={`/courses/${course.id}/0/0`}
                className="relative block w-fit"
              >
                <Image
                  src={course.image || ""}
                  className=" object-cover w-full max-h-[300px] rounded-lg p-3"
                  width={300}
                  height={300}
                  alt="picture of the course"
                />
                <span className="absolute px-2 py-1 rounded-md">
                  {course.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8 text-zinc-800" />
          <h3 className="font-semibold text-xl">Pretty empty around here</h3>
          <p>Let&apos;s create your first course!.</p>
        </div>
      )}
    </main>
  );
};
export default Courses;
