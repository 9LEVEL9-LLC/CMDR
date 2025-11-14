--
-- PostgreSQL database dump
--

-- Dumped from database version 16.10 (Debian 16.10-1.pgdg12+1)
-- Dumped by pg_dump version 18.0 (Debian 18.0-1.pgdg12+3)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.stage_change_approvals DROP CONSTRAINT IF EXISTS stage_change_approvals_project_id_fkey;
ALTER TABLE IF EXISTS ONLY public.stage_change_approvals DROP CONSTRAINT IF EXISTS stage_change_approvals_attachment_file_id_fkey;
ALTER TABLE IF EXISTS ONLY public.stage_change_approvals DROP CONSTRAINT IF EXISTS stage_change_approvals_advisor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.projects DROP CONSTRAINT IF EXISTS projects_client_id_fkey;
ALTER TABLE IF EXISTS ONLY public.project_messages DROP CONSTRAINT IF EXISTS project_messages_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.project_messages DROP CONSTRAINT IF EXISTS project_messages_project_id_fkey;
ALTER TABLE IF EXISTS ONLY public.project_files DROP CONSTRAINT IF EXISTS project_files_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.project_files DROP CONSTRAINT IF EXISTS project_files_project_id_fkey;
ALTER TABLE IF EXISTS ONLY public.agent_ideas DROP CONSTRAINT IF EXISTS agent_ideas_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.agent_ideas DROP CONSTRAINT IF EXISTS agent_ideas_project_id_fkey;
ALTER TABLE IF EXISTS ONLY public.advisor_clients DROP CONSTRAINT IF EXISTS advisor_clients_client_id_fkey;
ALTER TABLE IF EXISTS ONLY public.advisor_clients DROP CONSTRAINT IF EXISTS advisor_clients_advisor_id_fkey;
DROP INDEX IF EXISTS public.idx_stage_approvals_project_status;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_username_key;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_key;
ALTER TABLE IF EXISTS ONLY public.stage_change_approvals DROP CONSTRAINT IF EXISTS stage_change_approvals_pkey;
ALTER TABLE IF EXISTS ONLY public.projects DROP CONSTRAINT IF EXISTS projects_pkey;
ALTER TABLE IF EXISTS ONLY public.project_messages DROP CONSTRAINT IF EXISTS project_messages_pkey;
ALTER TABLE IF EXISTS ONLY public.project_files DROP CONSTRAINT IF EXISTS project_files_pkey;
ALTER TABLE IF EXISTS ONLY public.agent_ideas DROP CONSTRAINT IF EXISTS agent_ideas_pkey;
ALTER TABLE IF EXISTS ONLY public.advisor_clients DROP CONSTRAINT IF EXISTS advisor_clients_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.stage_change_approvals ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.projects ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.project_messages ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.project_files ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.stage_change_approvals_id_seq;
DROP TABLE IF EXISTS public.stage_change_approvals;
DROP SEQUENCE IF EXISTS public.projects_id_seq;
DROP TABLE IF EXISTS public.projects;
DROP SEQUENCE IF EXISTS public.project_messages_id_seq;
DROP TABLE IF EXISTS public.project_messages;
DROP SEQUENCE IF EXISTS public.project_files_id_seq;
DROP TABLE IF EXISTS public.project_files;
DROP TABLE IF EXISTS public.agent_ideas;
DROP TABLE IF EXISTS public.advisor_clients;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: advisor_clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.advisor_clients (
    advisor_id integer NOT NULL,
    client_id integer NOT NULL
);


--
-- Name: agent_ideas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.agent_ideas (
    id character varying NOT NULL,
    title text NOT NULL,
    summary text NOT NULL,
    steps jsonb NOT NULL,
    agent_stack jsonb NOT NULL,
    client_requirements jsonb NOT NULL,
    conversation_history jsonb,
    status text DEFAULT 'draft'::text,
    agent_type text,
    implementation_estimate jsonb,
    security_considerations jsonb,
    future_enhancements jsonb,
    build_phases jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    user_id integer,
    project_id integer
);


--
-- Name: project_files; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_files (
    id integer NOT NULL,
    project_id integer NOT NULL,
    user_id integer,
    filename text NOT NULL,
    originalname text NOT NULL,
    mimetype text,
    size integer,
    created_at timestamp with time zone DEFAULT now(),
    advisor_only boolean DEFAULT false
);


--
-- Name: project_files_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_files_id_seq OWNED BY public.project_files.id;


