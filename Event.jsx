import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Events() {
  const events = [
    {
      title: "Elephant Toothpaste Adventure",
      date: "July 23rd, 2025",
      time: "2:00 PM - 2:45 PM",
      ageGroup: "Ages 8-11",
      location: "Phoenixville Area Library",
      description: "Time to mix science and fun and make foam fly! In this exciting experiment, kids will create a foamy explosion that looks just like a giant tube of toothpaste—perfect for an elephant! Using simple ingredients like hydrogen peroxide, soap, and yeast, they'll learn about chemical reactions and how substances break down to create bubbles and foam. It's a hands-on, exciting way to see science in action while having a blast doing it!",
      posterUrl: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696594fc2acba2d4bc584513/c9c721d64_Science_Fun_Fiyer.png"
    },
    {
      title: "Lava Lamp Fun",
      date: "July 16th, 2025",
      time: "2:00 PM - 2:45 PM",
      ageGroup: "Ages 8-11",
      location: "Phoenixville Area Library",
      description: "Get ready for some fizzy fun! In this experiment, kids will make their very own lava lamps using water, oil, Alka-Seltzer, and a splash of food coloring. Kids will get to see science in action while learning about density and chemical reactions in a way that's super fun and easy to understand. This event gives kids the chance to have fun and learn new things in the summer.",
      posterUrl: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696594fc2acba2d4bc584513/c9c721d64_Science_Fun_Fiyer.png"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#055b8e] to-[#044a73] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ed7219] mb-6"
          >
            <Calendar className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Previous Events
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Check out our past hands-on STEM experiments and community learning experiences
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {events.map((event, index) => (
          <motion.section
            key={event.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-gray-100"
          >
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Poster Image */}
              <div className="lg:col-span-2 bg-gradient-to-br from-[#ed7219]/10 to-[#055b8e]/10 p-8 flex items-center justify-center">
                <img 
                  src={event.posterUrl}
                  alt={`${event.title} Poster`}
                  className="w-full max-w-md rounded-2xl shadow-xl"
                />
              </div>

              {/* Event Details */}
              <div className="lg:col-span-3 p-8 lg:p-12">
                <h2 
                  className="text-3xl sm:text-4xl font-bold text-[#055b8e] mb-2"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  {event.title}
                </h2>
                <p className="text-xl text-[#ed7219] font-semibold mb-6">
                  {event.date}
                </p>

                <h3 
                  className="text-xl font-bold text-[#055b8e] mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  <MapPin className="w-5 h-5 text-[#ed7219]" />
                  {event.location}
                </h3>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-[#055b8e]/5 rounded-full px-4 py-2">
                    <Clock className="w-5 h-5 text-[#055b8e]" />
                    <span className="font-medium text-[#055b8e]">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#ed7219]/10 rounded-full px-4 py-2">
                    <Users className="w-5 h-5 text-[#ed7219]" />
                    <span className="font-medium text-[#ed7219]">{event.ageGroup}</span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* Footer Note */}
      <div className="bg-[#055b8e] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg mb-2">
            Questions about our events?
          </p>
          <a 
            href="mailto:curiosity.quest25@gmail.com" 
            className="text-[#ed7219] hover:underline font-semibold"
          >
            curiosity.quest25@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
