import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Play, ArrowRight, Sparkles, Layers } from 'lucide-react';
import ProjectModal from './ProjectModal';
import Counter from './Counter';

// Helper component to display ROI with animated numbers
const ROIDisplay = ({ roi }) => {
    // Extract percentage if present
    const percentageMatch = roi.match(/(\d+)%/);
    const hoursMatch = roi.match(/(\d+)(?:-\d+)?\s*hours?/);

    if (percentageMatch) {
        const percentage = parseInt(percentageMatch[1]);
        const beforePercent = roi.substring(0, roi.indexOf(percentageMatch[0]));
        const afterPercent = roi.substring(roi.indexOf(percentageMatch[0]) + percentageMatch[0].length);

        return (
            <span>
                {beforePercent}<Counter from={0} to={percentage} suffix="%" />{afterPercent}
            </span>
        );
    } else if (hoursMatch) {
        const hours = parseInt(hoursMatch[1]);
        const beforeHours = roi.substring(0, roi.indexOf(hoursMatch[1]));
        const afterHours = roi.substring(roi.indexOf(hoursMatch[1]) + hoursMatch[1].length);

        return (
            <span>
                {beforeHours}<Counter from={0} to={hours} />{afterHours}
            </span>
        );
    }

    return <span>{roi}</span>;
};

