create extension if not exists vector with schema extensions;

-- Migration: initial_schema
-- Purpose: Core tables for provider profile, elicitation responses,
-- knowledge-base chunks, and generated documents.
-- Guardrails: no participant personal data; all provider-facing tables
-- use Row Level Security with ownership-based policies.

-- ── Extensions ──────────────────────────────────────────────────────

-- pgvector for embedding storage and cosine similarity search
create extension if not exists vector with schema extensions;

-- ── Enums ───────────────────────────────────────────────────────────

create type business_structure as enum ('sole_trader', 'partnership', 'company');
create type proportionality_tier as enum ('sole_trader', 'small_team');
create type answer_type as enum ('structured', 'narrative', 'multi_select');
create type doc_status as enum ('draft', 'reviewed', 'finalised');

-- ── Tables ──────────────────────────────────────────────────────────

-- providers: one row per registered provider, owned by an auth user.
create table providers (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  business_name text,
  abn text,
  business_structure business_structure,
  staff_count int,
  registration_groups text[] not null default '{}',
  service_modes text[] not null default '{}',
  states text[] not null default '{}',
  proportionality_tier proportionality_tier,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- elicitation_responses: one row per answered question.
create table elicitation_responses (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references providers(id) on delete cascade,
  module_id text not null,
  question_id text not null,
  answer_type answer_type not null,
  answer_value jsonb not null,
  standard_refs text[] not null default '{}',
  code_refs text[] not null default '{}',
  rule_refs text[] not null default '{}',
  doc_sections_served text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider_id, module_id, question_id)
);

-- kb_chunks: retrieval-augmented generation source chunks.
-- Populated later by service_role; read by authenticated users.
create table kb_chunks (
  id uuid primary key default gen_random_uuid(),
  source_doc text,
  source_ref text,
  chunk_text text not null,
  embedding extensions.vector(1536),
  standard_ref text,
  rule_ref text,
  kb_version text,
  created_at timestamptz not null default now()
);

-- generated_documents: draft documents produced for a provider.
create table generated_documents (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references providers(id) on delete cascade,
  doc_type text not null,
  status doc_status not null default 'draft',
  content jsonb not null,
  doc_version int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Indexes ─────────────────────────────────────────────────────────

create index idx_providers_owner on providers(owner_user_id);
create index idx_elicitation_provider_module on elicitation_responses(provider_id, module_id);
create index idx_generated_docs_provider on generated_documents(provider_id);

-- ivfflat index for approximate nearest-neighbour cosine search on embeddings
create index idx_kb_chunks_embedding on kb_chunks
  using ivfflat (embedding extensions.vector_cosine_ops)
  with (lists = 100);

-- ── updated_at auto-update trigger ──────────────────────────────────

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_providers_updated_at
  before update on providers
  for each row execute function update_updated_at_column();

create trigger trg_elicitation_responses_updated_at
  before update on elicitation_responses
  for each row execute function update_updated_at_column();

create trigger trg_generated_documents_updated_at
  before update on generated_documents
  for each row execute function update_updated_at_column();

-- ── Row Level Security ────────────────────────────────────────────────

-- Enable RLS on all four tables
alter table providers enable row level security;
alter table elicitation_responses enable row level security;
alter table generated_documents enable row level security;
alter table kb_chunks enable row level security;

-- providers: owner-only full access
create policy providers_select_own
  on providers for select
  to authenticated
  using (owner_user_id = auth.uid());

create policy providers_insert_own
  on providers for insert
  to authenticated
  with check (owner_user_id = auth.uid());

create policy providers_update_own
  on providers for update
  to authenticated
  using (owner_user_id = auth.uid())
  with check (owner_user_id = auth.uid());

create policy providers_delete_own
  on providers for delete
  to authenticated
  using (owner_user_id = auth.uid());

-- elicitation_responses: ownership via provider
create policy elicitation_select_own
  on elicitation_responses for select
  to authenticated
  using (
    provider_id in (
      select id from providers where owner_user_id = auth.uid()
    )
  );

create policy elicitation_insert_own
  on elicitation_responses for insert
  to authenticated
  with check (
    provider_id in (
      select id from providers where owner_user_id = auth.uid()
    )
  );

create policy elicitation_update_own
  on elicitation_responses for update
  to authenticated
  using (
    provider_id in (
      select id from providers where owner_user_id = auth.uid()
    )
  )
  with check (
    provider_id in (
      select id from providers where owner_user_id = auth.uid()
    )
  );

create policy elicitation_delete_own
  on elicitation_responses for delete
  to authenticated
  using (
    provider_id in (
      select id from providers where owner_user_id = auth.uid()
    )
  );

-- generated_documents: same ownership pattern as elicitation_responses
create policy generated_docs_select_own
  on generated_documents for select
  to authenticated
  using (
    provider_id in (
      select id from providers where owner_user_id = auth.uid()
    )
  );

create policy generated_docs_insert_own
  on generated_documents for insert
  to authenticated
  with check (
    provider_id in (
      select id from providers where owner_user_id = auth.uid()
    )
  );

create policy generated_docs_update_own
  on generated_documents for update
  to authenticated
  using (
    provider_id in (
      select id from providers where owner_user_id = auth.uid()
    )
  )
  with check (
    provider_id in (
      select id from providers where owner_user_id = auth.uid()
    )
  );

create policy generated_docs_delete_own
  on generated_documents for delete
  to authenticated
  using (
    provider_id in (
      select id from providers where owner_user_id = auth.uid()
    )
  );

-- kb_chunks: SELECT for any authenticated user; no insert/update/delete
-- (service_role bypasses RLS and writes these)
create policy kb_chunks_select_authenticated
  on kb_chunks for select
  to authenticated
  using (true);