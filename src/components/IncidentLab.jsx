import { useState } from "react";
import scenarios from "../data/incident-scenarios.json";

export default function IncidentLab() {
  const [selected, setSelected] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const scenario = scenarios[selected];
  const brief = scenario.brief;

  function selectScenario(index) {
    setSelected(index);
    setRevealed(false);
    setCopyStatus("");
  }
  async function copyBrief() {
    const text = `ILLUSTRATIVE SAMPLE — NOT LIVE AI OUTPUT\n\n${brief.summary}\n\n${brief.hypothesis}\n\nEvidence: lines ${brief.evidence_lines.join(", ")}\n\nNext checks:\n${brief.next_checks.map((check, i) => `${i + 1}. ${check}`).join("\n")}\n\nUncertainty: ${brief.uncertainty}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Sample brief copied.");
    } catch {
      setCopyStatus(
        "Clipboard unavailable. Select and copy the brief text below.",
      );
    }
  }
  return (
    <div className="lab-panel">
      <div className="lab-toolbar">
        <span className="lab-brand">
          <span aria-hidden="true">✳</span> Incident Brief
        </span>
        <span className="demo-label">INTERACTIVE WALKTHROUGH</span>
      </div>
      <div
        className="scenario-controls"
        role="group"
        aria-label="Choose a sample incident"
      >
        {scenarios.map((item, index) => (
          <button
            key={item.id}
            aria-pressed={selected === index}
            onClick={() => selectScenario(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="lab-disclaimer">
        Synthetic logs and hand-written sample briefs. This browser demo does
        not call an AI model. Run the CLI for local Ollama inference.
      </p>
      <div className="lab-body">
        <div className="log-pane">
          <div className="pane-heading">
            <span>INPUT / LOG EXCERPT</span>
            <span>sample data</span>
          </div>
          <div aria-label={`${scenario.label} sample logs`}>
            {scenario.logs.map((line, index) => (
              <div
                className={`log-line ${line.includes("WARN") || line.includes("ERROR") ? "is-alert" : ""}`}
                key={line}
              >
                <span className="line-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <code>{line}</code>
              </div>
            ))}
          </div>
          <div className="lab-action">
            <button
              className="button primary"
              aria-controls="incident-brief"
              aria-expanded={revealed}
              onClick={() => {
                setRevealed(!revealed);
                setCopyStatus("");
              }}
            >
              {revealed ? "Hide sample brief" : "Inspect sample brief"}
            </button>
            <span>Hypothesis, evidence, and next checks.</span>
          </div>
        </div>
        <div
          className="brief-pane"
          id="incident-brief"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="pane-heading">
            <span>OUTPUT / INVESTIGATION DRAFT</span>
            <span>human review</span>
          </div>
          {revealed ? (
            <div className="brief-result">
              <h3>{brief.summary}</h3>
              <p>{brief.hypothesis}</p>
              <div className="brief-evidence">
                Evidence: lines {brief.evidence_lines.join(", ")}
              </div>
              <h4>CHECK BEFORE CHANGING</h4>
              <ol>
                {brief.next_checks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ol>
              <h4>WHAT WE DON’T KNOW</h4>
              <p className="uncertainty">{brief.uncertainty}</p>
              <button className="copy-button" onClick={copyBrief}>
                Copy sample brief
              </button>
              <span className="copy-status" role="status">
                {copyStatus}
              </span>
            </div>
          ) : (
            <div className="brief-placeholder">
              <span aria-hidden="true">⌁</span>
              <h3>Start with the evidence.</h3>
              <p>
                Choose an incident and inspect a sample brief to see how the
                investigation is structured.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