const projects = [
    {
        id: 7,
        title: "Autonomous AR Recovery Agent",
        category: "FinOps Automation",
        image: "/Automonous AR recovery agent/Conversational agent.jpg",
        tools: ["n8n", "Airtable", "OpenRouter", "Gmail", "Slack", "AI Agent"],
        roi: "4-5 hours saved daily · End-to-end autonomous recovery",
        description: "An AI agent that autonomously handles the full accounts receivable recovery cycle — from proactive outreach to payment plans, disputes, and escalations — with no human involvement.",
        fullDescription: `AR officers typically spend 4–5 hours daily on manual follow-ups, missing responses, forgetting clients, and leaving money uncollected. I built an AI agent that handles the entire recovery process end-to-end — autonomously.

**Proactive Outreach:**
Every morning at 8am, the system scans all overdue accounts from the database and sends each debtor a personalized outreach email with a direct link to the AR agent. No human involvement, no manual list checking — done in minutes.

**Autonomous Conversations:**
When a client clicks the link, the agent takes over. This is not a chatbot that sends generic reminders — it conducts the full recovery conversation and takes independent, controlled action:

• Client states their invoice → Agent looks it up instantly from the live database
• Understands *why* they haven't paid — cash flow, dispute, or simply forgot
• Proposes a payment plan, logs the commitment, sends written confirmation, and notifies the AR team — all in under a minute
• Bank details requested? Provided in seconds
• Dispute raised? Logged, query team notified, confirmation sent
• Too complex? Escalated to a human specialist with a full conversation summary

**Boundary Awareness:**
During development, I tested with a legal threat: *"I am not paying this invoice. My lawyers will be contacting you shortly."* The agent immediately stopped negotiating, escalated to the AR team, and sent the client a professional holding email. It knew exactly where its boundaries were.

**Key Insight:**
Domain knowledge is the difference between an agent that works and one that just responds. Any developer can connect tools — not every developer knows when to escalate, how to handle a dispute, and why a vague commitment is never good enough.

**Impact:**
• ⚡ 4–5 hours saved daily on manual follow-ups
• 🤖 Fully autonomous recovery conversations
• 📋 Automatic payment plan logging & confirmation
• ⚖️ Intelligent dispute handling & escalation
• 🛡️ Boundary-aware — knows when to stop and escalate
• 📧 Proactive daily outreach with zero manual effort`,
        gallery: [
            "/Automonous AR recovery agent/Conversational agent.jpg",
            "/Automonous AR recovery agent/conversational agent escalation.jpg",
            "/Automonous AR recovery agent/dispute agent.jpg",
            "/Automonous AR recovery agent/dispute screenshot rv.jpg",
            "/Automonous AR recovery agent/payment plan screenshot rev.jpg",
            "/Automonous AR recovery agent/Pro avctive outreach.jpg"
        ],
        videoLink: "https://youtu.be/YG4FPPidhvk",
        link: "#"
    },
    {
        id: 6,
        title: "B2B Sales Prospecting Agent",
        category: "Sales Automation",
        image: "/B2B Sales Prospecting Agent/b2b sales prospecting agent main workflow.jpg",
        tools: ["n8n", "Airtable", "Slack", "AI Agent", "Error Handling"],
        roi: "20+ hours saved monthly · Fully automated prospecting",
        description: "An intelligent B2B sales prospecting agent that automates lead research, qualification, and outreach — with built-in error handling and daily Slack summaries.",
        fullDescription: `A fully automated B2B sales prospecting system built in n8n that handles the entire prospecting pipeline — from lead discovery to outreach.

**The Workflow:**
1. **Automated Prospecting**: The agent autonomously researches and identifies potential B2B leads based on defined criteria.
2. **Smart Qualification**: Each prospect is scored and routed through a switch node for intelligent categorization.
3. **Airtable Integration**: All qualified leads are logged and tracked in Airtable with full context and scoring data.
4. **Slack Escalation**: High-priority prospects trigger instant Slack notifications for immediate follow-up.
5. **Daily Summary**: Automated daily digest sent via Slack with prospecting activity and results.
6. **Error Handling**: Robust error trigger workflow ensures no leads are lost — failures are caught, logged, and escalated.

**Key Features:**
• 🤖 Fully autonomous prospecting with AI-powered research
• 📊 Structured lead data stored in Airtable
• 🔔 Real-time Slack alerts for hot prospects
• 📋 Daily summary reports for team visibility
• ⚠️ Dedicated error handling workflow for reliability
• 🔀 Switch node logic for intelligent lead routing

**Impact:**
• ⚡ 20+ hours saved monthly on manual prospecting
• 🎯 Consistent lead qualification criteria
• 📈 Zero missed prospects with error recovery
• 💰 Increased pipeline velocity through instant outreach`,
        gallery: [
            "/B2B Sales Prospecting Agent/b2b sales prospecting agent main workflow.jpg",
            "/B2B Sales Prospecting Agent/b2b sales prospecting agent - airtable.jpg",
            "/B2B Sales Prospecting Agent/b2b sales prospecting agent - error handler.jpg",
            "/B2B Sales Prospecting Agent/b2b sales prospecting agent slack escalation.jpg",
            "/B2B Sales Prospecting Agent/b2b sales prospecting agent switch node.jpg",
            "/B2B Sales Prospecting Agent/b2b sales prospecting daily summary.jpg"
        ],
        videoLink: "https://youtu.be/nKP5kXa_msQ",
        link: "#"
    },
    {
        id: 5,
        title: "AI-Powered Hiring System",
        category: "HR Automation",
        image: "/HR folder/Hiring pipeline stage 2 HR.jpg",
        tools: ["n8n", "Airtable", "AI Screening", "Email Automation"],
        roi: "15–20 hours saved monthly · 100% response rate",
        description: "AI hiring system that automatically screens, scores, and responds to applicants daily — zero missed candidates.",
        fullDescription: `A client was spending 3 days reviewing CVs and still losing top candidates.

I built an AI-powered hiring system that automatically screens, scores, and responds to applicants daily.

Candidates are evaluated on experience, relevance, and quality, then routed:
• Top → Instant interview
• Mid → Manager review
• Low → Automated rejection

Result:
15–20 hours saved monthly, 100% response rate, zero missed candidates.`,
        gallery: [
            "/HR folder/Hiring pipeline stage 2 HR.jpg",
            "/HR folder/Hiring pipeline stage 1 HR.jpg",
            "/HR folder/airtable screenshot HR.jpg",
            "/HR folder/daily summary hr.jpg",
            "/HR folder/interview screenshot.jpg",
            "/HR folder/slack notification hr.jpg"
        ],
        videoLink: "https://youtu.be/gnwoMSzclH8",
        link: "#"
    },
    {
        id: 1,
        title: "AI Risk Analyzer & Credit Scorer",
        category: "FinOps Automation",
        image: "/risk_logic.jpg",
        tools: ["n8n", "Airtable", "Gemini", "Gmail", "Slack"],
        roi: "97% time reduction (15 hrs/week → 30 mins)",
        description: "An intelligent agent that analyzes customer credit history and predicts risk probability.",
        fullDescription: `I built an n8n workflow that handles debt collection intelligently, reducing manual effort by 97% while maintaining client relationships.

**The Workflow:**
1. **Schedule Trigger**: Queries Airtable daily for overdue invoices.
2. **Smart Switch Node**: Routes clients based on days overdue:
   • 🟢 **Friendly** (1-7 days): Polite reminder
   • 🟡 **Firm** (8-21 days): Professional escalation
   • 🔴 **Final** (22+ days): Urgent notice
3. **AI Email Generation**: Google Gemini writes context-aware emails (not templates) considering client history.
4. **Auto-Execute**: Gmail sends the email, Airtable logs the activity.
5. **Daily Slack Digest**: Finance team gets a summary.

**Impact:**
• ⚡ 97% time reduction (15 hrs/week → 30 mins)
• 💰 60+ hours reclaimed monthly
• 🎯 Tone adaptation protects client relationships`,
        gallery: [
            "/risk_logic.jpg",
            "/risk_database_airtable.jpg",
            "/risk_result_slack_notification.jpg"
        ],
        link: "#"
    },
    {
        id: 2,
        title: "AI Invoice Processing Agent",
        category: "FinOps Automation",
        image: "/auto_logic.jpg",
        tools: ["Make.com", "Google Gemini", "Airtable", "Slack", "CloudConvert", "Dropbox"],
        description: "AI-powered invoice extraction system that processes invoices 24/7, eliminating manual data entry.",
        roi: "10-20 hours/week saved on invoice data entry",
        fullDescription: `Most finance teams waste 10-20 hours per week on invoice data entry. I built an AI system that does it in seconds—no human intervention, no errors, no burnout.

**The Workflow:**
1. **Gmail Trigger**: Watches for new invoice emails
2. **CloudConvert**: Converts PDF invoices to readable text
3. **Google Gemini AI**: Extracts structured data:
   • Vendor name
   • Invoice date
   • Currency
   • Amount
   • 1-sentence summary
4. **Logic Router**: Validates data quality
5. **Smart Routing**:
   • ✅ Complete data → Auto-filed to Airtable
   • ⚠️ Incomplete/bad data → Slack alert for manual review

**Problem #1: The API Roadblock**
I initially tried uploading files directly to Google Drive but hit "Restricted Scope - Access Denied" errors. After 2 hours of debugging, I realized Google's API restrictions wouldn't allow what I needed.

*Solution:* Switched to Dropbox for file storage. More flexible API, no permission headaches. **Lesson: Don't fight the tool. Find the right tool.**

**Problem #2: The Silent Killer**
The first week looked perfect. Then a vendor sent an invoice with a missing total amount. The AI extracted "null," Airtable accepted it, and the invoice disappeared into the void. I only found out when someone asked: "Where's the ABC Corp invoice?"

*Solution:* Built a validation router with two paths. Now every invoice either gets filed correctly OR flags for human review. Nothing falls through the cracks.

**Impact:**
• ⚡ 10-20 hours/week saved on data entry
• 🎯 Zero typos in vendor names or amounts
• 📋 No forgotten invoices—audit-ready records
• 🤖 24/7 automated processing`,
        gallery: [
            "/auto_logic.jpg",
            "/auto_database.jpg",
            "/auto_result.jpg",
            "/auto_drive.jpg"
        ],
        link: "#"
    },
    {
        id: 4,
        title: "Business Intake & Outreach Automation",
        category: "Revenue Operations",
        image: "/n8n-flow-business-intake.jpg",
        tools: ["n8n", "Airtable", "Google Drive", "ClickUp", "Make.com"],
        roi: "35+ hours saved monthly · $7,000 in monthly time value",
        description: "An intelligent lead qualification system built for a business coach — scores inbound leads, routes them instantly, and handles all follow-up automatically. Zero manual work.",
        fullDescription: `Spent 3 hours yesterday troubleshooting why my automation wouldn't connect to Airtable.

Double-checked my credentials. Reconfigured everything. Googled every error message.

Then I checked Airtable's status page. It was down. The entire service was just... down.

This is automation. 🙃

---

**THE PROBLEM:**

Sarah runs a coaching business. Gets 40-60 discovery call requests every month.

She was spending 3-4 hours DAILY on:
- Manual lead review
- Copy-pasting calendar links
- Creating client folders
- Logging to spreadsheets
- Setting follow-up reminders

By the time she responded? Leads had already hired someone else.

---

**THE SOLUTION:**

Someone fills the form → System scores them automatically (0-8 points) → Routes to the right path

🟢 **QUALIFIED (7-8 pts):** Instant Calendly email + Google Drive folder created + logged to Airtable as "Qualified"

🟡 **HIGH-POTENTIAL (4-6 pts):** Alert to Sarah + ClickUp task "Follow up within 24h" + full context included

🔴 **NOT READY (0-3 pts):** Free resource packet sent + added to newsletter nurture + logged as "Unqualified"

Everything happens in seconds. Zero manual work.

---

**THE RESULTS:**

⏱️ 35 hours saved per month
💰 $7,000 in monthly time value
📈 100% instant response rate
✅ Zero lost leads from slow response

Sarah now spends her time coaching, not copy-pasting.

---

**TECH STACK:** n8n · Typeform · Gmail · Airtable · ClickUp · Google Drive

Build time: 3-4 days · System value: $5,000–7,000

---

**LESSONS FROM THE TRENCHES:**

→ Date formatting is case-sensitive (spent an hour debugging "Feb YYYY" instead of "Feb 2026")

→ Sometimes your code isn't broken — the service is just down (looking at you, Airtable)

→ "Run Once for Each Item" vs "Run Once for All Items" will catch you (everything showed [undefined] until I figured this out)

→ Pin your test data early (ran out of Typeform test submissions halfway through)

This was my first major n8n build. Learned the platform from scratch for this project. Worth every frustrating error message.`,
        gallery: [
            "/n8n-flow-business-intake.jpg",
            "/airtable-workflow-business-intake.jpg",
            "/code-business-intake.jpg",
            "/graphics-business-intake.jpg",
            "/google-drive-workflow-business-intake.jpg",
            "/clickup-revised.jpg"
        ],
        link: "#"
    },
    {
        id: 3,
        title: "Closed-Loop Lead Management System",
        category: "Revenue Operations",
        image: "/third_logic.jpg",
        tools: ["Make.com", "Airtable", "Mailchimp", "Slack"],
        description: "Intelligent lead ingestion system that eliminates duplicates and ensures 100% data hygiene through conditional routing.",
        roi: "15-20 hours/month saved + zero duplicate leads",
        fullDescription: `Data entry isn't just boring—it's a liability. Duplicate leads, missed follow-ups, and manual errors cause revenue leakage. I built a proof-of-concept "Closed-Loop" lead management system to demonstrate how automation solves this permanently.

**The Architecture:**

🔹 **Real-time Webhook Ingestion** – Listens for lead submissions and triggers instantly (no polling delays)

🔹 **Search-Before-Create Logic** – Queries the database before writing:
   • Lead exists? → Update to "Active" + trigger re-engagement alert
   • New lead? → Create record and sync

🔹 **Conditional Routing** – Router handles both scenarios with strict filters:
   • **Path A (New):** Create → Sync to Mailchimp → Write ID back to database
   • **Path B (Returning):** Update record → Send notification

🔹 **Bi-Directional Sync** – External IDs stored locally so future automations update specific contacts without errors

**The Result:**
✅ Zero duplicates
✅ Instant notifications
✅ Pristine database, zero maintenance

**Why This Matters:**
This demonstrates how businesses can solve complex data challenges using conditional logic, API integrations, and error handling with No-Code tools to build enterprise-grade automation.

**Impact:**
• ⚡ 15-20 hours/month saved on manual data entry
• 🎯 100% data hygiene with zero duplicates
• 📊 Real-time lead tracking and engagement
• 🔄 Bi-directional sync prevents future errors`,
        gallery: [
            "/third_logic.jpg",
            "/third_airtable.jpg",
            "/third-mailchimp.jpg",
            "/third_result.jpg",
            "/third_filter.jpg"
        ],
        link: "#"
    }
];

