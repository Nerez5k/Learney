import CreateCourseForm from "@/components/CreateCourseForm";
import { InfoIcon } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0">
      <h1 className="self-center text-3xl font-bold text-center sm:text-6xl">
        Create your Course
      </h1>
      <div className="flex p-4 mt-5 border-none bg-secondary">
        <InfoIcon className="w-12 h-12 mr-3 text-purple-400" />
        <div>
          Enter in a course title, or what do you want to learn about. Then
          enter a list of units, which are the specifics you want to learn. And
          then our AI will generate a course for you!
        </div>
      </div>

      <CreateCourseForm />
    </div>
  );
};

export default Page;
