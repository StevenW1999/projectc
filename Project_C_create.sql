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
    CONSTRAINT "user_id_pkey" PRIMARY KEY ("id")
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
    "Image" bytea,
    "Name" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "Description" character varying(255) COLLATE pg_catalog."default",
    "Available" boolean NOT NULL,
    CONSTRAINT "Plant_id_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "User_id_fkey" FOREIGN KEY ("User_id")
        REFERENCES "Project C"."User" ("id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    "Timestamp" timestamp default current_timestamp,
    "PlantSize" varchar(10) default 'Unknown',
    "Shadow" varchar(10) default 'Unknown',
    "InsideOrOutside" varchar(10) default 'Unknown',
    "Type" varchar(10) default 'Unknown',
    "YoungOrOld" varchar(10) default 'Unknown',
    "Season" varchar(10) default 'Unknown',
    "Edible" boolean,
    "AmountOfWater" varchar(10) default 'Unknown',
    "Color" varchar(10) default 'Unknown'
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE "Project C"."Plant"
    OWNER to postgres;