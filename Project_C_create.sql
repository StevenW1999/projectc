-- Table: Project C.Admin

-- DROP TABLE "Project C"."Admin";

CREATE TABLE "Project C"."Admin"
(
    "id" integer NOT NULL,
    "Username" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "Password" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE "Project C"."Admin"
    OWNER to postgres;



-- Table: Project C.Category

-- DROP TABLE "Project C"."Category";

CREATE TABLE "Project C"."Category"
(
    "Name" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "id" integer NOT NULL,
    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE "Project C"."Category"
    OWNER to postgres;


-- Table: Project C.User

-- DROP TABLE "Project C"."User";

CREATE TABLE "Project C"."User"
(
    "id" integer NOT NULL,
    "Username" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "Password" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying COLLATE pg_catalog."default",
    "Postal_code" character varying COLLATE pg_catalog."default",
    "Profile_picture" bytea,
    "Active" boolean NOT NULL,
    CONSTRAINT "id_pkey" PRIMARY KEY ("id")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE "Project C"."User"
    OWNER to postgres;


-- Table: Project C.Plant

-- DROP TABLE "Project C"."Plant";

CREATE TABLE "Project C"."Plant"
(
    "id" integer NOT NULL,
    "User_id" integer,
    "Category_id" integer,
    "Image" bytea,
    "Name" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "Description" character varying(255) COLLATE pg_catalog."default",
    "Available" boolean NOT NULL,
    CONSTRAINT "id_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Category_id_fkey" FOREIGN KEY ("Category_id")
        REFERENCES "Project C"."Category" ("Category_id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "User_id_fkey" FOREIGN KEY ("User_id")
        REFERENCES "Project C"."User" ("User_id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE "Project C"."Plant"
    OWNER to postgres;


-- Table: Project C.Category_Plant

-- DROP TABLE "Project C"."Category_Plant";


CREATE TABLE "Project C"."Category_Plant"
(
    "id" integer NOT NULL,
    "Plant_id" integer NOT NULL,
    "Category_id" integer NOT NULL,
    CONSTRAINT "id_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Category_id_fkey" FOREIGN KEY ("Category_id")
        REFERENCES "Project C"."Category" ("Category_id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "Plant_id_fkey" FOREIGN KEY ("Plant_id")
        REFERENCES "Project C"."Plant" ("Plant_id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE "Project C"."Category_Plant"
    OWNER to postgres;

