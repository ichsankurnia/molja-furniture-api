PGDMP     	    '        	    
    y         
   db_catalog    11.6    12.2 #    C           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            D           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            E           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            F           1262    47598 
   db_catalog    DATABASE     �   CREATE DATABASE db_catalog WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_Indonesia.1252' LC_CTYPE = 'English_Indonesia.1252';
    DROP DATABASE db_catalog;
                postgres    false                        2615    2200    catalog    SCHEMA        CREATE SCHEMA catalog;
    DROP SCHEMA catalog;
                postgres    false            G           0    0    SCHEMA catalog    COMMENT     7   COMMENT ON SCHEMA catalog IS 'standard public schema';
                   postgres    false    3            �            1259    48338    catalog_id_seq    SEQUENCE     x   CREATE SEQUENCE catalog.catalog_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE catalog.catalog_id_seq;
       catalog          postgres    false    3            �            1259    48340    client_id_seq    SEQUENCE     w   CREATE SEQUENCE catalog.client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE catalog.client_id_seq;
       catalog          postgres    false    3            �            1259    48307 
   t_about_us    TABLE     �   CREATE TABLE catalog.t_about_us (
    id bigint NOT NULL,
    company_name character varying NOT NULL,
    company_desc text,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone,
    images text
);
    DROP TABLE catalog.t_about_us;
       catalog            postgres    false    3            �            1259    48316 	   t_article    TABLE     �   CREATE TABLE catalog.t_article (
    id bigint NOT NULL,
    title character varying,
    body text,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone
);
    DROP TABLE catalog.t_article;
       catalog            postgres    false    3            �            1259    48322 	   t_catalog    TABLE     ~  CREATE TABLE catalog.t_catalog (
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
    DROP TABLE catalog.t_catalog;
       catalog            postgres    false    205    3            �            1259    48325    t_category_catalog    TABLE     �   CREATE TABLE catalog.t_category_catalog (
    id bigint NOT NULL,
    category_name character varying,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone
);
 '   DROP TABLE catalog.t_category_catalog;
       catalog            postgres    false    3            �            1259    48319    t_client    TABLE     +  CREATE TABLE catalog.t_client (
    id bigint DEFAULT nextval('catalog.client_id_seq'::regclass) NOT NULL,
    client_name character varying NOT NULL,
    client_desc text,
    image text,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone
);
    DROP TABLE catalog.t_client;
       catalog            postgres    false    206    3            �            1259    48310    t_contact_us    TABLE       CREATE TABLE catalog.t_contact_us (
    id bigint NOT NULL,
    address text,
    telp character varying,
    whatsapp_number character varying,
    email character varying,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone
);
 !   DROP TABLE catalog.t_contact_us;
       catalog            postgres    false    3            �            1259    47614    user_id_seq    SEQUENCE     u   CREATE SEQUENCE catalog.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE catalog.user_id_seq;
       catalog          postgres    false    3            �            1259    47599    t_user    TABLE     �  CREATE TABLE catalog.t_user (
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
    DROP TABLE catalog.t_user;
       catalog            postgres    false    198    3            �            1259    47608    t_user_role    TABLE     h   CREATE TABLE catalog.t_user_role (
    id integer NOT NULL,
    role_name character varying NOT NULL
);
     DROP TABLE catalog.t_user_role;
       catalog            postgres    false    3            9          0    48307 
   t_about_us 
   TABLE DATA           e   COPY catalog.t_about_us (id, company_name, company_desc, created_on, updated_on, images) FROM stdin;
    catalog          postgres    false    199            ;          0    48316 	   t_article 
   TABLE DATA           M   COPY catalog.t_article (id, title, body, created_on, updated_on) FROM stdin;
    catalog          postgres    false    201            =          0    48322 	   t_catalog 
   TABLE DATA           {   COPY catalog.t_catalog (id, name, images, dimention, button, created_on, updated_on, category_id, description) FROM stdin;
    catalog          postgres    false    203            >          0    48325    t_category_catalog 
   TABLE DATA           X   COPY catalog.t_category_catalog (id, category_name, created_on, updated_on) FROM stdin;
    catalog          postgres    false    204            <          0    48319    t_client 
   TABLE DATA           `   COPY catalog.t_client (id, client_name, client_desc, image, created_on, updated_on) FROM stdin;
    catalog          postgres    false    202            :          0    48310    t_contact_us 
   TABLE DATA           j   COPY catalog.t_contact_us (id, address, telp, whatsapp_number, email, created_on, updated_on) FROM stdin;
    catalog          postgres    false    200            6          0    47599    t_user 
   TABLE DATA           z   COPY catalog.t_user (id, username, password, fullname, role_id, created_on, updated_on, last_login_on, email) FROM stdin;
    catalog          postgres    false    196            7          0    47608    t_user_role 
   TABLE DATA           5   COPY catalog.t_user_role (id, role_name) FROM stdin;
    catalog          postgres    false    197            H           0    0    catalog_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('catalog.catalog_id_seq', 7, true);
          catalog          postgres    false    205            I           0    0    client_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('catalog.client_id_seq', 6, true);
          catalog          postgres    false    206            J           0    0    user_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('catalog.user_id_seq', 14, true);
          catalog          postgres    false    198            �
           2606    48369    t_about_us t_about_us_pk 
   CONSTRAINT     W   ALTER TABLE ONLY catalog.t_about_us
    ADD CONSTRAINT t_about_us_pk PRIMARY KEY (id);
 C   ALTER TABLE ONLY catalog.t_about_us DROP CONSTRAINT t_about_us_pk;
       catalog            postgres    false    199            �
           2606    48356    t_article t_article_pk 
   CONSTRAINT     U   ALTER TABLE ONLY catalog.t_article
    ADD CONSTRAINT t_article_pk PRIMARY KEY (id);
 A   ALTER TABLE ONLY catalog.t_article DROP CONSTRAINT t_article_pk;
       catalog            postgres    false    201            �
           2606    48344    t_catalog t_catalog_pk 
   CONSTRAINT     U   ALTER TABLE ONLY catalog.t_catalog
    ADD CONSTRAINT t_catalog_pk PRIMARY KEY (id);
 A   ALTER TABLE ONLY catalog.t_catalog DROP CONSTRAINT t_catalog_pk;
       catalog            postgres    false    203            �
           2606    48329 (   t_category_catalog t_category_catalog_pk 
   CONSTRAINT     g   ALTER TABLE ONLY catalog.t_category_catalog
    ADD CONSTRAINT t_category_catalog_pk PRIMARY KEY (id);
 S   ALTER TABLE ONLY catalog.t_category_catalog DROP CONSTRAINT t_category_catalog_pk;
       catalog            postgres    false    204            �
           2606    48350    t_client t_client_pk 
   CONSTRAINT     S   ALTER TABLE ONLY catalog.t_client
    ADD CONSTRAINT t_client_pk PRIMARY KEY (id);
 ?   ALTER TABLE ONLY catalog.t_client DROP CONSTRAINT t_client_pk;
       catalog            postgres    false    202            �
           2606    48375    t_contact_us t_contact_us_pk 
   CONSTRAINT     [   ALTER TABLE ONLY catalog.t_contact_us
    ADD CONSTRAINT t_contact_us_pk PRIMARY KEY (id);
 G   ALTER TABLE ONLY catalog.t_contact_us DROP CONSTRAINT t_contact_us_pk;
       catalog            postgres    false    200            �
           2606    47607    t_user t_user_pk 
   CONSTRAINT     O   ALTER TABLE ONLY catalog.t_user
    ADD CONSTRAINT t_user_pk PRIMARY KEY (id);
 ;   ALTER TABLE ONLY catalog.t_user DROP CONSTRAINT t_user_pk;
       catalog            postgres    false    196            9   �   x���M
�0��ur�^ �LZ�3�'pS�!��MaF�xx6.7·��yQmW�iVB,M"�'VD� ?��`��9P���-u�\Y�����:fb{����;o�b��]��Ї�ݷ|���K���L�lt������Z? ��M�      ;   W   x�3�L,*�L�IU(�,�I-..�,��,V ����J����\���T�2N##C]CC]+cS+3�����������W� �d�      =   �   x�}��N�0E����&�_\�H,-��У6��ԎjGO���w:�9=T_�T�`�u�m;�#�C.�*�t�|i��>��¸���!&�ȧ<y�}�9�+��+�p
�Ü��	�цHk�N�͔�nY�n��duo����oWnfml��q��g�|Mcf����1��*բ}���Nݳހ���/��Q6B�_F�V)      >   D   x�3�t�(I-��/�4202�54�5�P00�22�26���2���ï�199��8�(3���=... Շ�      <   t   x�]�9
�0@�Z:E. k�Fs�4&Z"G���q�"��nFn�knHlJ>KI��\%5��x��sm[�!�����5륵���p�9^0�t|�! t���P�?c^�c��~ �&�      :   [   x�3�L��T�J�N,*I�402�@CN3#c#ScScΒ���������\N#�2]CC]+c+#K�����������W� �6"      6   k   x�34��L�(N��.-��L�
(v/�L�2su�+3��K������4�4202�54�5�T04�22�20���"l��eh�Y�Z\B�yF�bfVƖ�b&F�\1z\\\ �H+�      7      x�3�LL����2�,-N-����� : �      #    C           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            D           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            E           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            F           1262    47598 
   db_catalog    DATABASE     �   CREATE DATABASE db_catalog WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_Indonesia.1252' LC_CTYPE = 'English_Indonesia.1252';
    DROP DATABASE db_catalog;
                postgres    false                        2615    2200    catalog    SCHEMA        CREATE SCHEMA catalog;
    DROP SCHEMA catalog;
                postgres    false            G           0    0    SCHEMA catalog    COMMENT     7   COMMENT ON SCHEMA catalog IS 'standard public schema';
                   postgres    false    3            �            1259    48338    catalog_id_seq    SEQUENCE     x   CREATE SEQUENCE catalog.catalog_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE catalog.catalog_id_seq;
       catalog          postgres    false    3            �            1259    48340    client_id_seq    SEQUENCE     w   CREATE SEQUENCE catalog.client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE catalog.client_id_seq;
       catalog          postgres    false    3            �            1259    48307 
   t_about_us    TABLE     �   CREATE TABLE catalog.t_about_us (
    id bigint NOT NULL,
    company_name character varying NOT NULL,
    company_desc text,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone,
    images text
);
    DROP TABLE catalog.t_about_us;
       catalog            postgres    false    3            �            1259    48316 	   t_article    TABLE     �   CREATE TABLE catalog.t_article (
    id bigint NOT NULL,
    title character varying,
    body text,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone
);
    DROP TABLE catalog.t_article;
       catalog            postgres    false    3            �            1259    48322 	   t_catalog    TABLE     ~  CREATE TABLE catalog.t_catalog (
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
    DROP TABLE catalog.t_catalog;
       catalog            postgres    false    205    3            �            1259    48325    t_category_catalog    TABLE     �   CREATE TABLE catalog.t_category_catalog (
    id bigint NOT NULL,
    category_name character varying,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone
);
 '   DROP TABLE catalog.t_category_catalog;
       catalog            postgres    false    3            �            1259    48319    t_client    TABLE     +  CREATE TABLE catalog.t_client (
    id bigint DEFAULT nextval('catalog.client_id_seq'::regclass) NOT NULL,
    client_name character varying NOT NULL,
    client_desc text,
    image text,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone
);
    DROP TABLE catalog.t_client;
       catalog            postgres    false    206    3            �            1259    48310    t_contact_us    TABLE       CREATE TABLE catalog.t_contact_us (
    id bigint NOT NULL,
    address text,
    telp character varying,
    whatsapp_number character varying,
    email character varying,
    created_on timestamp(0) without time zone DEFAULT now(),
    updated_on timestamp(0) without time zone
);
 !   DROP TABLE catalog.t_contact_us;
       catalog            postgres    false    3            �            1259    47614    user_id_seq    SEQUENCE     u   CREATE SEQUENCE catalog.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE catalog.user_id_seq;
       catalog          postgres    false    3            �            1259    47599    t_user    TABLE     �  CREATE TABLE catalog.t_user (
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
    DROP TABLE catalog.t_user;
       catalog            postgres    false    198    3            �            1259    47608    t_user_role    TABLE     h   CREATE TABLE catalog.t_user_role (
    id integer NOT NULL,
    role_name character varying NOT NULL
);
     DROP TABLE catalog.t_user_role;
       catalog            postgres    false    3            9          0    48307 
   t_about_us 
   TABLE DATA           e   COPY catalog.t_about_us (id, company_name, company_desc, created_on, updated_on, images) FROM stdin;
    catalog          postgres    false    199            ;          0    48316 	   t_article 
   TABLE DATA           M   COPY catalog.t_article (id, title, body, created_on, updated_on) FROM stdin;
    catalog          postgres    false    201   �        =          0    48322 	   t_catalog 
   TABLE DATA           {   COPY catalog.t_catalog (id, name, images, dimention, button, created_on, updated_on, category_id, description) FROM stdin;
    catalog          postgres    false    203   a        >          0    48325    t_category_catalog 
   TABLE DATA           X   COPY catalog.t_category_catalog (id, category_name, created_on, updated_on) FROM stdin;
    catalog          postgres    false    204   �        <          0    48319    t_client 
   TABLE DATA           `   COPY catalog.t_client (id, client_name, client_desc, image, created_on, updated_on) FROM stdin;
    catalog          postgres    false    202   N        :          0    48310    t_contact_us 
   TABLE DATA           j   COPY catalog.t_contact_us (id, address, telp, whatsapp_number, email, created_on, updated_on) FROM stdin;
    catalog          postgres    false    200   ~        6          0    47599    t_user 
   TABLE DATA           z   COPY catalog.t_user (id, username, password, fullname, role_id, created_on, updated_on, last_login_on, email) FROM stdin;
    catalog          postgres    false    196   e        7          0    47608    t_user_role 
   TABLE DATA           5   COPY catalog.t_user_role (id, role_name) FROM stdin;
    catalog          postgres    false    197   u        H           0    0    catalog_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('catalog.catalog_id_seq', 7, true);
          catalog          postgres    false    205            I           0    0    client_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('catalog.client_id_seq', 6, true);
          catalog          postgres    false    206            J           0    0    user_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('catalog.user_id_seq', 14, true);
          catalog          postgres    false    198            �
           2606    48369    t_about_us t_about_us_pk 
   CONSTRAINT     W   ALTER TABLE ONLY catalog.t_about_us
    ADD CONSTRAINT t_about_us_pk PRIMARY KEY (id);
 C   ALTER TABLE ONLY catalog.t_about_us DROP CONSTRAINT t_about_us_pk;
       catalog            postgres    false    199            �
           2606    48356    t_article t_article_pk 
   CONSTRAINT     U   ALTER TABLE ONLY catalog.t_article
    ADD CONSTRAINT t_article_pk PRIMARY KEY (id);
 A   ALTER TABLE ONLY catalog.t_article DROP CONSTRAINT t_article_pk;
       catalog            postgres    false    201            �
           2606    48344    t_catalog t_catalog_pk 
   CONSTRAINT     U   ALTER TABLE ONLY catalog.t_catalog
    ADD CONSTRAINT t_catalog_pk PRIMARY KEY (id);
 A   ALTER TABLE ONLY catalog.t_catalog DROP CONSTRAINT t_catalog_pk;
       catalog            postgres    false    203            �
           2606    48329 (   t_category_catalog t_category_catalog_pk 
   CONSTRAINT     g   ALTER TABLE ONLY catalog.t_category_catalog
    ADD CONSTRAINT t_category_catalog_pk PRIMARY KEY (id);
 S   ALTER TABLE ONLY catalog.t_category_catalog DROP CONSTRAINT t_category_catalog_pk;
       catalog            postgres    false    204            �
           2606    48350    t_client t_client_pk 
   CONSTRAINT     S   ALTER TABLE ONLY catalog.t_client
    ADD CONSTRAINT t_client_pk PRIMARY KEY (id);
 ?   ALTER TABLE ONLY catalog.t_client DROP CONSTRAINT t_client_pk;
       catalog            postgres    false    202            �
           2606    48375    t_contact_us t_contact_us_pk 
   CONSTRAINT     [   ALTER TABLE ONLY catalog.t_contact_us
    ADD CONSTRAINT t_contact_us_pk PRIMARY KEY (id);
 G   ALTER TABLE ONLY catalog.t_contact_us DROP CONSTRAINT t_contact_us_pk;
       catalog            postgres    false    200            �
           2606    47607    t_user t_user_pk 
   CONSTRAINT     O   ALTER TABLE ONLY catalog.t_user
    ADD CONSTRAINT t_user_pk PRIMARY KEY (id);
 ;   ALTER TABLE ONLY catalog.t_user DROP CONSTRAINT t_user_pk;
       catalog            postgres    false    196           