--
-- Name: project_messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_messages (
    id integer NOT NULL,
    project_id integer NOT NULL,
    user_id integer,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: project_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_messages_id_seq OWNED BY public.project_messages.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    client_id integer NOT NULL,
    name text NOT NULL,
    status text NOT NULL,
    eta text,
    project_stage text DEFAULT 'Scope'::text,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: stage_change_approvals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stage_change_approvals (
    id integer NOT NULL,
    project_id integer NOT NULL,
    advisor_id integer NOT NULL,
    from_stage text NOT NULL,
    to_stage text NOT NULL,
    message text,
    attachment_file_id integer,
    status text DEFAULT 'pending'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    approved_at timestamp with time zone,
    rejected_at timestamp with time zone
);


--
-- Name: stage_change_approvals_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stage_change_approvals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stage_change_approvals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stage_change_approvals_id_seq OWNED BY public.stage_change_approvals.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    role text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    company_name text,
    website_url text,
    phone text
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: project_files id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_files ALTER COLUMN id SET DEFAULT nextval('public.project_files_id_seq'::regclass);


--
-- Name: project_messages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_messages ALTER COLUMN id SET DEFAULT nextval('public.project_messages_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: stage_change_approvals id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_change_approvals ALTER COLUMN id SET DEFAULT nextval('public.stage_change_approvals_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: advisor_clients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.advisor_clients (advisor_id, client_id) FROM stdin;
\.


--
-- Data for Name: agent_ideas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.agent_ideas (id, title, summary, steps, agent_stack, client_requirements, conversation_history, status, agent_type, implementation_estimate, security_considerations, future_enhancements, build_phases, created_at, updated_at, user_id, project_id) FROM stdin;
\.


--
-- Data for Name: project_files; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.project_files (id, project_id, user_id, filename, originalname, mimetype, size, created_at, advisor_only) FROM stdin;
\.


--
-- Data for Name: project_messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.project_messages (id, project_id, user_id, content, created_at) FROM stdin;
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.projects (id, client_id, name, status, eta, project_stage, created_at) FROM stdin;
\.


--
-- Data for Name: stage_change_approvals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.stage_change_approvals (id, project_id, advisor_id, from_stage, to_stage, message, attachment_file_id, status, created_at, approved_at, rejected_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, role, name, email, username, password, company_name, website_url, phone) FROM stdin;
\.


--
-- Name: project_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.project_files_id_seq', 1, false);


--
-- Name: project_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.project_messages_id_seq', 1, false);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.projects_id_seq', 1, false);


--
-- Name: stage_change_approvals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.stage_change_approvals_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: advisor_clients advisor_clients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.advisor_clients
    ADD CONSTRAINT advisor_clients_pkey PRIMARY KEY (advisor_id, client_id);


--
-- Name: agent_ideas agent_ideas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.agent_ideas
    ADD CONSTRAINT agent_ideas_pkey PRIMARY KEY (id);


--
-- Name: project_files project_files_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_files
    ADD CONSTRAINT project_files_pkey PRIMARY KEY (id);


--
-- Name: project_messages project_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_messages
    ADD CONSTRAINT project_messages_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: stage_change_approvals stage_change_approvals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_change_approvals
    ADD CONSTRAINT stage_change_approvals_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: idx_stage_approvals_project_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_stage_approvals_project_status ON public.stage_change_approvals USING btree (project_id, status);


--
-- Name: advisor_clients advisor_clients_advisor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.advisor_clients
    ADD CONSTRAINT advisor_clients_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: advisor_clients advisor_clients_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.advisor_clients
    ADD CONSTRAINT advisor_clients_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: agent_ideas agent_ideas_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.agent_ideas
    ADD CONSTRAINT agent_ideas_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE SET NULL;


--
-- Name: agent_ideas agent_ideas_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.agent_ideas
    ADD CONSTRAINT agent_ideas_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: project_files project_files_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_files
    ADD CONSTRAINT project_files_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: project_files project_files_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_files
    ADD CONSTRAINT project_files_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: project_messages project_messages_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_messages
    ADD CONSTRAINT project_messages_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: project_messages project_messages_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_messages
    ADD CONSTRAINT project_messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: projects projects_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: stage_change_approvals stage_change_approvals_advisor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_change_approvals
    ADD CONSTRAINT stage_change_approvals_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: stage_change_approvals stage_change_approvals_attachment_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_change_approvals
    ADD CONSTRAINT stage_change_approvals_attachment_file_id_fkey FOREIGN KEY (attachment_file_id) REFERENCES public.project_files(id) ON DELETE SET NULL;


--
-- Name: stage_change_approvals stage_change_approvals_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_change_approvals
    ADD CONSTRAINT stage_change_approvals_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

