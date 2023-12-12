"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { quizCreationSchema } from "@/lib/validators/quiz";
import { z } from "zod";
import { BookOpen, CopyCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {};

type Input = z.infer<typeof quizCreationSchema>;

const CreateQuiz = (props: Props) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false);
  const [finishedLoading, setFinishedLoading] = React.useState(false);
  const { toast } = useToast();
  const { mutate: getQuestions, isLoading } = useMutation({
    mutationFn: async ({ amount, topic, type }: Input) => {
      const response = await axios.post("/api/game", { amount, topic, type });
      return response.data;
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      amount: 3,
      topic: "",
      type: "multiple_choice",
    },
  });

  const onSubmit = async (data: Input) => {
    setShowLoader(true);
    getQuestions(data, {
      onError: (error) => {
        setShowLoader(false);
        if (error instanceof AxiosError) {
          if (error.response?.status === 500) {
            toast({
              title: "Error",
              description: "Something went wrong. Please try again later.",
              variant: "destructive",
            });
          }
        }
      },
      onSuccess: ({ gameId }: { gameId: string }) => {
        setFinishedLoading(true);
        setTimeout(() => {
          if (form.getValues("type") === "multiple_choice") {
            router.push(`/play/multiple_choice/${gameId}`);
          } else if (form.getValues("type") === "open_ended") {
            router.push(`/play/open-ended/${gameId}`);
          }
        }, 2000);
      },
    });
  };
  form.watch();

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2x">Create Quiz</CardTitle>
          <CardDescription>Choose a file</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a topic..." {...field} />
                    </FormControl>
                    <FormDescription>Please provide a topic</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter an amount..."
                        {...field}
                        type="number"
                        min={1}
                        max={10}
                        onChange={(e) => {
                          form.setValue("amount", parseInt(e.target.value));
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => {
                    form.setValue("type", "multiple_choice");
                  }}
                  className="w-1/2 rounded-none rounded-l-lg"
                  variant={
                    form.getValues("type") === "multiple_choice"
                      ? "default"
                      : "secondary"
                  }
                >
                  <CopyCheck className="w-4 h-4 mr-2" />
                  Multiple Choice
                </Button>
                <Separator orientation="vertical" />
                <Button
                  type="button"
                  onClick={() => {
                    form.setValue("type", "open_ended");
                  }}
                  className="w-1/2 rounded-none rounded-r-lg"
                  variant={
                    form.getValues("type") === "open_ended"
                      ? "default"
                      : "secondary"
                  }
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Open Ended
                </Button>
              </div>
              <Button disabled={isLoading} type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateQuiz;
