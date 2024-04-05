DROP TABLE IF EXISTS public.role;
DROP TABLE IF EXISTS public.account;
DROP TABLE IF EXISTS public.dc;
DROP TABLE IF EXISTS public.dc_status;

CREATE TABLE IF NOT EXISTS public.role
(
    id serial PRIMARY KEY,
    role_name VARCHAR(32) NOT NULL,
    role_details VARCHAR(32)  
);
INSERT INTO public.role(role_name, role_details) VALUES('admin', 'Access tout');
INSERT INTO public.role(role_name, role_details) VALUES('user', 'Access limité');

CREATE TABLE account(
    id serial PRIMARY KEY,
    login_name VARCHAR(32) NOT NULL,
    display_name VARCHAR(32),
    pass_word VARCHAR(128) NOT NULL,
	role_id INTEGER NOT NULL
);
INSERT INTO account(login_name, display_name, pass_word, role_id) VALUES('Alex', 'Alex', '$2b$10$Us5z/5AHLJ7bgZv15XR7QeZLWGI0IXIEPdO.dHs2ab3xpYsg0x/L2', 1); -- pass_word:12345


CREATE TABLE dc_status(
    id INT PRIMARY KEY,
    label VARCHAR(32) NOT NULL
);

INSERT INTO public.dc_status(id, label)	VALUES (1, 'Initialisé'),(2, 'Saisie_Encours'), (3, 'Finalisé'), (4, 'Terminé');

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE dc(
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    firstname VARCHAR(32) NOT NULL,
    familyname VARCHAR(32) NOT NULL,
    email VARCHAR(256) NOT NULL,
    dc_status INT REFERENCES dc_status (id),
    tags VARCHAR(256),
    document JSONB NULL,
    manager_id INTEGER NOT NULL,
    nbexps integer NOT NULL DEFAULT 0,
    poste character varying(128) NULL,
    creation_date timestamp without time zone NOT NULL,
    modification_date timestamp without time zone NOT NULL
);

/****** CONGES *****************************/
  CREATE TABLE conges(
    id serial PRIMARY KEY,   
    date_fin timestamp without time zone NOT NULL,
    type_conges INTEGER NOT NULL,
	nbjours double precision NOT NULL,
    descriptions VARCHAR(256),
     date_debut timestamp without time zone NOT NULL
);

  CREATE TABLE compteur(
    id serial PRIMARY KEY,
    CPAnneeEncours double precision NOT NULL,
    CPAnneePrecedent double precision NOT NULL,
    CPPris double precision NOT NULL,
	CPRestant double precision NOT NULL,
    RTTTotal double precision NOT NULL,
    RTTPris double precision NOT NULL,
	RTTRestant double precision NOT NULL,
    RTTETotal double precision NOT NULL,
    RTTEPris double precision NOT NULL,
	RTTERestant double precision NOT NULL,
    DateDernierModification timestamp without time zone NOT NULL Default CURRENT_TIMESTAMP
);
1	18.72	38	0	0	5	0	0	5	0	0	"2024-03-12 11:08:07.499088"
CREATE TABLE type_conges(
    id INT PRIMARY KEY,
    label VARCHAR(4) NOT NULL
);

INSERT INTO public.type_conges(id, label)	VALUES (1, 'CP'),(2, 'RTT'), (3, 'RTTE'), (4, 'AM'), (5, 'JF');

/****** EXPENSES *****************************/
  CREATE TABLE expense(
    id serial PRIMARY KEY,
    expense_type_id INTEGER NOT NULL,
    shop_id INTEGER NOT NULL,
    person_id INTEGER NOT NULL,
    bank_id INTEGER NOT NULL,
	payment_id INTEGER NOT NULL,
    Amount double precision NOT NULL,
    details VARCHAR(256) NULL,
    DatePurchase timestamp without time zone NOT NULL Default CURRENT_TIMESTAMP
);
CREATE TABLE shop(
    id serial PRIMARY KEY,
    label VARCHAR(128) NOT NULL
);

CREATE TABLE person(
    id serial PRIMARY KEY,
    firstname VARCHAR(32) NOT NULL,
    familyname VARCHAR(32) NOT NULL
);

CREATE TABLE expense_types(
    id serial PRIMARY KEY,
    label VARCHAR(32) NOT NULL
);

CREATE TABLE payment_types(
    id serial PRIMARY KEY,
    label VARCHAR(32) NOT NULL    
);
CREATE TABLE banks(
    id serial PRIMARY KEY,
    bankname VARCHAR(32) NOT NULL
);

  CREATE TABLE income(
    id serial PRIMARY KEY,
    provider_id INTEGER NOT NULL,
    person_id INTEGER NOT NULL,
    credited_bank_id INTEGER NOT NULL,
    income_type_Id INTEGER NOT NULL,
    amount double precision NOT NULL,
    details VARCHAR(256) NULL,
    daterecieved timestamp without time zone NOT NULL Default CURRENT_TIMESTAMP
);

CREATE TABLE income_types(
    id serial PRIMARY KEY,
    label VARCHAR(128) NOT NULL    
);
CREATE TABLE provider_types(
    id serial PRIMARY KEY,
    label VARCHAR(128) NOT NULL    
);

  CREATE TABLE task(
    id serial PRIMARY KEY,
    task_details VARCHAR(256) NULL,
    person_id INTEGER NOT NULL,
    ActionDate timestamp without time zone NOT NULL Default CURRENT_TIMESTAMP
);


  CREATE TABLE sgb_bonds(
    id serial PRIMARY KEY,    
    person_id INTEGER NOT NULL,
    bank_id INTEGER NOT NULL,
    nominee_id INTEGER NOT NULL,
    guardian_id INTEGER NOT NULL,
    investor_id BIGINT NOT NULL,
    bond_Ids VARCHAR(256) NULL,    
    interest_percentage double precision NOT NULL,
    units INTEGER NOT NULL,
    unit_price double precision NOT NULL, 
    purchased_unit_price double precision NOT NULL, 
    bond_details VARCHAR(256) NULL,
    amount double precision NOT NULL,  
    purchase_date timestamp without time zone NOT NULL Default CURRENT_TIMESTAMP,
    starting_date timestamp without time zone NOT NULL Default CURRENT_TIMESTAMP,
    end_date timestamp without time zone NOT NULL Default CURRENT_TIMESTAMP  
);

  CREATE TABLE bourse(
    id serial PRIMARY KEY,    
    person_id INTEGER NOT NULL,
    annee INTEGER NOT NULL,
    echelon INTEGER NOT NULL,
    bourse_amount double precision NULL,
    bourse_merit double precision NULL,  
    dossier_date timestamp without time zone NULL,
    is_validated BOOLEAN NOT NULL,
    impot double precision NULL 
);


  CREATE TABLE pret(
    id serial PRIMARY KEY,    
    person_id INTEGER NOT NULL,
    bank_id INTEGER NOT NULL,
    pret_amount double precision NULL,
    mensuel_amount double precision NULL,
    nb_mois INTEGER NOT NULL,
    interest INTEGER NOT NULL,
    pret_details VARCHAR(256) NULL,
    starting_date timestamp without time zone NOT NULL Default CURRENT_TIMESTAMP,
    end_date timestamp without time zone NOT NULL Default CURRENT_TIMESTAMP  
);

