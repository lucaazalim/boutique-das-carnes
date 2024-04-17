-- MariaDB dump 10.19-11.3.2-MariaDB, for osx10.19 (arm64)
--
-- Host: localhost    Database: boutique_das_carnes
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB-1:11.3.2+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tipo` enum('PJ','PF') NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(10) DEFAULT NULL,
  `celular` varchar(11) DEFAULT NULL,
  `cep` varchar(10) NOT NULL,
  `logradouro` varchar(150) NOT NULL,
  `bairro` varchar(50) DEFAULT NULL,
  `numero` varchar(5) DEFAULT NULL,
  `complemento` varchar(10) DEFAULT NULL,
  `estado` enum('AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO') NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  `notas` text DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cliente_pf`
--

DROP TABLE IF EXISTS `cliente_pf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente_pf` (
  `id_cliente` bigint(20) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `cliente_pf_cpf_UN` (`cpf`),
  CONSTRAINT `fornecedor_pf_id_FK_copy` FOREIGN KEY (`id_cliente`) REFERENCES `fornecedor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cliente_pj`
--

DROP TABLE IF EXISTS `cliente_pj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente_pj` (
  `id_cliente` bigint(20) NOT NULL,
  `cnpj` varchar(12) NOT NULL,
  `razao_social` varchar(255) NOT NULL,
  `nome_fantasia` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `cliente_pj_cnpj_UN` (`cnpj`),
  CONSTRAINT `fornecedor_pj_id_FK_copy` FOREIGN KEY (`id_cliente`) REFERENCES `fornecedor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compra` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_fornecedor` bigint(20) NOT NULL,
  `status` enum('PENDENTE','CONCLUIDA','CANCELADA') NOT NULL,
  `unidades_macho` smallint(5) unsigned NOT NULL,
  `unidades_femea` smallint(5) unsigned NOT NULL,
  `preco_arroba` decimal(15,2) NOT NULL,
  `desconto` decimal(15,2) DEFAULT NULL,
  `animais_abatidos` smallint(5) unsigned DEFAULT NULL,
  `peso_total_abate` decimal(7,2) DEFAULT NULL,
  `id_documento_romaneio` bigint(20) DEFAULT NULL,
  `id_documento_gta` bigint(20) DEFAULT NULL,
  `id_documento_nf_compra` bigint(20) DEFAULT NULL,
  `id_documento_nf_abate` bigint(20) DEFAULT NULL,
  `id_documento_nfs_matadouro` bigint(20) DEFAULT NULL,
  `id_documento_nf_retorno` bigint(20) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `compra_id_fornecedor_FK` (`id_fornecedor`),
  KEY `compra_id_documento_romaneio_FK` (`id_documento_romaneio`),
  KEY `compra_id_documento_gta_FK` (`id_documento_gta`),
  KEY `compra_id_documento_nf_compra_FK` (`id_documento_nf_compra`),
  KEY `compra_id_documento_nf_abate_FK` (`id_documento_nf_abate`),
  KEY `compra_id_documento_nfs_matadouro_FK` (`id_documento_nfs_matadouro`),
  KEY `compra_id_documento_nf_retorno_FK` (`id_documento_nf_retorno`),
  CONSTRAINT `compra_id_documento_gta_FK` FOREIGN KEY (`id_documento_gta`) REFERENCES `documento` (`id`) ON DELETE SET NULL,
  CONSTRAINT `compra_id_documento_nf_abate_FK` FOREIGN KEY (`id_documento_nf_abate`) REFERENCES `documento` (`id`) ON DELETE SET NULL,
  CONSTRAINT `compra_id_documento_nf_compra_FK` FOREIGN KEY (`id_documento_nf_compra`) REFERENCES `documento` (`id`) ON DELETE SET NULL,
  CONSTRAINT `compra_id_documento_nf_retorno_FK` FOREIGN KEY (`id_documento_nf_retorno`) REFERENCES `documento` (`id`) ON DELETE SET NULL,
  CONSTRAINT `compra_id_documento_nfs_matadouro_FK` FOREIGN KEY (`id_documento_nfs_matadouro`) REFERENCES `documento` (`id`) ON DELETE SET NULL,
  CONSTRAINT `compra_id_documento_romaneio_FK` FOREIGN KEY (`id_documento_romaneio`) REFERENCES `documento` (`id`) ON DELETE SET NULL,
  CONSTRAINT `compra_id_fornecedor_FK` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `compra_pagamento`
--

DROP TABLE IF EXISTS `compra_pagamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compra_pagamento` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_compra` bigint(20) NOT NULL,
  `data` date NOT NULL,
  `meio_pagamento` enum('PIX') NOT NULL,
  `valor` decimal(15,2) NOT NULL,
  `id_documento_comprovante` bigint(20) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `compra_pagamento_id_documento_comprovante_FK` (`id_documento_comprovante`),
  KEY `compra_pagamento_id_compra_FK` (`id_compra`),
  CONSTRAINT `compra_pagamento_id_compra_FK` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`id`),
  CONSTRAINT `compra_pagamento_id_documento_comprovante_FK` FOREIGN KEY (`id_documento_comprovante`) REFERENCES `documento` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `compra_pesagem`
--

DROP TABLE IF EXISTS `compra_pesagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compra_pesagem` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_compra` bigint(20) NOT NULL,
  `unidades` smallint(5) unsigned NOT NULL,
  `peso` decimal(7,2) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `compra_pesagem_id_compra_FK` (`id_compra`),
  CONSTRAINT `compra_pesagem_id_compra_FK` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `documento`
--

DROP TABLE IF EXISTS `documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documento` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `numero_referencia` varchar(100) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `nome_arquivo` varchar(100) DEFAULT NULL,
  `criado_em` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fornecedor`
--

DROP TABLE IF EXISTS `fornecedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fornecedor` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tipo` enum('PJ','PF') NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(10) DEFAULT NULL,
  `celular` varchar(11) DEFAULT NULL,
  `cep` varchar(10) NOT NULL,
  `logradouro` varchar(150) NOT NULL,
  `bairro` varchar(50) DEFAULT NULL,
  `numero` varchar(5) DEFAULT NULL,
  `complemento` varchar(10) DEFAULT NULL,
  `estado` enum('AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO') NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  `notas` text DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fornecedor_contato`
--

DROP TABLE IF EXISTS `fornecedor_contato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fornecedor_contato` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_fornecedor` bigint(20) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `celular` varchar(11) DEFAULT NULL,
  `cargo` varchar(100) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fornecedor_contato_id_fornecedor_FK` (`id_fornecedor`),
  CONSTRAINT `fornecedor_contato_id_fornecedor_FK` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fornecedor_pf`
--

DROP TABLE IF EXISTS `fornecedor_pf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fornecedor_pf` (
  `id_fornecedor` bigint(20) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`id_fornecedor`),
  UNIQUE KEY `fornecedor_pf_UN` (`cpf`),
  CONSTRAINT `fornecedor_pf_id_FK` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fornecedor_pj`
--

DROP TABLE IF EXISTS `fornecedor_pj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fornecedor_pj` (
  `id_fornecedor` bigint(20) NOT NULL,
  `cnpj` varchar(12) NOT NULL,
  `razao_social` varchar(255) NOT NULL,
  `nome_fantasia` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_fornecedor`),
  UNIQUE KEY `fornecedor_pj_UN` (`cnpj`),
  CONSTRAINT `fornecedor_pj_id_FK` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cargo` enum('ADMINISTRADOR','GERENTE') NOT NULL,
  `senha` text NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_UN` (`usuario`),
  UNIQUE KEY `email_UN` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'boutique_das_carnes'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-17 12:50:54
