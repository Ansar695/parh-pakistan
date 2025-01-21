import Link from "next/link";
import {
  BookOpen,
  Edit,
  Printer,
  ArrowRight,
  Settings,
  FileQuestion,
  Layers,
  BookOpenCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/items/Heading2";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { StepsCard } from "@/components/shared/StepCard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              EduPaperPro
            </span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 min-h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                Revolutionize Your Exam Creation Process
              </h1>
              <p className="mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl">
                Generate customized exam papers effortlessly for schools,
                colleges, and universities.
              </p>
              <div className="mt-10 flex justify-center">
                <Link href="/select-board">
                  <Button size="lg" variant="secondary">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading>Key Features</SectionHeading>
            <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
              <FeatureCard
                icon={BookOpen}
                title="Comprehensive Question Bank"
                description="Access a vast database of questions organized by subject and chapter."
              />
              <FeatureCard
                icon={Edit}
                title="Customizable Papers"
                description="Select and edit questions to create tailored exam papers for your needs."
              />
              <FeatureCard
                icon={Printer}
                title="Multiple Templates"
                description="Choose from various paper designs and print with ease."
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading>How It Works</SectionHeading>
            <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <StepsCard
                step="1"
                title="Select Board"
                description="Choose the educational board for which you want to create the exam."
                icon={<BookOpenCheck className="w-6 h-6" />}
              />
              <StepsCard
                step="2"
                title="Select Subject"
                description="Pick the subject for which you want to generate questions."
                icon={<BookOpen className="w-6 h-6" />}
              />
              <StepsCard
                step="3"
                title="Select Course/Topics"
                description="Choose specific courses, topics, or chapters to focus on."
                icon={<Layers className="w-6 h-6" />}
              />
              <StepsCard
                step="4"
                title="Select Questions"
                description="Pick from MCQs, short answer, or long answer questions for your exam."
                icon={<FileQuestion className="w-6 h-6" />}
              />
              <StepsCard
                step="5"
                title="Customize"
                description="Tailor the selected questions to fit your specific exam requirements."
                icon={<Settings className="w-6 h-6" />}
              />
              <StepsCard
                step="6"
                title="Print"
                description="Generate your finalized exam paper and print it out."
                icon={<Printer className="w-6 h-6" />}
              />
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Ready to Simplify Your Exam Creation Process?
            </h2>
            <p className="mt-4 text-xl">
              Join thousands of educational institutions already using our
              platform.
            </p>
            <div className="mt-8">
              <Button size="lg" variant="secondary">
                Start Free Trial
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Product", "Company", "Resources", "Legal"].map((category) => (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {["Features", "Pricing", "FAQ"].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="hover:text-blue-400 transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>
              &copy; {new Date().getFullYear()} EduPaperPro. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
