
CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,   
  `creation_date` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),    
  `pseudo` varchar(30) DEFAULT NULL,                          
  `email` varchar(60) NOT NULL UNIQUE,                                   
  `password` varchar(100) NOT NULL,                                  
  `accesNivel` int DEFAULT NULL                              
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;   


CREATE TABLE `publications` (                                     
  `id` int AUTO_INCREMENT,                                           
  `user_id` int NOT NULL,                                                             
  `creation_date` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP), 
  `description` text NOT NULL,                                                               
  `image_url` text DEFAULT NULL,                                         
  PRIMARY KEY (`id`,`user_id`),                                                                    
  CONSTRAINT `fk_publication_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;


CREATE TABLE `commentaires` ( 
  `id` int AUTO_INCREMENT,                                                          
  `user_id` int NOT NULL,                                                                             
  `publication_id` int NOT NULL,                                                      
  `creation_date` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),                         
  `commentaire` text NOT NULL,                                                
  PRIMARY KEY (`id`, `user_id`, `publication_id`),                                                                       
  CONSTRAINT `fk_commentaire_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,     
  CONSTRAINT `fk_commentaire_publication_id` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;