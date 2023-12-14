import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="container px-2 md:px-6 py-12 md:py-24 lg:py-32">
      <section className="space-y-12">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Learn
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto">
            Explore a variety of learning resources to broaden your knowledge.
          </p>
        </div>
        <div className="mx-auto grid max-w-sm items-start gap-6 sm:max-w-4xl sm:grid-cols-2 md:gap-6 lg:max-w-6xl lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Flashcards</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Create flashcards from files or text for efficient learning.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="pl-0" variant="link">
                <a href="/flashcards">Learn more</a>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Build courses with a single word for focused learning.</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="pl-0" variant="link">
                <a href="/courses">Learn more</a>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Design quizzes on any topic or from files for interactive
                learning.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="pl-0" variant="link">
                <a href="/quizzes">Learn more</a>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Files</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Chat with files for an interactive educational experience.</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="pl-0" variant="link">
                <a href="/files">Learn more</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      <section className="space-y-12 mt-10">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Techniques
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto">
            Share your knowledge and make a difference in someone's life.
          </p>
        </div>
        <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Pomodoro</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Boost productivity with the Pomodoro Technique, using focused
                intervals for effective learning.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="pl-0" variant="link">
                <a href="/learning/techniques/pomodoro">Learn more</a>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Create your own</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Create your own learning timer to personalize study sessions for
                maximum efficiency.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="pl-0" variant="link">
                Learn more
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Group studying</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Collaborate and learn together with group studying, enhancing
                understanding through shared knowledge.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="pl-0" variant="link">
                Learn more
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default page;
