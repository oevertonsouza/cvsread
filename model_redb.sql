CREATE TABLE TIPOS (
    ID int NOT NULL AUTO_INCREMENT,
    DESCRICAO varchar(50) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE ESTADOS (
    ID int NOT NULL AUTO_INCREMENT,
    DESCRICAO varchar(2) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE CIDADES (
    ID int NOT NULL AUTO_INCREMENT,
    DESCRICAO varchar(200) NOT NULL,
    ESTADO_ID int NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (ESTADO_ID) REFERENCES ESTADOS (ID)
);

CREATE TABLE DISTRITOS (
    ID int NOT NULL AUTO_INCREMENT,
    DESCRICAO varchar(200) NOT NULL,
    CIDADE_ID int NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (CIDADE_ID) REFERENCES CIDADES (ID)
);

CREATE TABLE BAIRROS (
    ID int NOT NULL AUTO_INCREMENT,
    DESCRICAO varchar(200) NOT NULL,
    DISTRITO_ID int NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (DISTRITO_ID) REFERENCES DISTRITOS (ID)
);

CREATE TABLE ENDERECOS (
    ID int NOT NULL AUTO_INCREMENT,
    ENDERECO varchar(250) NOT NULL,
    NUMERO varchar(50),
    COMPLEMENTO varchar(200) NULL,
    CEP varchar(15) NOT NULL,
    BAIRRO_ID int NOT NULL,
  	DISTRITO_ID int NOT NULL,
  	CIDADE_ID int NOT NULL,
  	ESTADO_ID int NOT NULL,
    LATITUDE DECIMAL(11, 8) NULL,
    LONGITUDE DECIMAL(11, 8) NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (CIDADE_ID) REFERENCES CIDADES (ID),
    FOREIGN KEY (ESTADO_ID) REFERENCES ESTADOS (ID),
    FOREIGN KEY (DISTRITO_ID) REFERENCES DISTRITOS (ID),
    FOREIGN KEY (BAIRRO_ID) REFERENCES BAIRROS (ID)
);

CREATE TABLE DIRETORIAS (
    ID int NOT NULL AUTO_INCREMENT,
    NOME varchar(200) NULL,
    DESCRICAO varchar(200) NOT NULL,
    ENDERECO_ID int NULL,
    EMAIL varchar(200) NULL,
    TELEFONE1 varchar(12) NULL,
    TELEFONE2 varchar(12) NULL,
    FOREIGN KEY (ENDERECO_ID) REFERENCES ENDERECOS (ID),
    PRIMARY KEY (ID)
);

CREATE TABLE DEPADMS (
    ID int NOT NULL AUTO_INCREMENT,
    DESCRICAO varchar(200) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE ESCOLAS (
    ID int NOT NULL AUTO_INCREMENT,
    NOME varchar(255) NOT NULL,
    EMAIL varchar(200) NULL,
    DDD varchar(3) NULL,
    TELEFONE1 varchar(12) NULL,
    TELEFONE2 varchar(12) NULL,
    TIPO_ID int NOT NULL,
    DIRETORIA_ID int NOT NULL,
    DEPADM_ID int NOT NULL,
	  ENDERECO_ID int NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (TIPO_ID) REFERENCES TIPOS (ID),
    FOREIGN KEY (DIRETORIA_ID) REFERENCES DIRETORIAS (ID),
    FOREIGN KEY (DEPADM_ID) REFERENCES DEPADMS (ID),
    FOREIGN KEY (ENDERECO_ID) REFERENCES ENDERECOS (ID)
);

CREATE TABLE USUARIOS (
    ID int(11) NOT NULL AUTO_INCREMENT,
    USERNAME varchar(100) NOT NULL,
    EMAIL varchar(100)  NOT NULL,
    PASSWORD varchar(32) NOT NULL,
    DT_CRIACAO datetime NOT NULL,
    DT_MODIFICADO datetime NOT NULL,
    PREMIUM BOOLEAN DEFAULT NULL,
    ATIVO BOOLEAN DEFAULT false,
    PRIMARY KEY (ID)
);

CREATE TABLE ACESSO (
    USUARIO_ID int(11) NOT NULL,
    DISPODITIVO varchar(200) NULL,
    ID_DISPOSITIVO varchar(100) NULL,
    UUID VARCHAR(36) NOT NULL,
    ULTIMOACESSO datetime NOT NULL,
    FOREIGN KEY (USUARIO_ID) REFERENCES USUARIOS (ID)
);

/*
  SELECT table_schema                                        "DB Name",
    Round(Sum(data_length + index_length) / 1024 / 1024, 1) "DB Size in MB"
  FROM   information_schema.tables
  GROUP  BY table_schema;
*/
