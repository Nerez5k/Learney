"use client";

import { crateChapterSchema } from "@/lib/validators/course";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";
import { useToast } from "./ui/use-toast";

import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type Input = z.infer<typeof crateChapterSchema>;

const CreateCourseForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: createChapters, isLoading } = useMutation({
    mutationFn: async ({ title, units }: Input) => {
      const response = await axios.post("/api/course/createChapters", {
        title,
        units,
      });
      return response.data;
    },
  });
  const form = useForm<Input>({
    resolver: zodResolver(crateChapterSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });

  function onSubmit(data: Input) {
    if (data.units.some((unit) => unit === "")) {
      return toast({
        title: "Something went wrong!",
        description: "Please fill all the units.",
        variant: "destructive",
      });
    }
    createChapters(data, {
      onSuccess: ({ courseId }) => {
        toast({
          title: "Success!",
          description: "Course created successfully.",
        });
        router.push(`/courses/create/${courseId}`);
      },
      onError: (error) => {
        console.error(error);
        return toast({
          title: "Error!",
          description: "Something went wrong... Please try again later.",
          variant: "destructive",
        });
      },
    });
  }

  form.watch();

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                  <FormLabel className="flex-[1] text-xl ">Tytuł</FormLabel>
                  <FormControl className="flex-[6]">
                    <Input placeholder="Podaj główny temat kursu" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <AnimatePresence>
            {form.watch("units").map((_, index) => {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name={`units.${index}`}
                  render={({ field }) => {
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          opacity: { duration: 0.2 },
                          height: { duration: 0.2 },
                        }}
                      >
                        <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                          <FormLabel className="flex-[1] text-xl">
                            Sekcja {index + 1}
                          </FormLabel>
                          <FormControl className="flex-[6]">
                            <Input
                              placeholder="Podaj tytuł sekcji"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      </motion.div>
                    );
                  }}
                />
              );
            })}
          </AnimatePresence>

          <div className="flex items-center justify-center mt-20">
            <Separator className="flex-[1]" />
            <div className="mx-4">
              <Button
                type="button"
                variant="secondary"
                className="font-semibold"
                onClick={() => {
                  form.setValue("units", [...form.watch("units"), ""]);
                }}
              >
                Dodaj sekcje
                <Plus className="w-4 h-4 ml-2 text-green-500" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="font-semibold ml-3"
                onClick={() => {
                  form.setValue("units", [...form.watch("units").slice(0, -1)]);
                }}
              >
                Usuń sekcje
                <Trash className="w-4 h-4 ml-2 text-red-500" />
              </Button>
            </div>
            <Separator className="flex-[1]" />
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full mt-6"
            size="lg"
          >
            Stwórz swój kurs!
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCourseForm;
