"use client";
import React from 'react';
import { motion } from 'framer-motion';

const CommunityCards = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Jan Kowalski',
      title: 'Dyrektor Generalny',
      text: 'Niesamowite doświadczenie współpracy z tą firmą. Profesjonalizm na każdym kroku.'
    },
    {
      id: 2,
      name: 'Anna Nowak',
      title: 'Menadżer Projektu',
      text: 'Efektywność i kreatywność to słowa, które najlepiej opisują naszą współpracę.'
    },
  ];
  

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 p-8">
      {testimonials.map((testimonial) => (
        <motion.div
          key={testimonial.id}
          initial={{ y: -250, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 50, duration: 0.8 }}
          className="max-w-xs w-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="p-5 text-white">
            <h5 className="mb-2 text-2xl font-bold">{testimonial.name}</h5>
            <p className="mb-2 text-sm italic">{testimonial.title}</p>
            <p className="text-base">{testimonial.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CommunityCards;
