# Creating the `homeflix` database
    
    CREATE DATABASE homeflix;
    USE homeflix;

# Creating table `movies`

    CREATE TABLE movies(
        id INT PRIMARY KEY AUTO_INCREMENT,
        title  VARCHAR(255) NOT NULL,
        created TIMESTAMP NOT NULL DEFAULT NOW()
    );

# insert into movies 

    INSERT INTO movies(title)
    values
   ('Enola Holmes 2.mp4')
    ('Puss in Boots The Last Wish (2022) (NetNaija.com).mkv');
