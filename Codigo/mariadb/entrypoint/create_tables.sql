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
  CONSTRAINT `cliente_pf_id_cliente_FK` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE
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
  `cnpj` varchar(14) NOT NULL,
  `razao_social` varchar(255) NOT NULL,
  `nome_fantasia` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `cliente_pj_cnpj_UN` (`cnpj`),
  CONSTRAINT `cliente_pj_id_cliente_FK` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE
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
  `data` date NOT NULL DEFAULT current_timestamp(),
  `unidades_macho` smallint(5) unsigned NOT NULL,
  `unidades_femea` smallint(5) unsigned NOT NULL,
  `preco_arroba` decimal(15,2) NOT NULL,
  `preco_frete` decimal(15,2) NOT NULL,
  `preco_sangria` decimal(15,2) NOT NULL,
  `desconto` decimal(15,2) DEFAULT NULL,
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
-- Table structure for table `compra_carcaca`
--

DROP TABLE IF EXISTS `compra_carcaca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compra_carcaca` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_compra` bigint(20) NOT NULL,
  `sequencial` tinyint(2) NOT NULL,
  `peso_total` decimal(5,2) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `compra_carcaca_id_compra_FK` (`id_compra`),
  CONSTRAINT `compra_carcaca_id_compra_FK` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`id`)
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
-- Temporary table structure for view `compra_totais`
--

DROP TABLE IF EXISTS `compra_totais`;
/*!50001 DROP VIEW IF EXISTS `compra_totais`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `compra_totais` AS SELECT
 1 AS `id`,
  1 AS `id_fornecedor`,
  1 AS `data`,
  1 AS `unidades_macho`,
  1 AS `unidades_femea`,
  1 AS `preco_arroba`,
  1 AS `preco_frete`,
  1 AS `preco_sangria`,
  1 AS `desconto`,
  1 AS `id_documento_romaneio`,
  1 AS `id_documento_gta`,
  1 AS `id_documento_nf_compra`,
  1 AS `id_documento_nf_abate`,
  1 AS `id_documento_nfs_matadouro`,
  1 AS `id_documento_nf_retorno`,
  1 AS `criado_em`,
  1 AS `valor_total`,
  1 AS `custo_total` */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `despesa`
--

DROP TABLE IF EXISTS `despesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `despesa` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `valor` decimal(15,2) NOT NULL,
  `data` date NOT NULL DEFAULT current_timestamp(),
  `id_categoria` bigint(20) DEFAULT NULL,
  `id_documento_comprovante` bigint(20) DEFAULT NULL,
  `criado_em` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `despesa_id_documento_comprovante_FK` (`id_documento_comprovante`),
  KEY `despesa_categoria_id_categoria_FK` (`id_categoria`),
  CONSTRAINT `despesa_categoria_id_categoria_FK` FOREIGN KEY (`id_categoria`) REFERENCES `despesa_categoria` (`id`) ON DELETE SET NULL,
  CONSTRAINT `despesa_id_documento_comprovante_FK` FOREIGN KEY (`id_documento_comprovante`) REFERENCES `documento` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `despesa_categoria`
--

