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
import { Button } from "./ui/button";
import { z } from "zod";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { flashcardCreationSchema } from "@/lib/validators/flashcard";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type Props = {};

type Input = z.infer<typeof flashcardCreationSchema>;

const CreateFlashcard = (props: Props) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false);
  const [finishedLoading, setFinishedLoading] = React.useState(false);
  const { toast } = useToast();
  const { mutate: getFlashcards, isLoading } = useMutation({
    mutationFn: async ({ amount, title, topic }: Input) => {
      const response = await axios.post("/api/flashcard", {
        amount,
        title,
        topic,
      });
      console.log("TITEJ");
      return response.data;
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(flashcardCreationSchema),
  });

  const onSubmit = async (data: Input) => {
    console.log("CLICKED");
    setShowLoader(true);
    getFlashcards(data, {
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
      onSuccess: ({ flashcardId }: { flashcardId: string }) => {
        setFinishedLoading(true);
        console.log("DID IT");
      },
    });
  };
  form.watch();

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2x">Create Flashcard</CardTitle>
          <CardDescription>Create a flashcard list.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a name..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Please provide a title for the flashcards list
                    </FormDescription>
                  </FormItem>
                )}
              />
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

export default CreateFlashcard;
