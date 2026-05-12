---
sidebar_position: 5
---

# Feeding PRDs to AI Agents

This guide walks you through a workflow for converting a Product Requirements Document (PRD) into actionable code using AI agent skills. By the end, you will know which skills to install, how to chain them together, and what prompts to use at each step.

## Overview

Most PRDs live in Word documents, PDFs, or PowerPoint presentations, formats that AI coding agents cannot read natively. The workflow below uses open-source **agent skills** to:

1. **Convert** the document into markdown
2. **Define** and validate requirements (optional)
3. **Plan** a phased implementation
4. **Build** the code incrementally

```
Step 1  ↓  Convert document to markdown         (docx / pdf / pptx skill)
Step 2  ↓  Validate & clarify requirements      (requirements-analysis skill)
Step 3  ↓  Break PRD into implementation plan   (prd-to-plan skill)
Step 4  ↓  Build code incrementally             (incremental-implementation skill)
```

## Prerequisites

- An AI coding agent that supports the [Agent Skills standard](https://skills.sh) (for example: Claude Code, Cursor, Copilot, Codex, Windsurf, Gemini CLI)
- Your PRD in `.docx`, `.pdf`, or `.pptx`

## What is skills.sh?

[The Agent Skills Directory](https://skills.sh) is an open directory and leaderboard for AI agent skill packages, launched by Vercel in January 2026. Skills follow the open Agent Skills standard (originated by Anthropic). A single skill is portable across Claude Code, Cursor, Copilot, Codex, Windsurf, Gemini CLI, and others.

## Skills Used in This Workflow

### PRD-Specific Skills

| Skill | Link | Purpose |
|-------|------|---------|
| `requirements-analysis` (Optional) | [requirements-analysis by jwynia/agent-skills](https://skills.sh/jwynia/agent-skills/requirements-analysis) | Audit and restructure requirements into an AI-friendly PRD |
| `prd-to-plan` | [prd-to-plan by mattpocock/skills](https://skills.sh/mattpocock/skills/prd-to-plan) | Break a PRD into a phased implementation plan and write it to `./plans/<feature>.md` |
| `incremental-implementation` | [incremental-implementation by addyosmani/agent-skills](https://skills.sh/addyosmani/agent-skills/incremental-implementation) | Build in small components, test, verify, then expand |

:::note
The top skills that mention "PRD" in their names are generators, they walk you through creating a new PRD from scratch. There is no skill on skills.sh whose sole job is to read an existing PRD and output an AI-consumable version, but the skills above cover that gap when combined.
:::

### Document Parsing Skills

| Skill | Link | Purpose |
|-------|------|---------|
| `docx` | [docx by anthropics/skills](https://skills.sh/anthropics/skills/docx) | Reading Word documents including images |
| `pdf` | [pdf by anthropics/skills](https://skills.sh/anthropics/skills/pdf) | PDF reading |
| `pptx` | [pptx by anthropics/skills](https://skills.sh/anthropics/skills/pptx) | Read PowerPoint presentations |

Additional skills can be found on [The Agent Skills Directory](https://skills.sh). Also noteworthy: [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) — production-grade engineering skills for AI coding agents.

## Recommended PRD Format for AI Consumption

Across the PRD skills listed above, there is significant overlap in what they expect. An AI-friendly PRD should be a **markdown file** that includes these sections:

- **Title & summary**: one-paragraph description of what is being built
- **Goals & non-goals**: what is in scope and what is explicitly out of scope
- **User stories / requirements**: numbered, testable requirements
- **Technical constraints**: frameworks, APIs, infra boundaries. For RAD Template, these are already defined: Next.js (React), Daikin Design System (DDS), GraphQL, Bedrock APIs, Tailwind CSS, and Keycloak for authentication. Your PRD should reference these rather than specifying alternatives, and instruct the agent to use the existing integrations in the codebase.
- **Acceptance criteria**: how to verify each requirement is met
- **Open questions**: anything unresolved that needs clarification

## Workflow

### Step 1: Convert to Markdown

Use the `docx` (or `pdf` / `pptx`) skill to convert your PRD into a clean markdown file that the agent can work with.

Attach your PRD file (`.docx`, `.pdf`, or `.pptx`) to the chat message along with the prompt below. In VS Code Copilot Chat, use the paperclip icon or drag-and-drop; in Claude Code or other CLI agents, reference the file path directly.

#### Prompt

```
Convert this PRD from .docx to markdown for AI ingestion. Please:
- Preserve the heading hierarchy (H1, H2, H3)
- Keep all lists, tables, and numbered requirements intact
- Maintain the logical section order
- Extract any embedded images to a separate folder and reference them with relative links
- Flag anything that doesn't translate cleanly (complex tables, diagrams, text boxes, tracked changes)
- Strip out purely decorative elements (cover page styling, headers/footers, page numbers)
- Save the output as [filename].md
```

:::tip
Review the generated markdown file before moving on. Fix any formatting issues or missing content now, everything downstream depends on this file being accurate.
:::

### Step 2: Define & Clarify Requirements (Optional)

Use the `requirements-analysis` skill to audit the PRD and identify gaps, ambiguities, or untestable requirements.

#### Prompt

```
Here's my PRD. Using the requirements-analysis skill, audit it against
states RA0–RA4. For each requirement, flag which state's symptoms apply,
ask me the key questions for that state, and identify what's missing
for RA5 (validated).
```

This step is optional but recommended for large or complex PRDs. It catches vague requirements before they turn into rework.

### Step 3: Plan the Implementation

Use the `prd-to-plan` skill to break the PRD into a phased implementation plan with vertical slices.

#### Prompt

```
I've added our PRD for the [App Name] to be built on top of RAD Template.
Please convert this into a phased implementation plan using vertical slices,
and save it to ./plans/. Take a look at the codebase first so the
architectural decisions match what we already have.
```

The skill writes a plan file to `./plans/<feature>.md` that you can review and adjust before building.

### Step 4: Build the Code

Use the `incremental-implementation` skill to build each slice from the plan, test it, verify it, then move on to the next.

#### Prompt

```
Using the plan in ./plans/[feature].md, implement the first phase.
Build each slice incrementally (implement, test, verify) before
moving to the next.
```

The skill builds in small increments, implement, test, verify, expand, reducing the risk of large, hard-to-debug changes. It picks up where `prd-to-plan` left off by consuming the `./plans/<feature>.md` file generated in Step 3.

## Quick Reference

| Step | Skill                        | What it does                                    |
| ---- | ---------------------------- | ----------------------------------------------- |
| 1    | `docx` / `pdf` / `pptx`      | Converts the PRD document to markdown           |
| 2    | `requirements-analysis`      | Audits requirements for completeness (optional) |
| 3    | `prd-to-plan`                | Creates a phased implementation plan            |
| 4    | `incremental-implementation` | Builds code in small, tested increments         |
