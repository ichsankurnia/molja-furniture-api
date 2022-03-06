--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9
-- Dumped by pg_dump version 12.9

-- Started on 2022-03-06 18:53:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 7 (class 2615 OID 23133)
-- Name: catalog; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA catalog;


ALTER SCHEMA catalog OWNER TO postgres;

--
-- TOC entry 2898 (class 0 OID 0)
-- Dependencies: 7
-- Name: SCHEMA catalog; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA catalog IS 'standard public schema';


--
-- TOC entry 203 (class 1259 OID 23134)
-- Name: catalog_id_seq; Type: SEQUENCE; Schema: catalog; Owner: postgres
--

CREATE SEQUENCE catalog.catalog_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE catalog.catalog_id_seq OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 24122)
-- Name: category_id_seq; Type: SEQUENCE; Schema: catalog; Owner: postgres
--

CREATE SEQUENCE catalog.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE catalog.category_id_seq OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 23136)
-- Name: client_id_seq; Type: SEQUENCE; Schema: catalog; Owner: postgres
--

CREATE SEQUENCE catalog.client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE catalog.client_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 23138)
-- Name: t_about_us; Type: TABLE; Schema: catalog; Owner: postgres
--

CREATE TABLE catalog.t_about_us (
    id bigint NOT NULL,
    company_name character varying NOT NULL,
    company_desc text,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone,
    images text
);


ALTER TABLE catalog.t_about_us OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 23145)
-- Name: t_article; Type: TABLE; Schema: catalog; Owner: postgres
--

CREATE TABLE catalog.t_article (
    id bigint NOT NULL,
    title character varying,
    body text,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone
);


ALTER TABLE catalog.t_article OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 23152)
-- Name: t_catalog; Type: TABLE; Schema: catalog; Owner: postgres
--

CREATE TABLE catalog.t_catalog (
    id bigint DEFAULT nextval('catalog.catalog_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    images text,
    dimention character varying,
    button character varying,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone,
    category_id bigint,
    description text
);


ALTER TABLE catalog.t_catalog OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 23160)
-- Name: t_category_catalog; Type: TABLE; Schema: catalog; Owner: postgres
--

CREATE TABLE catalog.t_category_catalog (
    id bigint DEFAULT nextval('catalog.category_id_seq'::regclass) NOT NULL,
    category_name character varying,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone,
    category_desc character varying
);


ALTER TABLE catalog.t_category_catalog OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 23167)
-- Name: t_client; Type: TABLE; Schema: catalog; Owner: postgres
--

CREATE TABLE catalog.t_client (
    id bigint DEFAULT nextval('catalog.client_id_seq'::regclass) NOT NULL,
    client_name character varying NOT NULL,
    client_desc text,
    image text,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone
);


ALTER TABLE catalog.t_client OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 23175)
-- Name: t_contact_us; Type: TABLE; Schema: catalog; Owner: postgres
--

CREATE TABLE catalog.t_contact_us (
    id bigint NOT NULL,
    address text,
    telp character varying,
    whatsapp_number character varying,
    email character varying,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone
);


ALTER TABLE catalog.t_contact_us OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 23182)
-- Name: user_id_seq; Type: SEQUENCE; Schema: catalog; Owner: postgres
--

CREATE SEQUENCE catalog.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE catalog.user_id_seq OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 23184)
-- Name: t_user; Type: TABLE; Schema: catalog; Owner: postgres
--

CREATE TABLE catalog.t_user (
    id bigint DEFAULT nextval('catalog.user_id_seq'::regclass) NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    fullname character varying,
    role_id bigint,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone,
    last_login_on timestamp(0) without time zone,
    email character varying
);


ALTER TABLE catalog.t_user OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 23192)
-- Name: t_user_role; Type: TABLE; Schema: catalog; Owner: postgres
--

CREATE TABLE catalog.t_user_role (
    id integer NOT NULL,
    role_name character varying NOT NULL
);


ALTER TABLE catalog.t_user_role OWNER TO postgres;

--
-- TOC entry 2883 (class 0 OID 23138)
-- Dependencies: 205
-- Data for Name: t_about_us; Type: TABLE DATA; Schema: catalog; Owner: postgres
--

