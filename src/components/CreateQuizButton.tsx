"use client"
import React, { useState } from 'react'
import { Dialog, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

type Props = {}

const CreateQuizButton = (props: Props) => {
  const router = useRouter();
    
  return (
    <Button onClick={() => {
      router.push(`/quizzes/create`)
    }}>Create Quiz</Button>
  )
}

export default CreateQuizButton;