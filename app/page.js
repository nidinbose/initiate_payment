'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent leading-tight">
            Stop Procrastinating. Get Unstuck.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-10 text-gray-300">
            <em>
              The 2-Hour Masterclass to Hack Your Lazy Brain into Maximum
              Productivity.
            </em>
          </p>

          {/* Floating Payment Button */}
          <div className="fixed bottom-5 right-5 z-50">
            <button
              onClick={() => router.push('/payment')}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 md:gap-3 text-base md:text-lg"
            >
              <span className="text-xl md:text-2xl">₹2</span>
              <span>Join Masterclass</span>
            </button>
          </div>
        </div>

        {/* Problem Section */}
        <section className="max-w-4xl mx-auto mb-16 px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-red-400">
            The Problem: Why You're Stuck
          </h2>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
            <p className="text-base md:text-lg leading-relaxed mb-6">
              You have talent, drive, and huge goals. But every morning, your
              brain tells you to hit the snooze button on your life. You delay,
              you feel guilty, and you watch your most important ambitions
              gather dust.
            </p>
            <p className="text-base md:text-lg leading-relaxed font-semibold text-yellow-400">
              It's not a lack of willpower; it's a glitch in your system. Your
              brain is designed to save energy, and it sees hard work as a
              threat. The UNSTUCK Masterclass is the solution.
            </p>
          </div>
        </section>

        {/* Promise Section */}
        <section className="max-w-4xl mx-auto mb-16 px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-green-400">
            The Promise: Your 2-Hour Transformation
          </h2>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
            <p className="text-base md:text-lg leading-relaxed mb-8">
              In just <strong className="text-yellow-400">120 minutes</strong>,
              this intense, actionable Masterclass gives you the psychological
              tools to{' '}
              <strong className="text-yellow-400">transform your life</strong>{' '}
              and instantly overcome procrastination. We focus on{' '}
              <strong className="text-yellow-400">
                brain chemistry, not calendars.
              </strong>
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
                  desc="Get the proven framework to build blocks of 'unbreakable' focus, eliminating mental noise and digital distractions without burning out."
                />
                <Feature
                  icon="🔓"
                  title="Unlock Time"
                  desc="Stop wasting hours fighting yourself. Free up significant time and mental energy to pursue the activities and goals that truly matter."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="max-w-4xl mx-auto mb-16 px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-blue-400">
            This Masterclass is for You if:
          </h2>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
            <ul className="space-y-4 text-base md:text-lg">
              <ListItem text="You constantly plan your week but never finish your priorities." />
              <ListItem text="You feel stressed and guilty about the things you know you should be doing." />
              <ListItem text="You start projects strong but always lose momentum halfway through." />
              <ListItem text="You need a fast, proven fix — not a lengthy, drawn-out course." />
            </ul>
          </div>
        </section>

        {/* Class Details */}
        <section className="max-w-4xl mx-auto mb-16 px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-purple-400">
            Class Details & Enrollment
          </h2>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
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
                  <TableRow feature="Bonus" details='"Momentum Activation" Workbook & Checklist' />
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl border border-yellow-400/30">
              <p className="text-base md:text-lg font-semibold text-center">
                Stop losing your best ideas to procrastination. Invest 2 hours.
                Transform your life.
              </p>
            </div>
          </div>
        </section>

        {/* Instructor Section */}
        <section className="max-w-4xl mx-auto mb-16 px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-indigo-400">
            Meet Your Instructor
          </h2>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
            <p className="text-base md:text-lg leading-relaxed">
              Hi, I'm Abimanue Analytix. I designed this 2-hour hack after years
              of studying behavioral psychology and neuroscience. My goal is to
              give you the most powerful tools{' '}
              <strong className="text-yellow-400">without the fluff</strong>. If
              you're ready to stop fighting your brain and start using its full
              power, I'll see you in the Masterclass.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-300">{desc}</p>
      </div>
    </div>
  );
}

function ListItem({ text }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-red-500 text-xl">•</span>
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
