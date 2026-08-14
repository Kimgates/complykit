# AGENTS.md — Project Rules for {PRODUCT_NAME}

## Product Definition

{PRODUCT_NAME} is a draft document preparation tool for NDIS providers. It interviews providers about how they operate and generates DRAFT policy and procedure documents for the NDIS verification registration pathway. Target user: sole traders and micro-providers, 1–5 staff.

This product is NOT a compliance assessment tool. It does not tell providers they are compliant, audit-ready, or passing any standard.

## Permanent Constraints

### 1. No Participant Personal Data
This product NEVER collects personal information about NDIS participants. Only information about how the PROVIDER operates. Do not add participant fields (name, NDIS number, contact, DOB, address, emergency contacts, plan details, health info, support needs).

Add this comment block at the top of any form config file:
```
// ARCHITECTURAL CONSTRAINT: This product NEVER collects personal information about NDIS participants.
// Only information about how the PROVIDER operates. Do not add participant fields.
```

### 2. No Compliance Determinations
This product never asserts compliance, audit-readiness, or a pass/fail result. Banned strings in user-facing copy:
- "audit-ready", "audit ready"
- "compliance score"
- "passed", "pass rate"
- "guaranteed"
- "ensure compliance"
- "gaps fixed"
- "16 modules" (the NDIS Practice Standards do not have 16 modules)

Allowed: "draft", "prepared from your responses", "review and edit before use", "document preparation".

### 3. Correct Regulatory Model

The NDIS Practice Standards per the National Disability Insurance Scheme (Provider Registration and Practice Standards) Rules 2018:
- Core Module plus supplementary modules numbered as Modules 1–6 in the Schedules
- Providers assessed by VERIFICATION are assessed against **Module 6: Verification**, which has exactly four outcomes:
  1. Risk management — "Risks to participants, workers and the provider are identified and managed."
  2. Complaints management and resolution
  3. Incident management
  4. Human resource management
- The NDIS Code of Conduct has EIGHT elements (element 8 added December 2023). It applies to registered AND unregistered providers.
- The regulator's formal name is "NDIS Quality and Safeguards Commission". Never abbreviate in user-facing copy.

Never invent NDIS regulatory facts. If a reference is needed and unverified, mark it `[VERIFY: source needed]` and surface it to Gabriel before proceeding.

### 4. Australian English
Use Australian English throughout: "optimise", "organisation", "licence" (noun), "practise" (verb).

### 5. Draft Banner
Every route displaying generated or draft content must render a persistent, non-dismissable banner:
"DRAFT — This document is a draft prepared from your responses. You must review, edit, and approve it before use. This tool does not provide compliance advice."

### 6. Definition of Done
Gabriel has personally run the feature end-to-end and verified each done criterion. Plan approved ≠ done. Code written ≠ done. Build passes ≠ done.

## Product Name
Use the constant `PRODUCT_NAME` from `src/config/product.ts`. Do not hardcode the product name in files.
