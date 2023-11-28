import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start">
      <div className="p-5">
        <ul>
          <p className="text-gray-800 font-bold text-3xl pb-6">
            Learn<span className="text-purple-600">ey</span>
          </p>
          <div className="flex gap-6 pb-5">
            <Instagram href="" className="cursor-pointer hover:text-purple-600" />
            <a href= "https://github.com/Nerez5k"><Github  className="cursor-pointer hover:text-gray-600" /></a>
            <Linkedin className="cursor-pointer hover:text-blue-500" />
          </div>
        </ul>
      </div>

      <div className="p-5">
        <ul>
          <p className="text-gray-800 font-bold text-2xl pb-4">Services</p>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-purple-500 cursor-pointer">
            Files
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-purple-500 cursor-pointer">
            Quizzes
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-purple-500 cursor-pointer">
            Courses
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-purple-500 cursor-pointer">
            Flashcards
          </li>
        </ul>
      </div>

      <div className="p-5">
        <ul>
        <p className="text-gray-800 font-bold text-2xl pb-4">Company</p>
        <li className="text-gray-500 text-md pb-2 font-semibold hover:text-purple-500 cursor-pointer">
            About
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-purple-500 cursor-pointer">
            Team
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-purple-500 cursor-pointer">
            Security
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-purple-500 cursor-pointer">
            Contact Us
          </li>
        </ul>
      </div>

      <div className="p-5">
        <ul>
        <p className="text-gray-800 font-bold text-2xl pb-4">Legal</p>
        <li className="text-gray-500 text-md pb-2 font-semibold hover:text-purple-500 cursor-pointer">
           Data Privacy
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-purple-500 cursor-pointer">
            Privacy Policy
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-purple-500 cursor-pointer">
            Cookie Policy
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-purple-500 cursor-pointer">
          Terms of Service
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
