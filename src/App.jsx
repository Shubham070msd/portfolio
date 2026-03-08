import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    name: "Aslan",
    subtitle: "Multiplayer Gaming Platform · AWS",
    desc: "Full infra ownership on AWS. Ansible playbooks for zero-touch environment setup — Node.js, Docker, GitLab deploys. Real-time metrics via Prometheus, Grafana, and Zabbix. On-call runbooks that actually got used at 3am.",
    tags: ["AWS", "Ansible", "MongoDB", "Zabbix", "Grafana", "Docker"],
    period: "Oct 2024 – 2025",
    icon: "🎮",
  },
  {
    name: "Kingpot",
    subtitle: "Casino Game Platform · AWS",
    desc: "Optimized Jenkins pipelines and cut deployment failures by 50%. Integrated ELK Stack for centralized logging across all game services. Diagnosed and fixed MongoDB CPU spikes in prod — configured replication and automated backups.",
    tags: ["Jenkins", "ELK Stack", "MongoDB", "AWS", "Shell"],
    period: "Feb 2023 – Jun 2025",
    icon: "🃏",
  },
  {
    name: "AIW / TRIA",
    subtitle: "Crypto Wallet Platform · Azure + AWS",
    desc: "Node.js services on PM2 with clustering for high availability. Cloudflare WAF and DNS to block DDoS attacks. MongoDB replication with scheduled backups to protect financial data.",
    tags: ["Azure DevOps", "Cloudflare WAF", "PM2", "MongoDB", "Node.js"],
    period: "Apr 2024 – 2025",
    icon: "🔐",
  },
  {
    name: "GenAI Dockerfile Generator",
    subtitle: "Internal Tool · Python + LLaMA3",
    desc: "A CLI that generates production-ready Dockerfiles using Python, Ollama, and LLaMA3. Cut manual config errors by 60%. An AI agent that understands your stack and writes the boilerplate so you don't have to.",
    tags: ["Python", "LLaMA3", "Ollama", "GenAI", "Docker"],
    period: "2024",
    icon: "🤖",
  },
  {
    name: "Ephemeral Env CLI",
    subtitle: "Internal Tool · Terraform + ECS Fargate",
    desc: "A lightweight CLI that provisions temporary feature-branch environments on AWS ECS Fargate via Terraform and Shell. QA teams get isolated sandboxes per pull request with zero manual setup.",
    tags: ["Terraform", "ECS Fargate", "Shell", "AWS", "IaC"],
    period: "2024",
    icon: "⚡",
  },
];

const WORK = [
  {
    company: "NIDEC Pvt Ltd",
    role: "Software Engineer — DevOps",
    location: "Bengaluru, India",
    period: "Aug 2025 – Present",
    color: "#34d399",
    bullets: [
      "Configured and maintained PQM application servers on RHEL — stable deployments and consistent uptime.",
      "Set up Jenkins pipelines that cut deployment time by 40%, replacing manual release steps.",
      "Automated PQM database backup and restore using Shell scripting — no more manual overnight work.",
      "Wrote detailed runbooks for setup, upgrades, and troubleshooting that made onboarding a lot faster.",
    ],
  },
  {
    company: "Block-Stars Pvt Ltd",
    role: "DevOps Engineer",
    location: "Seoul, South Korea · Remote",
    period: "2023 – 2025",
    color: "#f472b6",
    bullets: [
      "Built and maintained CI/CD pipelines on Jenkins and GitLab CI across gaming and crypto platforms — 30% faster deployments.",
      "Set up AWS multi-account structure for dev, staging, and prod — better security isolation and cleaner resource management.",
      "Built Kibana dashboards for Aslan and AIW/TRIA that cut incident resolution time by 60% and caught 80% of recurring issues early.",
      "Monitored MongoDB with Zabbix and Datadog — replication, automated backups, 90% availability maintained in prod.",
      "Wired Zabbix alerts to Telegram notifications — average alert response time improved by 50%.",
      "Wrote Shell and Python scripts that saved the team 4 hours every week on routine ops tasks.",
    ],
  },
];

