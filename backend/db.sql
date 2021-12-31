
CREATE TABLE `users` (                                                    /* Création de la table USERS */
  `id` int PRIMARY KEY AUTO_INCREMENT,                                    /* Clef primaire auto incrementé */
  `creation_date` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),         /* Date de création de l'utilisateur (automatique) */
  `pseudo` varchar(30) DEFAULT NULL,                                      /* Pseudo */
  `email` varchar(60) NOT NULL UNIQUE,                                    /* Email, unique */
  `password` varchar(100) NOT NULL,                                       /* Mot de passe */
  `accesNivel` int DEFAULT NULL                                           /* Niveau d'accès (user standard ou admin) */
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;   /* InnoDB pour clefs etrangeres et utf8 */


CREATE TABLE `publications` (                                             /* Création de la table PUBLICATIONS */                                 
  `id` int AUTO_INCREMENT,                                                /* id auto incrementé */
  `user_id` int NOT NULL,                                                 /* id de l'user créant la publication  */
  `creation_date` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),         /* Date de création de la publication (automatique) */
  `description` text NOT NULL,                                            /* Texte du post */               
  `image_url` text DEFAULT NULL,                                          /* URL de l'image du post */ 
  PRIMARY KEY (`id`,`user_id`),                                           /* Clefs primaires */                       
  CONSTRAINT `fk_publication_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE /* Recupération de l'id dans la table users */ 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;   /* InnoDB pour clefs etrangeres et utf8 */


CREATE TABLE `commentaires` (                                             /* Création de la table COMMENTAIRES */
  `id` int AUTO_INCREMENT,                                                /* id auto incrementé */
  `user_id` int NOT NULL,                                                 /* id de l'user créant le commentaire  */                             
  `publication_id` int NOT NULL,                                          /* id de la publication commenté */                                            
  `creation_date` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),         /* Date de création du commentaire (automatique) */             
  `commentaire` text NOT NULL,                                            /* Texte du commentaire */ 
  PRIMARY KEY (`id`, `user_id`, `publication_id`),                        /* Clefs primaires */                                           
  CONSTRAINT `fk_commentaire_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE, /* Recupération de l'id dans la table users */
  CONSTRAINT `fk_commentaire_publication_id` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`id`) ON DELETE CASCADE /* Recupération de l'id dans la table publications */
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;   /* InnoDB pour clefs etrangeres et utf8 */