COPY catalog.t_about_us (id, company_name, company_desc, created_on, updated_on, images) FROM stdin;
1	nutechbbbb		2021-11-08 00:42:01	2022-03-06 13:45:49	http://localhost:2323/images/Logo-Nutech-ok-1646549149453.png|http://localhost:2323/images/logo-next-mlbb-1646549149452.png
\.


--
-- TOC entry 2884 (class 0 OID 23145)
-- Dependencies: 206
-- Data for Name: t_article; Type: TABLE DATA; Schema: catalog; Owner: postgres
--

COPY catalog.t_article (id, title, body, created_on, updated_on) FROM stdin;
1	article daa	this is body from the articleddddd	2021-11-08 00:35:46	2022-03-06 10:44:02
\.


--
-- TOC entry 2885 (class 0 OID 23152)
-- Dependencies: 207
-- Data for Name: t_catalog; Type: TABLE DATA; Schema: catalog; Owner: postgres
--

COPY catalog.t_catalog (id, name, images, dimention, button, created_on, updated_on, category_id, description) FROM stdin;
8	Test Product	http://localhost:2323/images/pubg-1646559289346.png|http://localhost:2323/images/Screenshot_2-1646559289347.png|http://localhost:2323/images/LOGO_HIS1-1646559289320.png	2x3x5	fdsfds	2022-03-06 16:34:50	2022-03-06 16:36:00	1	dasfsdfs
9	fsfds	http://localhost:2323/images/mobile-legends-app-icon-1646560337205.png|http://localhost:2323/images/mimosa-1646560337205.png|http://localhost:2323/images/IMG_20200409_215805-1646560337201.png	fsdfsd	fsdfds	2022-03-06 16:52:18	2022-03-06 17:14:16	6	fsdfsd
6	test update	http://localhost:2323/images/download-1636443476648.png	2x2x3		2021-11-09 14:37:02	2022-03-06 18:47:30	2	tambah desc
\.


--
-- TOC entry 2886 (class 0 OID 23160)
-- Dependencies: 208
-- Data for Name: t_category_catalog; Type: TABLE DATA; Schema: catalog; Owner: postgres
--

COPY catalog.t_category_catalog (id, category_name, created_on, updated_on, category_desc) FROM stdin;
1	Exterior	2021-11-08 00:23:33	\N	\N
2	Interior	2021-11-08 00:23:33	\N	\N
3	Accessories	2021-11-08 00:23:33	\N	\N
6	hdgfhfg	2022-03-06 10:59:49	2022-03-06 13:20:26	
\.


--
-- TOC entry 2887 (class 0 OID 23167)
-- Dependencies: 209
-- Data for Name: t_client; Type: TABLE DATA; Schema: catalog; Owner: postgres
--

COPY catalog.t_client (id, client_name, client_desc, image, created_on, updated_on) FROM stdin;
5	telkomsel123	fewffdssdfsdfds	http://localhost:2323/images/logo-telkomsel-1636443037191.png	2021-11-09 14:29:02	2021-11-09 14:30:37
8	Gojek	fsdfsd	http://localhost:2323/images/gojek_ic-1646546924977.png	2022-03-06 13:08:45	\N
\.


--
-- TOC entry 2888 (class 0 OID 23175)
-- Dependencies: 210
-- Data for Name: t_contact_us; Type: TABLE DATA; Schema: catalog; Owner: postgres
--

COPY catalog.t_contact_us (id, address, telp, whatsapp_number, email, created_on, updated_on) FROM stdin;
1	dki jakarta	021123123	628432534543	contactus@mail.com	2021-11-08 00:38:29	2022-03-05 22:27:37
\.


--
-- TOC entry 2890 (class 0 OID 23184)
-- Dependencies: 212
-- Data for Name: t_user; Type: TABLE DATA; Schema: catalog; Owner: postgres
--

