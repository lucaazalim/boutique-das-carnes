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
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES
(1,'PJ','acougue1@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:33:18'),
(2,'PJ','acougue2@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:33:18'),
(3,'PJ','acougue3@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:33:18'),
(4,'PJ','acougue4@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:33:18'),
(5,'PJ','acougue5@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:33:18'),
(6,'PF','comerciante1@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:33:18'),
(7,'PF','comerciante2@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:33:18'),
(8,'PF','comerciante3@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:33:18'),
(9,'PF','comerciante4@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:33:18'),
(10,'PF','comerciante5@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:33:18');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `cliente_pf`
--

LOCK TABLES `cliente_pf` WRITE;
/*!40000 ALTER TABLE `cliente_pf` DISABLE KEYS */;
INSERT INTO `cliente_pf` VALUES
(6,'10885213637','Comerciante 1'),
(7,'10885213638','Comerciante 2'),
(8,'10885213639','Comerciante 3'),
(9,'10885213640','Comerciante 4'),
(10,'10885213641','Comerciante 5');
/*!40000 ALTER TABLE `cliente_pf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `cliente_pj`
--

LOCK TABLES `cliente_pj` WRITE;
/*!40000 ALTER TABLE `cliente_pj` DISABLE KEYS */;
INSERT INTO `cliente_pj` VALUES
(1,'29455720000123','Açougue 1 LTDA','Açougue 1'),
(2,'29455720000124','Açougue 2 LTDA','Açougue 2'),
(3,'29455720000125','Açougue 3 LTDA','Açougue 3'),
(4,'29455720000126','Açougue 4 LTDA','Açougue 4'),
(5,'29455720000127','Açougue 5 LTDA','Açougue 5');
/*!40000 ALTER TABLE `cliente_pj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES
(1,1,'2024-05-30',5,1,250.00,100.00,400.00,20.00,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-30 21:44:50'),
(2,1,'2024-05-30',1,3,222.00,200.00,234.00,30.00,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-30 21:44:50'),
(3,1,'2024-05-30',10,6,350.00,150.00,234.00,100.00,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-30 21:44:50'),
(4,2,'2024-05-30',15,15,150.00,222.00,352.00,123.00,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-30 21:44:50'),
(5,2,'2024-05-30',2,25,270.00,324.00,194.00,1000.00,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-30 21:44:50'),
(6,2,'2024-05-30',20,45,310.00,345.00,123.00,214.00,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-30 21:44:50'),
(7,3,'2024-05-30',6,5,450.00,346.00,343.00,234.00,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-30 21:44:50'),
(8,3,'2024-05-30',15,9,100.00,123.00,231.00,454.00,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-30 21:44:50'),
(9,3,'2024-05-30',10,10,250.00,352.00,453.00,325.00,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-30 21:44:50'),
(10,4,'2024-05-30',3,13,234.00,200.00,324.00,10.00,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-30 21:44:50'),
(11,4,'2024-05-30',9,11,267.00,123.00,234.00,124.00,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-30 21:44:50'),
(12,4,'2024-05-30',25,12,376.00,10.00,546.00,365.00,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-30 21:44:50');
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `compra_carcaca`
--

LOCK TABLES `compra_carcaca` WRITE;
/*!40000 ALTER TABLE `compra_carcaca` DISABLE KEYS */;
/*!40000 ALTER TABLE `compra_carcaca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `compra_pagamento`
--

LOCK TABLES `compra_pagamento` WRITE;
/*!40000 ALTER TABLE `compra_pagamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `compra_pagamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `compra_pesagem`
--

LOCK TABLES `compra_pesagem` WRITE;
/*!40000 ALTER TABLE `compra_pesagem` DISABLE KEYS */;
INSERT INTO `compra_pesagem` VALUES
(1,1,10,10000.00,'2024-05-30 21:52:10');
/*!40000 ALTER TABLE `compra_pesagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `despesa`
--

LOCK TABLES `despesa` WRITE;
/*!40000 ALTER TABLE `despesa` DISABLE KEYS */;
/*!40000 ALTER TABLE `despesa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `despesa_categoria`
--

LOCK TABLES `despesa_categoria` WRITE;
/*!40000 ALTER TABLE `despesa_categoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `despesa_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `documento`
--

LOCK TABLES `documento` WRITE;
/*!40000 ALTER TABLE `documento` DISABLE KEYS */;
/*!40000 ALTER TABLE `documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `estoque`
--

LOCK TABLES `estoque` WRITE;
/*!40000 ALTER TABLE `estoque` DISABLE KEYS */;
/*!40000 ALTER TABLE `estoque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `fornecedor`
--

LOCK TABLES `fornecedor` WRITE;
/*!40000 ALTER TABLE `fornecedor` DISABLE KEYS */;
INSERT INTO `fornecedor` VALUES
(1,'PJ','fazenda1@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:24:23'),
(2,'PJ','fazenda2@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:24:23'),
(3,'PJ','fazenda3@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:24:23'),
(4,'PJ','fazenda4@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:24:23'),
(5,'PJ','fazenda5@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:24:23'),
(6,'PF','fazendeiro1@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:29:04'),
(7,'PF','fazendeiro2@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:29:04'),
(8,'PF','fazendeiro3@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:29:04'),
(9,'PF','fazendeiro4@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:29:04'),
(10,'PF','fazendeiro5@test.com','3130470706','31997688572','30130155','Rua Pernambuco','Savassi','873','Apto. 701','MG','Belo Horizonte',1,NULL,'2024-05-30 21:29:04');
/*!40000 ALTER TABLE `fornecedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `fornecedor_contato`
--

LOCK TABLES `fornecedor_contato` WRITE;
/*!40000 ALTER TABLE `fornecedor_contato` DISABLE KEYS */;
/*!40000 ALTER TABLE `fornecedor_contato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `fornecedor_pf`
--

LOCK TABLES `fornecedor_pf` WRITE;
/*!40000 ALTER TABLE `fornecedor_pf` DISABLE KEYS */;
INSERT INTO `fornecedor_pf` VALUES
(6,'10885213637','Fazendeiro 1'),
(7,'10885213638','Fazendeiro 2'),
(8,'10885213639','Fazendeiro 3'),
(9,'10885213640','Fazendeiro 4'),
(10,'10885213641','Fazendeiro 5');
/*!40000 ALTER TABLE `fornecedor_pf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `fornecedor_pj`
--

LOCK TABLES `fornecedor_pj` WRITE;
/*!40000 ALTER TABLE `fornecedor_pj` DISABLE KEYS */;
INSERT INTO `fornecedor_pj` VALUES
(1,'29455720000123','Fazenda 1 LTDA','Fazenda 1'),
(2,'29455720000124','Fazenda 2 LTDA','Fazenda 2'),
(3,'29455720000125','Fazenda 3 LTDA','Fazenda 3'),
(4,'29455720000126','Fazenda 4 LTDA','Fazenda 4'),
(5,'29455720000127','Fazenda 5 LTDA','Fazenda 5');
/*!40000 ALTER TABLE `fornecedor_pj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pedido_item`
--

LOCK TABLES `pedido_item` WRITE;
/*!40000 ALTER TABLE `pedido_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES
(1,'admin','Administrador','admin@test.com','ADMINISTRADOR','password','2024-05-30 21:20:40'),
(2,'gerente','Gerente','gerente@test.com','GERENTE','password','2024-05-30 21:21:00');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'boutique_das_carnes'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-30 19:11:58