const STACK = [
  { cat: "Cloud", items: ["AWS", "Azure", "GCP"], icon: "☁️" },
  { cat: "Containers", items: ["Docker", "Kubernetes", "Helm", "PM2"], icon: "📦" },
  { cat: "CI / CD", items: ["Jenkins", "GitLab CI", "Azure DevOps"], icon: "🔄" },
  { cat: "IaC & Config", items: ["Terraform", "Ansible"], icon: "🏗️" },
  { cat: "Observability", items: ["Prometheus", "Grafana", "ELK Stack", "Datadog", "Zabbix"], icon: "📊" },
  { cat: "Scripting", items: ["Shell", "Python"], icon: "💻" },
  { cat: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL"], icon: "🗄️" },
  { cat: "Security", items: ["Cloudflare WAF", "IAM", "Nginx", "Apache"], icon: "🛡️" },
];

const MISC = [
  {
    q: "How I Got Started",
    a: "Started managing Linux servers and got hooked on automating everything I touched. First real DevOps moment: writing a Shell script to auto-backup MongoDB at midnight so I didn't have to babysit it. That 'set it and forget it' feeling — never looked back.",
  },
  {
    q: "My Work Philosophy",
    a: "If something is done more than twice, automate it. If it's not monitored, it doesn't exist. A good runbook written at 2pm saves everyone at 2am. I try to build systems that are boring by design — boring infra means engineers sleep well.",
  },
  {
    q: "What I'm Learning Now",
    a: "Trying to bring AI into the way I work as a DevOps engineer. Right now I'm exploring AI agents and agentic workflows — tools that can reason, plan, and take actions on their own. The GenAI Dockerfile generator was my first experiment. Now looking at how LLMs can help with incident analysis, automated runbook execution, and self-healing infrastructure.",
  },
  {
    q: "Where I See Myself",
    a: "I'm genuinely excited about where AI agents fit into DevOps — not as a trend, but because I've already started building in that direction. I want to be the engineer who knows how to use these tools before they become mainstream. The goal is to build something meaningful at the intersection of AI and DevOps — whether that's an incident response bot, an intelligent pipeline, or something that doesn't exist yet. I want to be someone who shapes how a team operates, not just someone who maintains what's already there.",
  },
];

const MOMENTS = [
  { icon: "🚀", label: "First prod deploy at Block-Stars" },
  { icon: "🎮", label: "Aslan gaming platform went live" },
  { icon: "🔐", label: "AIW/TRIA crypto wallet infra" },
  { icon: "🔥", label: "3AM MongoDB CPU spike — fixed" },
  { icon: "📊", label: "Kibana with zero blind spots" },
  { icon: "🤖", label: "GenAI Dockerfile gen — shipped" },
  { icon: "☁️", label: "AWS multi-account setup done" },
  { icon: "🛠️", label: "NIDEC RHEL — stable & running" },
];

const OFFSCREEN = [
  { icon: "🏍️", title: "Weekend Rides", desc: "Out on the bike every weekend. Long routes, open roads, no Slack notifications." },
  { icon: "🔧", title: "DIY Maintenance", desc: "I do my own servicing and repairs. Diagnosing a bike problem isn't too different from debugging prod." },
  { icon: "🎬", title: "Bike Content", desc: "Film and edit my own riding videos. Ride, shoot, edit, repeat." },
];

const STATS = [
  { num: "2+", label: "Years in Prod" },
  { num: "40%", label: "Faster Deploys" },
  { num: "60%", label: "Faster Incidents" },
  { num: "3", label: "Platforms Owned" },
];

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: open ? "rgba(99,179,237,0.05)" : "rgba(255,255,255,0.025)",
      border: `1px solid ${open ? "rgba(99,179,237,0.22)" : "rgba(255,255,255,0.07)"}`,
      borderRadius: "14px", marginBottom: "10px",
      overflow: "hidden", transition: "border-color 0.25s, background 0.25s",
    }}>
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          width: "100%", background: "none", border: "none",
          color: open ? "#93c5fd" : "#64748b",
          fontSize: "0.9rem", cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 20px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 500, transition: "color 0.2s",
        }}
      >
        <span>{q}</span>
        <span style={{
          fontSize: "1.3rem",
          transform: open ? "rotate(45deg)" : "rotate(0)",
          transition: "transform 0.3s",
          color: "#63b3ed", lineHeight: 1, flexShrink: 0,
        }}>+</span>
      </button>
      <div style={{ maxHeight: open ? "300px" : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <div style={{ padding: "0 20px 18px", borderTop: "1px solid rgba(99,179,237,0.08)" }}>
          <p style={{
            color: "#94a3b8", fontSize: "0.9rem",
            lineHeight: "1.85", marginTop: "14px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("about");
  const [typedCmd, setTypedCmd] = useState("");
  const [cmdIdx, setCmdIdx] = useState(0);
  const charRef = useRef(0);
  const timerRef = useRef(null);

  const cmds = [
    "kubectl get pods --all-namespaces",
    "terraform apply -auto-approve",
    "ansible-playbook deploy.yml -i prod",
    "docker stats --no-stream",
  ];

  useEffect(() => {
    const cmd = cmds[cmdIdx];
    const tick = () => {
      charRef.current++;
      if (charRef.current <= cmd.length) {
        setTypedCmd(cmd.slice(0, charRef.current));
        timerRef.current = setTimeout(tick, 46);
      } else {
        timerRef.current = setTimeout(() => {
          charRef.current = 0;
          setTypedCmd("");
          setCmdIdx(i => (i + 1) % cmds.length);
        }, 2500);
      }
    };
    timerRef.current = setTimeout(tick, 500);
    return () => clearTimeout(timerRef.current);
  }, [cmdIdx]);

  const goto = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  };

  return (
    <div style={{ background: "#111827", minHeight: "100vh", color: "#e2e8f0", width: "100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body { background: #111827; }

        @keyframes blink    { 50% { opacity: 0; } }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse    { 0%,100%{opacity:1;} 50%{opacity:0.25;} }
        @keyframes marqueeX { to { transform: translateX(-50%); } }
        @keyframes shimmer  { 0%{background-position:200% center;} 100%{background-position:-200% center;} }

        .f1{animation:fadeUp .55s ease both;}
        .f2{animation:fadeUp .55s .1s ease both;}
        .f3{animation:fadeUp .55s .2s ease both;}
        .f4{animation:fadeUp .55s .3s ease both;}
        .f5{animation:fadeUp .55s .4s ease both;}

        .nav-btn{
          font-family:'Fira Code',monospace;
          font-size:.72rem;letter-spacing:.07em;
          color:#475569;background:none;border:none;
          cursor:pointer;padding:0;transition:color .2s;
        }
        .nav-btn:hover{color:#e2e8f0;}
        .nav-btn.on{color:#63b3ed;}

        .hero-name{
          font-family:'Plus Jakarta Sans',sans-serif;
          font-weight:700;
          font-size:clamp(2.8rem,7.5vw,4.8rem);
          line-height:1.06;letter-spacing:-.025em;color:#f1f5f9;
        }
        .hero-name .grad{
          background:linear-gradient(100deg,#63b3ed 0%,#34d399 50%,#f472b6 100%);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmer 5s linear infinite;
        }

        .terminal{
          background:#0d1520;
          border:1px solid rgba(99,179,237,0.18);
          border-radius:12px;padding:14px 18px;
          font-family:'Fira Code',monospace;font-size:.8rem;
          color:#63b3ed;letter-spacing:.03em;min-height:46px;
          box-shadow:0 0 28px rgba(99,179,237,0.06);
        }
        .terminal::before{content:'$ ';color:#2d4a6a;}
        .tcur{
          display:inline-block;width:7px;height:14px;
          background:#63b3ed;vertical-align:middle;
          animation:blink 1s step-end infinite;
          margin-left:1px;border-radius:1px;
        }

        .stat-card{
          background:#1a2436;
          border:1px solid rgba(255,255,255,0.07);
          border-radius:14px;padding:18px 14px;
          flex:1;min-width:90px;text-align:center;
          transition:border-color .2s,transform .2s,box-shadow .2s;
          position:relative;overflow:hidden;
        }
        .stat-card::after{
          content:'';position:absolute;top:0;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,rgba(99,179,237,0.4),transparent);
          opacity:0;transition:opacity .2s;
        }
        .stat-card:hover{border-color:rgba(99,179,237,0.25);transform:translateY(-3px);box-shadow:0 12px 30px rgba(0,0,0,0.2);}
        .stat-card:hover::after{opacity:1;}
        .stat-num{
          font-family:'Plus Jakarta Sans',sans-serif;
          font-size:1.9rem;font-weight:700;
          background:linear-gradient(135deg,#63b3ed,#34d399);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          display:block;line-height:1;margin-bottom:5px;
        }
        .stat-label{font-family:'Fira Code',monospace;font-size:.59rem;color:#475569;letter-spacing:.1em;display:block;}

        .sl{font-family:'Fira Code',monospace;font-size:.65rem;color:#63b3ed;letter-spacing:.18em;margin-bottom:6px;opacity:.65;}
        .stitle{
          font-family:'Plus Jakarta Sans',sans-serif;
          font-size:clamp(1.65rem,3.5vw,2.1rem);font-weight:700;
          color:#f1f5f9;letter-spacing:-.02em;margin-bottom:1.8rem;
          display:flex;align-items:center;gap:14px;
        }
        .stitle::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(99,179,237,0.15),transparent);}

        .pcard{
          background:#1a2436;
          border:1px solid rgba(255,255,255,0.07);
          border-radius:16px;padding:22px 24px;margin-bottom:12px;
          transition:border-color .2s,transform .2s,box-shadow .2s;
          position:relative;overflow:hidden;
        }
        .pcard::before{
          content:'';position:absolute;inset:0;
          background:radial-gradient(ellipse at top left,rgba(99,179,237,0.04) 0%,transparent 60%);
          opacity:0;transition:opacity .3s;
        }
        .pcard:hover{border-color:rgba(99,179,237,0.22);transform:translateY(-2px);box-shadow:0 16px 40px rgba(0,0,0,0.22);}
        .pcard:hover::before{opacity:1;}

        .ptag{
          display:inline-block;
          background:rgba(99,179,237,0.08);border:1px solid rgba(99,179,237,0.18);
          color:#93c5fd;
          font-family:'Fira Code',monospace;font-size:.63rem;letter-spacing:.04em;
          padding:3px 10px;border-radius:6px;margin-right:5px;margin-top:7px;
          transition:background .2s,border-color .2s;
        }
        .ptag:hover{background:rgba(99,179,237,0.14);border-color:rgba(99,179,237,0.35);}

        .wcard{
          background:#1a2436;
          border:1px solid rgba(255,255,255,0.07);
          border-radius:16px;padding:24px;margin-bottom:14px;
          position:relative;overflow:hidden;
          transition:border-color .2s,box-shadow .2s;
        }
        .wcard:hover{border-color:rgba(255,255,255,0.12);box-shadow:0 12px 36px rgba(0,0,0,0.18);}
        .waccent{position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:16px 0 0 16px;}

        .scat{
          background:#1a2436;border:1px solid rgba(255,255,255,0.07);
          border-radius:14px;padding:18px 20px;transition:border-color .2s;
        }
        .scat:hover{border-color:rgba(99,179,237,0.18);}
        .si{
          display:inline-block;
          background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);
          color:#94a3b8;
          font-family:'Fira Code',monospace;font-size:.7rem;
          padding:5px 13px;border-radius:8px;margin-right:7px;margin-top:7px;
          letter-spacing:.03em;
          transition:color .2s,border-color .2s,background .2s;
        }
        .si:hover{color:#63b3ed;border-color:rgba(99,179,237,0.25);background:rgba(99,179,237,0.06);}

        .track-outer{overflow:hidden;position:relative;}
        .track-outer::before,.track-outer::after{
          content:'';position:absolute;top:0;bottom:0;width:80px;z-index:2;pointer-events:none;
        }
        .track-outer::before{left:0;background:linear-gradient(90deg,#111827,transparent);}
        .track-outer::after{right:0;background:linear-gradient(270deg,#111827,transparent);}
        .track{display:flex;gap:12px;animation:marqueeX 26s linear infinite;width:max-content;}
        .track:hover{animation-play-state:paused;}
        .mcard{
          width:162px;height:162px;border-radius:14px;
          background:#1a2436;border:1px solid rgba(255,255,255,0.07);
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          flex-shrink:0;padding:16px;text-align:center;
          transition:border-color .2s,transform .2s;
        }
        .mcard:hover{border-color:rgba(99,179,237,0.22);transform:scale(1.04);}

        .off-card{
          background:#1a2436;border:1px solid rgba(255,255,255,0.07);
          border-radius:14px;padding:18px 20px;
          display:flex;gap:16px;align-items:flex-start;margin-bottom:10px;
          transition:border-color .2s,transform .2s;
        }
        .off-card:hover{border-color:rgba(99,179,237,0.2);transform:translateX(4px);}

        .soc{
          font-family:'Fira Code',monospace;font-size:.72rem;
          color:#475569;text-decoration:none;letter-spacing:.06em;
          margin-right:20px;transition:color .2s;
        }
        .soc:hover{color:#63b3ed;}

        .divider{
          border:none;height:1px;
          background:linear-gradient(90deg,transparent,rgba(99,179,237,0.12),transparent);
          margin:3.5rem 0;
        }

        .nl-input{
          background:#1a2436;border:1px solid rgba(255,255,255,0.08);
          color:#f1f5f9;padding:11px 16px;
          font-family:'Fira Code',monospace;font-size:.78rem;
          border-radius:10px;outline:none;width:230px;transition:border-color .2s;
        }
        .nl-input:focus{border-color:rgba(99,179,237,0.4);box-shadow:0 0 0 3px rgba(99,179,237,0.07);}
        .nl-input::placeholder{color:#2d4a6a;}
        .nl-btn{
          background:linear-gradient(135deg,#63b3ed,#34d399);
          color:#0d1520;border:none;padding:11px 24px;
          font-family:'Plus Jakarta Sans',sans-serif;font-size:.82rem;
          font-weight:600;border-radius:10px;cursor:pointer;
          margin-left:8px;transition:opacity .2s,transform .2s;
        }
        .nl-btn:hover{opacity:.88;transform:translateY(-1px);}

        .uptime-dot{
          width:8px;height:8px;border-radius:50%;background:#34d399;
          box-shadow:0 0 8px rgba(52,211,153,0.7);
          animation:pulse 2s ease-in-out infinite;
          display:inline-block;margin-right:8px;
        }

        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#111827;}
        ::-webkit-scrollbar-thumb{background:rgba(99,179,237,0.2);border-radius:2px;}
      `}</style>

      {/* SOFT GLOW */}
      <div style={{
        position:"fixed",inset:0,zIndex:0,pointerEvents:"none",
        background:`
          radial-gradient(ellipse 70% 50% at 85% 0%,rgba(99,179,237,0.07) 0%,transparent 60%),
          radial-gradient(ellipse 50% 40% at 0% 100%,rgba(244,114,182,0.05) 0%,transparent 60%)
        `,
      }}/>

      <div style={{ maxWidth:"720px",margin:"0 auto",padding:"0 24px",position:"relative",zIndex:1 }}>

        {/* NAV */}
        <nav style={{
          position:"sticky",top:0,
          background:"rgba(17,24,39,0.9)",
          backdropFilter:"blur(18px)",
          borderBottom:"1px solid rgba(255,255,255,0.06)",
          padding:"16px 0",zIndex:100,
          display:"flex",gap:"26px",alignItems:"center",
        }}>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"1rem",color:"#63b3ed",marginRight:"4px",letterSpacing:"-.01em" }}>mj.</span>
          {["about","projects","work","stack","misc"].map(l=>(
            <button key={l} className={`nav-btn ${activeNav===l?"on":""}`} onClick={()=>goto(l)}>{l}</button>
          ))}
        </nav>

        {/* HERO */}
        <section id="about" style={{ paddingTop:"5.5rem" }}>
          <div className="f1" style={{ display:"flex",alignItems:"center",gap:"8px",marginBottom:"1.6rem" }}>
            <span className="uptime-dot"/>
            <span style={{ fontFamily:"'Fira Code',monospace",color:"#2d4a6a",fontSize:".68rem",letterSpacing:".12em" }}>
              SYSTEM ONLINE · OPEN TO WORK
            </span>
          </div>

          <h1 className="hero-name f1">
            hi, i'm<br/><span className="grad">Manjunath.</span>
          </h1>

          <div className="f2" style={{ marginTop:"1.5rem",marginBottom:"1.8rem" }}>
            <div className="terminal">{typedCmd}<span className="tcur"/></div>
          </div>

          <div className="f2" style={{ display:"flex",gap:"10px",flexWrap:"wrap",marginBottom:"2rem" }}>
            {STATS.map(s=>(
              <div key={s.label} className="stat-card">
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="f3">
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:".97rem",lineHeight:"1.9",color:"#94a3b8",maxWidth:"600px" }}>
              DevOps engineer with 2+ years in real production environments. Built and owned infra for a{" "}
              <span style={{ color:"#cbd5e1" }}>multiplayer gaming platform</span>, a{" "}
              <span style={{ color:"#cbd5e1" }}>crypto wallet system</span>, and{" "}
              <span style={{ color:"#cbd5e1" }}>enterprise RHEL servers</span>.
            </p>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:".97rem",lineHeight:"1.9",color:"#94a3b8",maxWidth:"600px",marginTop:".9rem" }}>
              Cut deployment time by <span style={{ color:"#63b3ed" }}>40%</span> at NIDEC.
              Reduced incident resolution by <span style={{ color:"#34d399" }}>60%</span> at Block-Stars.
              I automate the things I repeat, monitor everything in prod, and document so the next person doesn't have to guess.
            </p>
          </div>

          {/* OFF-SCREEN */}
          <div className="f3" style={{ marginTop:"2rem" }}>
            <p className="sl">// off-screen</p>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:".9rem",color:"#64748b",lineHeight:"1.7",marginBottom:"14px" }}>
              When I'm not automating infra, I'm out on two wheels —
              <span style={{ color:"#94a3b8" }}> riding, wrenching, and filming it all.</span>
            </p>
            <div style={{ display:"flex",flexDirection:"column",gap:"10px" }}>
              {OFFSCREEN.map((item,i)=>(
                <div key={i} className="off-card">
                  <span style={{ fontSize:"1.3rem",flexShrink:0,marginTop:"1px" }}>{item.icon}</span>
                  <div>
                    <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",color:"#e2e8f0",fontSize:".88rem",fontWeight:600,marginBottom:"3px" }}>{item.title}</p>
                    <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",color:"#64748b",fontSize:".83rem",lineHeight:"1.65" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="f4" style={{ marginTop:"2rem" }}>
            {[
              {l:"↗ GitHub",h:"#"},
              {l:"↗ LinkedIn",h:"https://linkedin.com/in/manjunath-huddar-devops"},
              {l:"↗ Email",h:"mailto:manjunathhuddar1999@gmail.com"},
            ].map(s=><a key={s.l} href={s.h} className="soc">{s.l}</a>)}
          </div>
        </section>

        <hr className="divider"/>

        {/* PROJECTS */}
        <section id="projects">
          <p className="sl">// projects</p>
          <h2 className="stitle">What I've Built</h2>
          {PROJECTS.map(p=>(
            <div key={p.name} className="pcard">
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"5px",flexWrap:"wrap",gap:"6px" }}>
                <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
                  <span style={{ fontSize:"1.1rem" }}>{p.icon}</span>
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",color:"#f1f5f9",fontSize:"1rem",fontWeight:600 }}>{p.name}</span>
                </div>
                <span style={{ fontFamily:"'Fira Code',monospace",color:"#2d4a6a",fontSize:".63rem" }}>{p.period}</span>
              </div>
              <p style={{ fontFamily:"'Fira Code',monospace",color:"#3d5a7a",fontSize:".65rem",letterSpacing:".06em",marginBottom:"10px" }}>{p.subtitle}</p>
              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:".9rem",lineHeight:"1.75",color:"#94a3b8" }}>{p.desc}</p>
              <div style={{ marginTop:"4px" }}>{p.tags.map(t=><span key={t} className="ptag">{t}</span>)}</div>
            </div>
          ))}
        </section>

        <hr className="divider"/>

        {/* WORK */}
        <section id="work">
          <p className="sl">// experience</p>
          <h2 className="stitle">Where I've Worked</h2>
          {WORK.map(w=>(
            <div key={w.company} className="wcard">
              <div className="waccent" style={{ background:`linear-gradient(180deg,${w.color},transparent)` }}/>
              <div style={{ paddingLeft:"18px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"8px",marginBottom:"4px" }}>
                  <div>
                    <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",color:"#f1f5f9",fontSize:"1.05rem",fontWeight:600 }}>{w.company}</h3>
                    <p style={{ fontFamily:"'Fira Code',monospace",color:w.color,fontSize:".7rem",letterSpacing:".06em",opacity:.85,marginTop:"3px" }}>{w.role}</p>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <p style={{ fontFamily:"'Fira Code',monospace",color:"#2d4a6a",fontSize:".68rem" }}>{w.period}</p>
                    <p style={{ fontFamily:"'Fira Code',monospace",color:"#1e3a50",fontSize:".63rem",marginTop:"3px" }}>{w.location}</p>
                  </div>
                </div>
                <ul style={{ listStyle:"none",padding:0,marginTop:"16px",display:"flex",flexDirection:"column",gap:"9px" }}>
                  {w.bullets.map((b,i)=>(
                    <li key={i} style={{ display:"flex",gap:"11px",alignItems:"flex-start" }}>
                      <span style={{ color:w.color,opacity:.4,marginTop:"6px",fontSize:".45rem",flexShrink:0 }}>◆</span>
                      <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:".9rem",lineHeight:"1.72",color:"#94a3b8" }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        <hr className="divider"/>

        {/* STACK */}
        <section id="stack">
          <p className="sl">// technologies</p>
          <h2 className="stitle">My Stack</h2>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:"12px" }}>
            {STACK.map(s=>(
              <div key={s.cat} className="scat">
                <div style={{ display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px" }}>
                  <span style={{ fontSize:".95rem" }}>{s.icon}</span>
                  <span style={{ fontFamily:"'Fira Code',monospace",color:"#3d5a7a",fontSize:".63rem",letterSpacing:".16em" }}>{s.cat.toUpperCase()}</span>
                </div>
                <div>{s.items.map(i=><span key={i} className="si">{i}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider"/>

        {/* ACHIEVEMENTS */}
        <section id="achievements">
          <p className="sl">// achievements</p>
          <h2 className="stitle">Certifications & Badges</h2>

          {/* Main achievement card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(99,179,237,0.06) 0%, rgba(52,211,153,0.04) 100%)",
            border: "1px solid rgba(99,179,237,0.2)",
            borderRadius: "16px", padding: "24px",
            marginBottom: "16px", position: "relative", overflow: "hidden",
          }}>
            {/* top shimmer line */}
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,rgba(99,179,237,0.5),rgba(52,211,153,0.5),transparent)" }}/>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"16px" }}>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" }}>
                  <span style={{ fontSize:"1.6rem" }}>🏆</span>
                  <div>
                    <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#f1f5f9", fontSize:"1.05rem", fontWeight:700 }}>Google Cloud Arcade</p>
                    <p style={{ fontFamily:"'Fira Code',monospace", color:"#34d399", fontSize:"0.7rem", letterSpacing:"0.08em", marginTop:"2px" }}>CHAMPION TIER · GOLD LEAGUE</p>
                  </div>
                </div>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"0.88rem", color:"#94a3b8", lineHeight:"1.7", maxWidth:"440px" }}>
                  Completed the Google Cloud Arcade program and reached Champion tier — the highest level. Earned through consistent hands-on labs, challenges, and quizzes across Google Cloud services.
                </p>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", flexShrink:0 }}>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"2.2rem", fontWeight:700, background:"linear-gradient(135deg,#fbbf24,#f59e0b)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", lineHeight:1 }}>69K+</span>
                <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.58rem", color:"#475569", letterSpacing:"0.1em" }}>POINTS</span>
                <div style={{ marginTop:"6px", background:"rgba(251,191,36,0.1)", border:"1px solid rgba(251,191,36,0.25)", borderRadius:"20px", padding:"3px 12px" }}>
                  <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.62rem", color:"#fbbf24", letterSpacing:"0.08em" }}>70+ BADGES</span>
                </div>
              </div>
            </div>

            {/* Key DevOps-relevant badges */}
            <div style={{ marginTop:"18px", paddingTop:"16px", borderTop:"1px solid rgba(99,179,237,0.08)" }}>
              <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.6rem", color:"#3d5a7a", letterSpacing:"0.14em", marginBottom:"10px" }}>HIGHLIGHTS</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
                {[
                  "Implement DevOps Workflows in GCP",
                  "CI/CD Pipelines on Google Cloud",
                  "Manage Kubernetes in GCP",
                  "Terraform on Google Cloud",
                  "Deploy Kubernetes Applications",
                  "Cloud Security Fundamentals",
                  "Prompt Design in Vertex AI",
                  "Introduction to Generative AI",
                ].map(b => (
                  <span key={b} style={{
                    display:"inline-block",
                    background:"rgba(99,179,237,0.06)",
                    border:"1px solid rgba(99,179,237,0.14)",
                    color:"#7dd3fc",
                    fontFamily:"'Fira Code',monospace",
                    fontSize:"0.62rem", letterSpacing:"0.03em",
                    padding:"4px 10px", borderRadius:"6px",
                  }}>{b}</span>
                ))}
              </div>
            </div>

            {/* Link */}
            <a
              href="https://www.skills.google/public_profiles/36f94e84-4845-4a29-a5ec-d10c6e628f0e"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:"inline-flex", alignItems:"center", gap:"6px",
                marginTop:"16px",
                fontFamily:"'Fira Code',monospace", fontSize:"0.7rem",
                color:"#63b3ed", textDecoration:"none", letterSpacing:"0.06em",
                transition:"color 0.2s",
              }}
              onMouseEnter={e=>e.currentTarget.style.color="#93c5fd"}
              onMouseLeave={e=>e.currentTarget.style.color="#63b3ed"}
            >
              ↗ View all badges on Google Skills Boost
            </a>
          </div>
        </section>

        <hr className="divider"/>

        {/* MISC */}
        <section id="misc">
          <p className="sl">// moments</p>
          <h2 className="stitle">Journey So Far</h2>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:".92rem",color:"#64748b",lineHeight:"1.8",marginBottom:"2rem" }}>
            2 years of production infra. A few chapters worth remembering.
          </p>

          <div className="track-outer" style={{ marginBottom:"3rem" }}>
            <div className="track">
              {[...MOMENTS,...MOMENTS].map((m,i)=>(
                <div key={i} className="mcard">
                  <div style={{ fontSize:"1.7rem",marginBottom:"10px" }}>{m.icon}</div>
                  <p style={{ fontFamily:"'Fira Code',monospace",fontSize:".64rem",color:"#475569",lineHeight:"1.5" }}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CURRENTLY EXPLORING */}
          <div style={{
            background:"rgba(99,179,237,0.04)",
            border:"1px solid rgba(99,179,237,0.12)",
            borderRadius:"16px",padding:"20px 22px",marginBottom:"2rem",
          }}>
            <p style={{ fontFamily:"'Fira Code',monospace",fontSize:".62rem",color:"#63b3ed",letterSpacing:".14em",opacity:.65,marginBottom:"14px" }}>CURRENTLY EXPLORING</p>
            <div style={{ display:"flex",flexDirection:"column",gap:"11px" }}>
              {[
                { icon:"🤖", text:"AI agents and agentic workflows — tools that can reason, plan, and take actions on their own" },
                { icon:"⚙️", text:"How LLMs can help with incident analysis and automated runbook execution" },
                { icon:"🔬", text:"Self-healing infrastructure — systems that detect and fix issues themselves" },
              ].map((item,i)=>(
                <div key={i} style={{ display:"flex",gap:"12px",alignItems:"flex-start" }}>
                  <span style={{ fontSize:"1rem",flexShrink:0 }}>{item.icon}</span>
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:".9rem",color:"#64748b",lineHeight:"1.65" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontFamily:"'Fira Code',monospace",color:"#2d4a6a",fontSize:".62rem",letterSpacing:".14em",marginBottom:"1.2rem" }}>MORE ABOUT ME</p>
          {MISC.map(m=><AccordionItem key={m.q} q={m.q} a={m.a}/>)}
        </section>

        <hr className="divider"/>

        {/* NEWSLETTER */}
        <section style={{ paddingBottom:"5.5rem",textAlign:"center" }}>
          <p className="sl" style={{ justifyContent:"center" }}>// newsletter</p>
          <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",color:"#f1f5f9",fontSize:"1.55rem",fontWeight:700,marginTop:"10px",marginBottom:"8px",letterSpacing:"-.02em" }}>
            DevOps from the Trenches
          </h3>
          <p style={{ fontFamily:"'Fira Code',monospace",color:"#3d5a7a",fontSize:".78rem",marginBottom:"2rem" }}>
            Real incidents. Real fixes. No fluff.
          </p>
          <div style={{ display:"flex",justifyContent:"center",flexWrap:"wrap",gap:"8px" }}>
            <input className="nl-input" type="email" placeholder="your@email.com"/>
            <button className="nl-btn">Subscribe</button>
          </div>
        </section>

        {/* FOOTER */}
        <div style={{
          borderTop:"1px solid rgba(255,255,255,0.05)",
          padding:"1.5rem 0",
          display:"flex",justifyContent:"space-between",
          alignItems:"center",flexWrap:"wrap",gap:"8px",
        }}>
          <span style={{ fontFamily:"'Fira Code',monospace",color:"#1e3a50",fontSize:".7rem" }}>Manjunath Huddar · DevOps Engineer</span>
          <span style={{ fontFamily:"'Fira Code',monospace",color:"#1a2e42",fontSize:".68rem" }}>{"// automate the boring parts"}</span>
        </div>

      </div>
    </div>
  );
}