DROP TABLE IF EXISTS `despesa_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `despesa_categoria` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `cor` varchar(7) DEFAULT NULL,
  `criado_em` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
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
-- Table structure for table `estoque`
--

DROP TABLE IF EXISTS `estoque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estoque` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_compra_carcaca` bigint(20) NOT NULL,
  `tipo` enum('CUPIM','FIGADO','DIANTEIRO_SEM_COSTELA','SERROTE_SEM_RABADA','SERROTE_COM_RABADA','COSTELA','FATO') NOT NULL,
  `id_pedido_item` bigint(20) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `estoque_id_compra_carcaca_FK` (`id_compra_carcaca`),
  KEY `pedido_item_id_FK` (`id_pedido_item`),
  CONSTRAINT `estoque_id_compra_carcaca_FK` FOREIGN KEY (`id_compra_carcaca`) REFERENCES `compra_carcaca` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pedido_item_id_FK` FOREIGN KEY (`id_pedido_item`) REFERENCES `pedido_item` (`id`) ON DELETE SET NULL
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
  CONSTRAINT `fornecedor_pf_id_FK` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedor` (`id`) ON DELETE CASCADE
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
  `cnpj` varchar(14) NOT NULL,
  `razao_social` varchar(255) NOT NULL,
  `nome_fantasia` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_fornecedor`),
  UNIQUE KEY `fornecedor_pj_UN` (`cnpj`),
  CONSTRAINT `fornecedor_pj_id_FK` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedor` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedido` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_cliente` bigint(20) DEFAULT NULL,
  `id_compra` bigint(20) DEFAULT NULL,
  `data` date NOT NULL DEFAULT current_timestamp(),
  `criado_em` varchar(100) NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `cliente_id_FK` (`id_cliente`),
  KEY `compra_id_FK` (`id_compra`),
  CONSTRAINT `cliente_id_FK` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE SET NULL,
  CONSTRAINT `compra_id_FK` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pedido_item`
--

DROP TABLE IF EXISTS `pedido_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedido_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_pedido` bigint(20) NOT NULL,
  `conjunto` enum('FIGADO','FATO','DIANTEIRO_SEM_COSTELA','SERROTE_SEM_RABADA','SERROTE_COM_RABADA','COSTELA','CUPIM','CARCACA','BANDA_CARREGADA','BANDA_DESCARREGADA','DIANTEIRO_COM_COSTELA') NOT NULL,
  `letra` varchar(2) DEFAULT NULL,
  `quantidade` int(11) NOT NULL,
  `peso` decimal(7,2) DEFAULT NULL,
  `preco` decimal(15,2) NOT NULL,
  `valor_total` decimal(15,2) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `pedido_id_FK` (`id_pedido`),
  CONSTRAINT `pedido_id_FK` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `relatorio_lucro_por_compra`
--

DROP TABLE IF EXISTS `relatorio_lucro_por_compra`;
/*!50001 DROP VIEW IF EXISTS `relatorio_lucro_por_compra`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `relatorio_lucro_por_compra` AS SELECT
 1 AS `id`,
  1 AS `id_fornecedor`,
  1 AS `valor_total`,
  1 AS `custo_total`,
  1 AS `receita_total`,
  1 AS `lucro`,
  1 AS `data` */;
SET character_set_client = @saved_cs_client;

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

--
-- Final view structure for view `compra_totais`
--

/*!50001 DROP VIEW IF EXISTS `compra_totais`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `compra_totais` AS select `compra`.`id` AS `id`,`compra`.`id_fornecedor` AS `id_fornecedor`,`compra`.`data` AS `data`,`compra`.`unidades_macho` AS `unidades_macho`,`compra`.`unidades_femea` AS `unidades_femea`,`compra`.`preco_arroba` AS `preco_arroba`,`compra`.`preco_frete` AS `preco_frete`,`compra`.`preco_sangria` AS `preco_sangria`,`compra`.`desconto` AS `desconto`,`compra`.`id_documento_romaneio` AS `id_documento_romaneio`,`compra`.`id_documento_gta` AS `id_documento_gta`,`compra`.`id_documento_nf_compra` AS `id_documento_nf_compra`,`compra`.`id_documento_nf_abate` AS `id_documento_nf_abate`,`compra`.`id_documento_nfs_matadouro` AS `id_documento_nfs_matadouro`,`compra`.`id_documento_nf_retorno` AS `id_documento_nf_retorno`,`compra`.`criado_em` AS `criado_em`,ifnull(sum(`compra_pesagem`.`peso`),0) / 30 * `compra`.`preco_arroba` - `compra`.`desconto` AS `valor_total`,`compra`.`preco_frete` + `compra`.`preco_sangria` AS `custo_total` from (`compra` left join `compra_pesagem` on(`compra_pesagem`.`id_compra` = `compra`.`id`)) group by `compra`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `relatorio_lucro_por_compra`
--

/*!50001 DROP VIEW IF EXISTS `relatorio_lucro_por_compra`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `relatorio_lucro_por_compra` AS select `compra_totais`.`id` AS `id`,`compra_totais`.`id_fornecedor` AS `id_fornecedor`,`compra_totais`.`valor_total` AS `valor_total`,`compra_totais`.`custo_total` AS `custo_total`,ifnull(sum(`pedido_item`.`valor_total`),0) AS `receita_total`,ifnull(sum(`pedido_item`.`valor_total`),0) - `compra_totais`.`valor_total` - `compra_totais`.`custo_total` AS `lucro`,`compra_totais`.`data` AS `data` from (((`compra_totais` left join `compra_pesagem` on(`compra_pesagem`.`id_compra` = `compra_totais`.`id`)) left join `pedido` on(`pedido`.`id_compra` = `compra_totais`.`id`)) left join `pedido_item` on(`pedido_item`.`id_pedido` = `pedido`.`id`)) group by `compra_totais`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-05 11:15:12
