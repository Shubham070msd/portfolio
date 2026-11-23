import { useEffect, useState } from "react";
import IncidentLab from "./components/IncidentLab";
import "./App.css";

const EMAIL = "mailto:manjunathhuddar1999@gmail.com";
const GITHUB = "https://github.com/Shubham070msd";
const SOURCE = `${GITHUB}/portfolio/tree/codex/portfolio-refresh`;
const navigation = [
  ["work", "Selected work"],
  ["lab", "AI lab"],
  ["experience", "Experience"],
  ["contact", "Contact"],
];
const projects = [
  {
    title: "Ephemeral environments",
    category: "DEVELOPER EXPERIENCE",
    type: "Internal tooling",
    description:
      "A fresh sandbox for every feature branch. Less setup for QA, more time testing what matters.",
    tags: ["Terraform", "ECS Fargate", "Shell"],
    diagram: ["Pull request", "Terraform", "Isolated environment"],
    context:
      "QA teams needed temporary environments without repeatedly setting up infrastructure by hand.",
    approach:
      "A lightweight CLI provisions feature-branch environments on AWS ECS Fargate using Terraform and Shell.",
    note: "Internal project. Source and deployment details are not published here.",
  },
  {
    title: "Infrastructure behind the game",
    category: "PRODUCTION OPERATIONS",
    type: "Aslan · AWS",
    description:
      "Provisioning, deployments, and observability for a multiplayer gaming platform.",
    tags: ["AWS", "Ansible", "Grafana"],
    diagram: ["Ansible", "Game services", "Metrics & alerts"],
    context:
      "A multiplayer platform needed consistent environments and visibility into production issues.",
    approach:
      "Managed AWS infrastructure, automated Node.js and Docker setup with Ansible, and connected Prometheus, Grafana, and Zabbix for monitoring.",
    note: "Professional work at Block-Stars. This summary describes my infrastructure contribution.",
  },
  {
    title: "Dockerfiles, with a head start",
    category: "AI-ASSISTED TOOLING",
    type: "Internal experiment",
    description:
      "Exploring how a local language model can turn stack context into a first-draft Dockerfile.",
    tags: ["Python", "Ollama", "LLaMA3"],
    diagram: ["Stack context", "Local LLM", "Dockerfile draft"],
    context:
      "Writing similar container configurations repeatedly was an opportunity to experiment with local AI.",
    approach:
      "Built a Python CLI around Ollama and LLaMA3 to generate Dockerfile drafts from application context.",
    note: "Generated files still need dependency checks, build validation, and human review. Source is not published here.",
  },
];
function Tags({ items }) {
  return (
    <ul className="tags" aria-label="Technologies">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    navigation.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-wrap">
          <a
            className="wordmark"
            href="#home"
            aria-label="Manjunath Huddar, home"
            onClick={() => setMenuOpen(false)}
          >
            mh<span>.</span>
          </a>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close menu" : "Menu"}
          </button>
          <nav
            id="navigation"
            aria-label="Main navigation"
            className={menuOpen ? "navigation is-open" : "navigation"}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setMenuOpen(false);
                document.querySelector(".menu-toggle")?.focus();
              }
            }}
          >
            {navigation.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <a className="nav-contact" href={EMAIL}>
            Let’s talk
          </a>
        </div>
      </header>
      <main id="main">
        <section
          className="hero page-width"
          id="home"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> OPEN TO DEVOPS OPPORTUNITIES
            </p>
            <p className="hero-intro">
              Manjunath Huddar <span>/ DevOps Engineer</span>
            </p>
            <h1 id="hero-title">
              Reliable systems.
              <br />
              <span>Thoughtful</span>
              <br />
              automation.
            </h1>
            <p className="hero-description">
              I build and operate cloud infrastructure, simplify releases, and
              turn recurring problems into repeatable solutions. Now exploring
              where AI can make that work better.
            </p>
            <div className="button-row">
              <a className="button primary" href="#work">
                Explore my work
              </a>
              <a
                className="button secondary"
                href={`${EMAIL}?subject=Resume%20request`}
              >
                Request résumé
              </a>
            </div>
            <p className="hero-location">
              Bengaluru, India <span>·</span> AWS / Linux / Automation
            </p>
          </div>
          <div
            className="hero-system"
            aria-label="My engineering workflow: build, ship, observe, improve"
          >
            <div className="system-top">
              <span className="mono">HOW I WORK</span>
              <span className="system-icon" aria-hidden="true">
                ⌘
              </span>
            </div>
            <div className="system-core">
              <span className="core-icon" aria-hidden="true">
                ⌘
              </span>
              <span>
                From code
                <br />
                <strong>to confidence.</strong>
              </span>
            </div>
            <div className="system-flow">
              {[
                ["⌥", "Build", "Reproducible environments", "IaC"],
                ["▧", "Ship", "Repeatable releases", "CI/CD"],
                ["⌁", "Observe", "Signals with context", "OPS"],
                ["✳", "Improve", "Automate what repeats", "AI"],
              ].map(([icon, title, subtitle, tag]) => (
                <div key={title}>
                  <span className="flow-icon" aria-hidden="true">
                    {icon}
                  </span>
                  <p>
                    {title}
                    <span>{subtitle}</span>
                  </p>
                  <span className="flow-tag">{tag}</span>
                </div>
              ))}
            </div>
            <div className="system-bottom">
              <span aria-hidden="true">$</span> make the next incident easier.
            </div>
          </div>
        </section>
        <div className="expertise-strip">
          <div className="page-width">
            <p>
              Built around
              <br />
              <strong>production experience</strong>
            </p>
            <span>Cloud infrastructure</span>
            <span>Delivery pipelines</span>
            <span>Observability</span>
            <span>AI-assisted operations</span>
          </div>
        </div>
        <section
          className="section page-width"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">SELECTED WORK</p>
              <h2 id="work-title">
                Less friction.
                <br />
                More reliable delivery.
              </h2>
            </div>
            <p>
              A few systems and tools I’ve worked on, with the problem and my
              contribution up front.
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project" key={project.title}>
                <div
                  className="project-diagram"
                  aria-label={project.diagram.join(" to ")}
                >
                  {project.diagram.map((step, index) => (
                    <div key={step}>
                      <span
                        className={`diagram-symbol symbol-${index}`}
                        aria-hidden="true"
                      >
                        {["⌥", "▧", "◎"][index]}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                <div className="project-content">
                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <Tags items={project.tags} />
                  <details>
                    <summary>
                      Behind the project<span aria-hidden="true">+</span>
                    </summary>
                    <div className="project-detail">
                      <p className="detail-label">{project.type}</p>
                      <h4>The problem</h4>
                      <p>{project.context}</p>
                      <h4>My contribution</h4>
                      <p>{project.approach}</p>
                      <p className="project-note">{project.note}</p>
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="lab-section" id="lab" aria-labelledby="lab-title">
          <div className="page-width section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">THE AI OPERATIONS LAB</p>
                <h2 id="lab-title">
                  From noisy logs
                  <br />
                  to a useful first question.
                </h2>
              </div>
              <div>
                <span className="pill">New · local prototype</span>
                <p>
                  Incident Brief turns a log excerpt into a structured
                  investigation draft using a local LLM. Evidence first. An
                  engineer makes the call.
                </p>
              </div>
            </div>
            <IncidentLab />
            <div className="lab-footer">
              <p>
                <strong>Python + Ollama</strong>
                <span>
                  Structured output · Source-line checks · No command execution
                </span>
              </p>
              <a
                className="text-link"
                href={`${SOURCE}/tools/incident-triage`}
                target="_blank"
                rel="noreferrer"
              >
                Explore the CLI source
              </a>
            </div>
          </div>
        </section>
        <section
          className="section page-width"
          id="field-notes"
          aria-labelledby="notes-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">NOTES FROM PRODUCTION</p>
              <h2 id="notes-title">
                Fix the issue.
                <br />
                Improve the system.
              </h2>
            </div>
            <p>
              Two examples of the work I enjoy: finding the cause, recovering
              service, and making the next failure easier to catch.
            </p>
          </div>
          <div className="notes-grid">
            <article className="field-note">
              <span className="note-category">DATABASE / ASLAN</span>
              <h3>When the database became the bottleneck</h3>
              <p>
                Game requests were timing out while MongoDB CPU spiked.
                Slow-query logs pointed to a missing index on a frequently used
                query.
              </p>
              <div className="note-takeaway">
                <span>THE FOLLOW-THROUGH</span>
                <p>
                  Added a compound index and query-performance alerts in Zabbix,
                  so the fix also improved detection.
                </p>
              </div>
            </article>
            <article className="field-note">
              <span className="note-category">DELIVERY / KINGPOT</span>
              <h3>A rollback is only half the fix</h3>
              <p>
                A configuration change caused game services to crash after
                deployment. I rolled the release back through the Jenkins
                pipeline.
              </p>
              <div className="note-takeaway">
                <span>THE FOLLOW-THROUGH</span>
                <p>
                  Added staging validation and smoke tests before production
                  deployment to catch that class of failure earlier.
                </p>
              </div>
            </article>
          </div>
        </section>
        <section
          className="section page-width experience-section"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="experience-intro">
            <p className="eyebrow">EXPERIENCE</p>
            <h2 id="experience-title">
              Hands on.
              <br />
              End to end.
            </h2>
            <p>
              From gaming and crypto platforms to enterprise application
              servers.
            </p>
            <a
              className="text-link"
              href="https://linkedin.com/in/manjunath-huddar-devops"
              target="_blank"
              rel="noreferrer"
            >
              Connect on LinkedIn
            </a>
          </div>
          <div className="timeline">
            <article>
              <div className="job-heading">
                <div>
                  <h3>NIDEC Pvt Ltd</h3>
                  <p>Software Engineer · DevOps</p>
                </div>
                <span>Aug 2025 – Present</span>
              </div>
              <p className="job-location">Bengaluru, India</p>
              <ul>
                <li>
                  Maintain PQM application servers on RHEL and automate release
                  steps with Jenkins.
                </li>
                <li>
                  Automate database backup and restore workflows with Shell
                  scripts.
                </li>
                <li>
                  Write runbooks for application setup, upgrades, and
                  troubleshooting.
                </li>
              </ul>
            </article>
            <article>
              <div className="job-heading">
                <div>
                  <h3>Block-Stars Pvt Ltd</h3>
                  <p>DevOps Engineer</p>
                </div>
                <span>2023 – 2025</span>
              </div>
              <p className="job-location">Seoul, South Korea · Remote</p>
              <ul>
                <li>
                  Built Jenkins and GitLab CI pipelines for gaming and crypto
                  platforms.
                </li>
                <li>
                  Managed AWS environments and MongoDB replication, monitoring,
                  and backups.
                </li>
                <li>
                  Connected dashboards, alerting, and operational scripts to
                  support incident response.
                </li>
              </ul>
            </article>
          </div>
        </section>
        <section
          className="section page-width toolkit-section"
          aria-labelledby="toolkit-title"
        >
          <div>
            <p className="eyebrow">THE TOOLKIT</p>
            <h2 id="toolkit-title">Tools with a purpose.</h2>
            <p className="muted">The stack behind the work above.</p>
          </div>
          <div className="toolkit">
            {[
              [
                "Provision & configure",
                "AWS · Azure · Linux · Terraform · Ansible",
              ],
              [
                "Build & deliver",
                "Docker · Jenkins · GitLab CI · Shell · Python",
              ],
              [
                "Observe & investigate",
                "Prometheus · Grafana · ELK · Zabbix · MongoDB",
              ],
              ["Explore with AI", "Ollama · LLaMA3 · Structured LLM output"],
            ].map(([title, text]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <a
            className="learning-link"
            href="https://www.skills.google/public_profiles/36f94e84-4845-4a29-a5ec-d10c6e628f0e"
            target="_blank"
            rel="noreferrer"
          >
            <span>CONTINUOUS LEARNING</span>
            <p>Hands-on Google Cloud labs & skill badges</p>
            <strong>View learning profile</strong>
          </a>
        </section>
        <section
          className="contact-section page-width"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div>
            <p className="eyebrow">LET’S BUILD SOMETHING RELIABLE</p>
            <h2 id="contact-title">
              Your next release.
              <br />
              <span>A little less stressful.</span>
            </h2>
            <p>
              I’m open to DevOps roles where I can own infrastructure, improve
              delivery, and explore practical AI tooling.
            </p>
            <a className="button primary" href={EMAIL}>
              Let’s talk
            </a>
          </div>
          <aside className="offscreen">
            <span className="bike-mark" aria-hidden="true">
              ◎—◎
            </span>
            <p className="eyebrow">AWAY FROM THE TERMINAL</p>
            <h3>Usually on two wheels.</h3>
            <p>
              Weekend rides, DIY bike maintenance, and filming the roads along
              the way.
            </p>
          </aside>
        </section>
      </main>
      <footer className="page-width">
        <a className="wordmark" href="#home">
          mh<span>.</span>
        </a>
        <p>
          Manjunath Huddar <span>· DevOps Engineer</span>
        </p>
        <div>
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/manjunath-huddar-devops"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href={EMAIL}>Email</a>
        </div>
      </footer>
    </>
  );
}
