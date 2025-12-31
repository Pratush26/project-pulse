import Link from "next/link";
import { FaChartLine, FaUsers, FaExclamationTriangle, FaClipboardCheck } from "react-icons/fa";

export default function Home() {
  return (
    <main className="w-full">
      <section className="w-11/12 mx-auto py-20 flex flex-col items-center justify-center text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-b from-(--secondary) to-foreground bg-clip-text text-transparent">
            Project Pulse
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-3xl">
            Real-time project health monitoring platform for IT teams
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Track progress, collect client feedback, manage risks, and ensure project success with automated health scoring
          </p>
        </div>
        <div className="flex gap-4 flex-wrap justify-center mt-8">
          <Link href="/login" className="btn btn-primary trns rounded-lg">Get Started</Link>
          <Link href="/dashboard" className="btn btn-out trns rounded-lg">View Dashboard</Link>
        </div>
      </section>

      <section className="bg-(--base-200) py-16">
        <div className="w-11/12 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Powerful Features for Project Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-(--base-100) p-6 rounded-xl hover:scale-105 trns border border-gray-800">
              <div className="text-4xl text-blue-400 mb-4">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-semibold mb-3">Health Score Tracking</h3>
              <p className="text-gray-400 text-sm">
                Automatically calculate project health scores based on client satisfaction, employee confidence, and progress metrics
              </p>
            </div>

            <div className="bg-(--base-100) p-6 rounded-xl hover:scale-105 trns border border-gray-800">
              <div className="text-4xl text-cyan-400 mb-4">
                <FaClipboardCheck />
              </div>
              <h3 className="text-xl font-semibold mb-3">Weekly Check-Ins</h3>
              <p className="text-gray-400 text-sm">
                Structured feedback system for employees and clients to provide regular updates on project progress and satisfaction
              </p>
            </div>

            <div className="bg-(--base-100) p-6 rounded-xl hover:scale-105 trns border border-gray-800">
              <div className="text-4xl text-orange-400 mb-4">
                <FaExclamationTriangle />
              </div>
              <h3 className="text-xl font-semibold mb-3">Risk Management</h3>
              <p className="text-gray-400 text-sm">
                Identify, track, and mitigate project risks with severity levels and resolution tracking across all projects
              </p>
            </div>

            <div className="bg-(--base-100) p-6 rounded-xl hover:scale-105 trns border border-gray-800">
              <div className="text-4xl text-emerald-400 mb-4">
                <FaUsers />
              </div>
              <h3 className="text-xl font-semibold mb-3">Role-Based Access</h3>
              <p className="text-gray-400 text-sm">
                Secure authentication with distinct permissions for admins, employees, and clients ensuring data privacy
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 w-11/12 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Built for Every Team Member
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 p-6 bg-(--base-200) rounded-xl">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-400">A</span>
            </div>
            <h3 className="text-2xl font-semibold">For Admins</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Create and manage projects with full oversight</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Assign clients and employees to projects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Monitor project health across all initiatives</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Intervene early when projects show risk signals</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 p-6 bg-(--base-200) rounded-xl">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-cyan-400">E</span>
            </div>
            <h3 className="text-2xl font-semibold">For Employees</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Submit weekly progress updates with ease</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Report blockers and challenges transparently</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Track confidence levels and completion estimates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Manage risks with mitigation plans</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 p-6 bg-(--base-200) rounded-xl">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-emerald-400">C</span>
            </div>
            <h3 className="text-2xl font-semibold">For Clients</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>View real-time status of your projects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Provide weekly satisfaction feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Rate communication and progress clarity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Flag issues when concerns arise</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-(--base-200) py-16">
        <div className="w-11/12 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h4 className="text-lg font-semibold">Create Projects</h4>
              <p className="text-sm text-gray-400">
                Admins set up projects with timelines and assign team members
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h4 className="text-lg font-semibold">Weekly Check-Ins</h4>
              <p className="text-sm text-gray-400">
                Team members submit progress updates and clients provide feedback
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h4 className="text-lg font-semibold">Health Tracking</h4>
              <p className="text-sm text-gray-400">
                System automatically calculates project health scores
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                4
              </div>
              <h4 className="text-lg font-semibold">Early Intervention</h4>
              <p className="text-sm text-gray-400">
                Identify risks early and take corrective action before issues escalate
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 w-11/12 mx-auto">
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-2xl p-12 text-center space-y-6 border border-blue-800/50">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your Project Management?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join teams that trust ProjectPulse to keep their projects on track and clients satisfied
          </p>
          <div className="flex gap-4 flex-wrap justify-center mt-8">
            <Link href="/login" className="btn btn-primary trns px-8 py-3 rounded-lg text-base">
              Login Now
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-(--base-200) py-12">
        <div className="w-11/12 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400">100%</div>
              <div className="text-sm text-gray-400 mt-2">Automated Tracking</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400">Real-time</div>
              <div className="text-sm text-gray-400 mt-2">Health Updates</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400">3 Roles</div>
              <div className="text-sm text-gray-400 mt-2">Admin, Employee, Client</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400">Secure</div>
              <div className="text-sm text-gray-400 mt-2">Role-based Access</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
