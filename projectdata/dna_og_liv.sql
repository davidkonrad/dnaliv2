CREATE TABLE locality (
_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE user (
_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE sample (
_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
sampledate DATE NOT NULL,
decimalLatitude DECIMAL(10, 8) NOT NULL,
decimalLongitude DECIMAL(11, 8) NOT NULL,
locality_id INT(11) NOT NULL,
user_id INT(11) NOT NULL,
FOREIGN KEY (locality_id) REFERENCES locality(_id),
FOREIGN KEY (user_id) REFERENCES user(_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE taxon (
_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE sample_taxon (
sample_id INT(11) NOT NULL,
taxon_id INT(11) NOT NULL,
present TINYINT(1) NOT NULL,
PRIMARY KEY (sample_id, taxon_id),
FOREIGN KEY (sample_id) REFERENCES sample(_id),
FOREIGN KEY (taxon_id) REFERENCES taxon(_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- example queries:

-- Find all species ever found in a sample from locality named "Furesø"

SELECT t.* FROM taxon t JOIN sample_taxon st ON st.taxon_id=t._id JOIN sample s ON st.sample_id=s._id JOIN locality l ON s.locality_id = l._id WHERE l.name ="Furesø" AND st.present=1;

-- Find all species searched for, but absent , in a sample from locality named "Furesø"

SELECT t.* FROM taxon t JOIN sample_taxon st ON st.taxon_id=t._id JOIN sample s ON st.sample_id=s._id JOIN locality l ON s.locality_id = l._id WHERE l.name ="Furesø" AND st.present=0;

-- Find all localities where "Esox lucius" was present

SELECT l.* FROM taxon t JOIN sample_taxon st ON st.taxon_id=t._id JOIN sample s ON st.sample_id=s._id JOIN locality l ON s.locality_id = l._id WHERE t.name ="Esox lucius" AND st.present=1;

-- Find all localities where "Esox lucius" was searched for, but not present

SELECT l.* FROM taxon t JOIN sample_taxon st ON st.taxon_id=t._id JOIN sample s ON st.sample_id=s._id JOIN locality l ON s.locality_id = l._id WHERE t.name ="Esox lucius" AND st.present=0;

-- Find all points where "Esox lucius" was  present in a sample

SELECT s.decimalLatitude, s.decimalLatitude FROM taxon t JOIN sample_taxon st ON st.taxon_id=t._id JOIN sample s ON st.sample_id=s._id WHERE t.name ="Esox lucius" AND st.present=1;