COPY catalog.t_user (id, username, password, fullname, role_id, created_on, updated_on, last_login_on, email) FROM stdin;
12	ichsankurnia	ZPsGqYdJ6EENv0OkVgKT8Q==		1	2021-11-09 14:25:02	\N	2021-11-09 14:25:08	
18	dasdssa	ZPsGqYdJ6EENv0OkVgKT8Q==	dsadasdsa	1	2022-03-05 21:21:08	\N	\N	yyosangi@gmail.com
13	test	ZPsGqYdJ6EENv0OkVgKT8Q==		99	2021-11-09 14:25:20	2022-03-05 17:32:15	2022-03-06 17:46:46	
\.


--
-- TOC entry 2891 (class 0 OID 23192)
-- Dependencies: 213
-- Data for Name: t_user_role; Type: TABLE DATA; Schema: catalog; Owner: postgres
--

COPY catalog.t_user_role (id, role_name) FROM stdin;
2	user
1	ADMINSTRATOR
99	SUPER ADMIN
\.


--
-- TOC entry 2899 (class 0 OID 0)
-- Dependencies: 203
-- Name: catalog_id_seq; Type: SEQUENCE SET; Schema: catalog; Owner: postgres
--

SELECT pg_catalog.setval('catalog.catalog_id_seq', 9, true);


--
-- TOC entry 2900 (class 0 OID 0)
-- Dependencies: 214
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: catalog; Owner: postgres
--

SELECT pg_catalog.setval('catalog.category_id_seq', 6, true);


--
-- TOC entry 2901 (class 0 OID 0)
-- Dependencies: 204
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: catalog; Owner: postgres
--

SELECT pg_catalog.setval('catalog.client_id_seq', 8, true);


--
-- TOC entry 2902 (class 0 OID 0)
-- Dependencies: 211
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: catalog; Owner: postgres
--

SELECT pg_catalog.setval('catalog.user_id_seq', 18, true);


--
-- TOC entry 2742 (class 2606 OID 23199)
-- Name: t_about_us t_about_us_pk; Type: CONSTRAINT; Schema: catalog; Owner: postgres
--

ALTER TABLE ONLY catalog.t_about_us
    ADD CONSTRAINT t_about_us_pk PRIMARY KEY (id);


--
-- TOC entry 2744 (class 2606 OID 23201)
-- Name: t_article t_article_pk; Type: CONSTRAINT; Schema: catalog; Owner: postgres
--

ALTER TABLE ONLY catalog.t_article
    ADD CONSTRAINT t_article_pk PRIMARY KEY (id);


--
-- TOC entry 2746 (class 2606 OID 23203)
-- Name: t_catalog t_catalog_pk; Type: CONSTRAINT; Schema: catalog; Owner: postgres
--

ALTER TABLE ONLY catalog.t_catalog
    ADD CONSTRAINT t_catalog_pk PRIMARY KEY (id);


--
-- TOC entry 2748 (class 2606 OID 23205)
-- Name: t_category_catalog t_category_catalog_pk; Type: CONSTRAINT; Schema: catalog; Owner: postgres
--

ALTER TABLE ONLY catalog.t_category_catalog
    ADD CONSTRAINT t_category_catalog_pk PRIMARY KEY (id);


--
-- TOC entry 2750 (class 2606 OID 23207)
-- Name: t_client t_client_pk; Type: CONSTRAINT; Schema: catalog; Owner: postgres
--

ALTER TABLE ONLY catalog.t_client
    ADD CONSTRAINT t_client_pk PRIMARY KEY (id);


--
-- TOC entry 2752 (class 2606 OID 23209)
-- Name: t_contact_us t_contact_us_pk; Type: CONSTRAINT; Schema: catalog; Owner: postgres
--

ALTER TABLE ONLY catalog.t_contact_us
    ADD CONSTRAINT t_contact_us_pk PRIMARY KEY (id);


--
-- TOC entry 2754 (class 2606 OID 23211)
-- Name: t_user t_user_pk; Type: CONSTRAINT; Schema: catalog; Owner: postgres
--

ALTER TABLE ONLY catalog.t_user
    ADD CONSTRAINT t_user_pk PRIMARY KEY (id);


-- Completed on 2022-03-06 18:53:31

--
-- PostgreSQL database dump complete
--

