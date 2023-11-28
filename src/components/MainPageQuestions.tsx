"use client";
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

type Props = {}

const MainPageQuestions = (props: Props) => {
  return (
    <Accordion type="single" collapsible className="mx-auto max-w-6xl lg:px-8 pb-20">
    <AccordionItem value="item-1">
      <AccordionTrigger>What is Learney and how can it help me?</AccordionTrigger>
      <AccordionContent>
      Learney is an innovative platform that leverages artificial intelligence to enhance your learning experience. It allows you to upload documents and books, and then engage in conversations with them, making the content interactive and easier to understand. Additionally, Learney enables you to create flashcards and courses, facilitating a more effective study process.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>How do I chat with my documents on Learney?</AccordionTrigger>
      <AccordionContent>
      Simply upload any PDF or document to the Learney platform. Our AI will process the document and enable you to ask questions, clarify doubts, and discuss the content as if you were conversing with a study partner. This can be particularly useful for quickly absorbing information and engaging with material on a deeper level.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>How does Learney facilitate learning from documents and books?</AccordionTrigger>
      <AccordionContent>
      Learney uses AI to analyze and understand the content of your uploaded documents and books. It then allows you to interact with this content through a conversational interface, where you can ask questions and get explanations as if you were discussing the material with a tutor.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-4">
      <AccordionTrigger>Is Learney suitable for all levels of learners?</AccordionTrigger>
      <AccordionContent>
      Yes, Learney is designed to cater to learners at various levels. Whether you're a beginner looking to grasp basic concepts or an advanced student diving into complex material, Learney's adaptive AI can assist you in your educational journey.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-5">
      <AccordionTrigger>Can I collaborate with others on Learney?</AccordionTrigger>
      <AccordionContent>
      While the core functionality of Learney revolves around individual learning, we are developing features that will allow for collaboration and sharing of flashcards, courses, and document discussions, enabling a community-driven learning experience.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  )
}
export default MainPageQuestions;