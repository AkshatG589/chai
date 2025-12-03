import Image from "next/image";
import styles from "./page.module.css";
import Hero from "@/utility/home/Hero"
import Intro from "@/utility/home/Intro"
import AboutUs from "@/utility/home/AboutUs"

export default function Home() {
  return (
    <>
      
      <Hero />
      <div className="bg-white min-h-1 opacity-50"></div>
      <Intro />
      <div className="bg-white min-h-1 opacity-50"></div>
      <AboutUs />
    </>
  );
}