"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import SplitType from "split-type";

function Typo() {
  const lenisRef = useRef();
  const charsRef = useRef([]);
  const wordsRef = useRef([]);
  const linesRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    lenisRef.current = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
      syncTouch: true,
    });

    const raf = (time) => {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Split text elements
    const splitElements = () => {
      document.querySelectorAll(".target").forEach((element) => {
        const text = new SplitType(element, { types: "chars,words,lines" });
        charsRef.current = [...charsRef.current, ...text.chars];
        wordsRef.current = [...wordsRef.current, ...text.words];
        linesRef.current = [...linesRef.current, ...text.lines];
      });
    };

    splitElements();

    // Set initial states
    gsap.set(charsRef.current, {
      opacity: 0.1,
      y: 100,
      rotationX: 90,
      transformStyle: "preserve-3d",
    });

    gsap.set(".scale-text", { scale: 0.8, opacity: 0 });
    gsap.set(".slide-in", { x: "100vw" });
    gsap.set(".rotate-in", { rotation: 90, opacity: 0 });
    gsap.set(".fade-in", { opacity: 0, y: 50 });
    gsap.set(".parallax-text", { y: 0 });

    // Character animation
    charsRef.current.forEach((char) => {
      gsap.to(char, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        ease: "power4.out",
        scrollTrigger: {
          trigger: char.parentNode,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });
    });

    // Word scale animation
    wordsRef.current.forEach((word) => {
      gsap.to(word, {
        scale: 1,
        opacity: 1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: word,
          start: "top 90%",
          end: "top 50%",
          scrub: true,
        },
      });
    });

    // Section animations
    gsap.to(".slide-in", {
      x: 0,
      stagger: 0.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".slide-section",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    gsap.to(".rotate-in", {
      rotation: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: {
        trigger: ".rotate-section",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    // New animations
    gsap.to(".fade-in", {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".fade-section",
        start: "top 80%",
        end: "center center",
        scrub: 1,
      },
    });

    gsap.to(".parallax-text", {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".stagger-fade-in > *", {
      opacity: 1,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".stagger-fade-in",
        start: "top 80%",
        end: "center center",
        scrub: 1,
      },
    });

    // Cleanup
    return () => {
      lenisRef.current.destroy();
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, []);

  return (
    <div className="uppercase">
      <div className="fixed top-0 w-full h-[100vh] flex items-center justify-center">
        <h1 className="text-4xl scale-text animate-pulse">
          Begin Your Journey
        </h1>
      </div>

      <div className="flex flex-col w-screen relative px-8 py-6 mt-[750px]">
        <h2 className="content_title text-[8vw] leading-[0.8] text-center grid gap-8">
          <span className="target">Dream beyond limits</span>
          <span className="target gradient-text">Defy expectations</span>
          <span className="target">Create your legacy</span>
        </h2>
      </div>

      <div className="slide-section flex flex-col w-screen relative px-8 py-6 my-[350px]">
        <p className="slide-in max-w-4xl mx-auto my-6 text-2xl leading-relaxed text-center">
          <span className="gradient-text font-bold">Innovation</span> begins
          where comfort ends. Every great achievement started as a mere thought,
          a spark in someone's imagination. We are limited only by the
          boundaries we set for ourselves.
        </p>
      </div>

      <div className="rotate-section flex flex-col w-screen relative px-8 py-6 my-[350px]">
        <h3 className="rotate-in text-[6vw] text-center mb-20">
          Embrace the unknown
        </h3>
        <p className="rotate-in max-w-3xl mx-auto text-xl text-center">
          True growth happens when we venture beyond familiar territories. The
          digital frontier awaits those brave enough to explore its depths and
          persistent enough to master its challenges.
        </p>
      </div>

      <div className="flex flex-col w-screen relative px-8 py-6 my-[350px]">
        <h2 className="content_title text-[7vw] text-center mask-reveal">
          <span className="target">Create</span>
          <span className="target gradient-text">Inspire</span>
          <span className="target">Evolve</span>
        </h2>
      </div>

      {/* New sections with additional animations */}
      <div className="fade-section flex flex-col w-screen relative px-8 py-6 my-[350px]">
        <h3 className="fade-in text-[5vw] text-center mb-10">
          Unleash Your Potential
        </h3>
        <p className="fade-in max-w-3xl mx-auto text-xl text-center">
          Every line of code you write, every design you create, and every
          problem you solve is a step towards realizing your full potential.
          Embrace the journey of continuous learning and growth in the
          ever-evolving world of technology.
        </p>
      </div>

      <div className="parallax-section h-[100vh] flex items-center justify-center relative overflow-hidden">
        <h2 className="parallax-text text-[10vw] font-bold text-center">
          Scroll to Discover
        </h2>
      </div>

      <div className="stagger-fade-in flex flex-col w-screen relative px-8 py-6 my-[350px]">
        <h3 className="text-[4vw] text-center mb-10">The Future is Now</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h4 className="text-2xl font-bold mb-4">Innovate</h4>
            <p>
              Push the boundaries of what's possible with cutting-edge
              technology.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h4 className="text-2xl font-bold mb-4">Create</h4>
            <p>Bring your ideas to life with powerful tools and frameworks.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h4 className="text-2xl font-bold mb-4">Transform</h4>
            <p>Shape the digital landscape and make a lasting impact.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-screen relative px-8 py-6 my-[350px]">
        <h2 className="text-[6vw] text-center letter-spacing-animation">
          The journey begins now
        </h2>
      </div>
    </div>
  );
}

export default Typo;