const filterTabs = [
    { id: 'all', label: 'All Systems' },
    { id: 'finops', label: 'FinOps & AR' },
    { id: 'revops', label: 'Revenue Operations' },
    { id: 'hr', label: 'HR Automation' },
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredProjects = projects.filter((project) => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'finops') return project.category === 'FinOps Automation';
        if (activeFilter === 'revops') return project.category === 'Revenue Operations' || project.category === 'Sales Automation';
        if (activeFilter === 'hr') return project.category === 'HR Automation';
        return true;
    });

    return (
        <section id="work" className="py-32 px-6 bg-stone-50 dark:bg-stone-950 relative">
            <div className="max-w-7xl mx-auto">
                {/* Header & Filter Controls */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
                            <Layers size={14} />
                            Production Deployments
                        </div>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4">
                            Featured Automations &amp; Agents
                        </h2>
                        <p className="text-stone-500 dark:text-stone-400 max-w-xl text-base md:text-lg">
                            Real-world self-driving workflows architected for mission-critical operations with zero human error.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2 p-1.5 bg-stone-200/60 dark:bg-stone-900/80 rounded-2xl border border-stone-300/50 dark:border-white/5 backdrop-blur-md">
                        {filterTabs.map((tab) => {
                            const isActive = activeFilter === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveFilter(tab.id)}
                                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all relative ${
                                        isActive
                                            ? 'text-stone-900 dark:text-white shadow-sm'
                                            : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeFilterPill"
                                            className="absolute inset-0 bg-white dark:bg-stone-800 rounded-xl"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Projects Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                onClick={() => setSelectedProject(project)}
                                className="group relative bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-white/10 hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all duration-300 flex flex-col cursor-pointer hover:shadow-2xl hover:shadow-amber-500/10"
                            >
                                {/* Image Container */}
                                <div className="relative overflow-hidden h-56 w-full bg-stone-100 dark:bg-stone-800">
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20 z-10" />
                                    <img
                                        src={project.image}
                                        alt={`${project.title} - ${project.category} workflow screenshot`}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    
                                    {/* Top Badges */}
                                    <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2">
                                        <span className="px-3 py-1 text-xs font-semibold text-white bg-black/60 backdrop-blur-md rounded-full border border-white/15">
                                            {project.category}
                                        </span>
                                        {project.videoLink && (
                                            <span className="px-3 py-1 text-xs font-semibold text-amber-300 bg-amber-950/70 backdrop-blur-md rounded-full border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
                                                <Play size={11} className="fill-amber-400 text-amber-400" /> Video Walkthrough
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    {/* Tools */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.tools.slice(0, 4).map((tool) => (
                                            <span
                                                key={tool}
                                                className="px-2.5 py-1 text-xs font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-white/5 rounded-md border border-stone-200 dark:border-white/5"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                        {project.tools.length > 4 && (
                                            <span className="px-2 py-1 text-xs font-medium text-stone-400 dark:text-stone-500">
                                                +{project.tools.length - 4} more
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-stone-600 dark:text-stone-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* ROI & Action Row */}
                                    <div className="mt-auto pt-5 border-t border-stone-100 dark:border-white/5 flex items-center justify-between">
                                        <div className="text-amber-600 dark:text-amber-400 font-bold text-sm">
                                            <ROIDisplay roi={project.roi} />
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 dark:text-white group-hover:translate-x-1 transition-transform">
                                            Case Study <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            <ProjectModal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                project={selectedProject}
            />
        </section>
    );
};

export default Projects;
