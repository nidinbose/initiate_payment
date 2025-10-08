'use client';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-orange-900 to-yellow-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent leading-tight drop-shadow-lg">
            Stop Procrastinating. Get Unstuck.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-10 text-gray-300 italic">
            The 2-Hour Masterclass to Hack Your Lazy Brain into Maximum Productivity.
          </p>
            <div className="mx-auto">
  <Image
    src="/Images/P1.JPG"
    alt="Poster"
    width={384} 
    height={256}
    className="object-cover mx-auto"
  />
</div>
          {/* Floating Payment Button */}
          <div className="fixed bottom-5 right-5 z-50">
            <button
              onClick={() => router.push('/payment')}
              className="bg-gradient-to-r from-yellow-400 to-orange-600 hover:from-yellow-500 hover:to-orange-700 text-black font-bold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 md:gap-3 text-base md:text-lg"
            >
              <span className="text-xl md:text-2xl">₹99</span>
              <span>Join Masterclass</span>
            </button>
          </div>
        </div>

        <Section
          title="The Problem: Why You&#39;re Stuck"
          color="text-red-400"
        >
          <p className="text-base md:text-lg leading-relaxed mb-6">
            You have talent, drive, and huge goals. But every morning, your brain tells you to hit the snooze button on your life. You delay, you feel guilty, and you watch your most important ambitions gather dust.
          </p>
          <p className="text-base md:text-lg leading-relaxed font-semibold text-yellow-400">
            It&#39;s not a lack of willpower; it&#39;s a glitch in your system. Your brain is designed to save energy, and it sees hard work as a threat. The UNSTUCK Masterclass is the solution.
          </p>
        </Section>

        {/* Promise Section */}
        <Section
          title="The Promise: Your 2-Hour Transformation"
          color="text-yellow-400"
        >
          <p className="text-base md:text-lg leading-relaxed mb-8">
            In just <strong className="text-yellow-400">120 minutes</strong>, this intense, actionable Masterclass gives you the psychological tools to <strong className="text-yellow-400">transform your life</strong> and instantly overcome procrastination. We focus on <strong className="text-yellow-400">brain chemistry, not calendars.</strong>
          </p>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Feature
                icon="⚡"
                title="Instant Start Trigger"
                desc="Master the one simple 5-minute technique that forces your brain to stop resisting and start executing any task immediately."
              />
              <Feature
                icon="🧠"
                title="Rewire Motivation"
                desc="Learn how to tap into your natural dopamine cycles so that being productive actually feels easier and more rewarding than procrastinating."
              />
            </div>
            <div className="space-y-4">
              <Feature
                icon="🎯"
                title="Master Deep Focus"
                desc="Get the proven framework to build blocks of &#39;unbreakable&#39; focus, eliminating mental noise and digital distractions without burning out."
              />
              <Feature
                icon="🔓"
                title="Unlock Time"
                desc="Stop wasting hours fighting yourself. Free up significant time and mental energy to pursue the activities and goals that truly matter."
              />
            </div>
          </div>
        </Section>

        {/* Target Audience */}
        <Section
          title="This Masterclass is for You if:"
          color="text-orange-400"
        >
          <ul className="space-y-4 text-base md:text-lg">
            <ListItem text="You constantly plan your week but never finish your priorities." />
            <ListItem text="You feel stressed and guilty about the things you know you should be doing." />
            <ListItem text="You start projects strong but always lose momentum halfway through." />
            <ListItem text="You need a fast, proven fix — not a lengthy, drawn-out course." />
          </ul>
        </Section>

        {/* Class Details */}
        <Section
          title="Class Details & Enrollment"
          color="text-yellow-400"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
            The UNSTUCK 2-Hour Live Masterclass
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="pb-4 pr-4 font-bold">Feature</th>
                  <th className="pb-4 font-bold">Details</th>
                </tr>
              </thead>
              <tbody>
                <TableRow feature="Duration" details="Just 2 Hours (Intense & Actionable)" />
                <TableRow feature="Date & Time" details="Coming Soon - Live Online Session" />
                <TableRow feature="Format" details="Live Online Session (Recording provided)" />
                <TableRow feature="Bonus" details="&#34;Momentum Activation&#34; Workbook & Checklist" />
              </tbody>
            </table>
          </div>
          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 rounded-xl border border-yellow-500/30">
            <p className="text-base md:text-lg font-semibold text-center text-yellow-300">
              Stop losing your best ideas to procrastination. Invest 2 hours. Transform your life.
            </p>
          </div>
        </Section>

        {/* Instructor Section */}
        <Section
          title="Meet Your Instructor"
          color="text-orange-400"
        >
          <p className="text-base md:text-lg leading-relaxed">
            Hi, I&#39;m <strong>Abimanue Analytix</strong>. I designed this 2-hour hack after years of studying behavioral psychology and neuroscience. My goal is to give you the most powerful tools <strong className="text-yellow-400">without the fluff</strong>. If you&#39;re ready to stop fighting your brain and start using its full power, I&#39;ll see you in the Masterclass.
          </p>
        </Section>
      </div>
    </div>
  );
}

/* ------------------------
Reusable Components
------------------------ */
function Section({ title, color, children }) {
  return (
    <section className="max-w-4xl mx-auto mb-16 px-4">
      <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center ${color}`}>
        {title}
      </h2>
      <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 shadow-lg">
        {children}
      </div>
    </section>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <h3 className="font-bold text-lg text-yellow-400">{title}</h3>
        <p className="text-gray-300">{desc}</p>
      </div>
    </div>
  );
}

function ListItem({ text }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-yellow-400 text-xl">•</span>
      <span>{text}</span>
    </li>
  );
}

function TableRow({ feature, details }) {
  return (
    <tr className="border-b border-white/10">
      <td className="py-4 pr-4 font-semibold">{feature}</td>
      <td className="py-4">{details}</td>
    </tr>
  );
}
