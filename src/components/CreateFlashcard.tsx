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

type Props = {};

type Input = z.infer<typeof flashcardCreationSchema>;

const CreateFlashcard = (props: Props) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false);
  const [finishedLoading, setFinishedLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<Input>({
    resolver: zodResolver(flashcardCreationSchema),
  });
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
            <form className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a name..." {...field} />
                    </FormControl>
                    <FormDescription>Please provide a name</FormDescription>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter amount..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateFlashcard;
