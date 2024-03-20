# SAE401
## Sous docker
### Voici le docker-compose :
```yaml
version: '3.8'

services:
  database:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: 123456 # Mot de passe de l'utilisateur root
      MYSQL_DATABASE: symfony
    ports:
      - "3306:3306"

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    environment:
      PMA_HOST: database
    ports:
      - "8080:80"
    depends_on:
      - database

  symfony:
    image: php:8.2-fpm
    volumes:
      - .:/var/www/symfony
    working_dir: /var/www/symfony
    command: >
      bash -c "apt-get update && apt-get install -y git unzip libpng-dev libonig-dev libxml2-dev curl gnupg libicu-dev 
      && docker-php-ext-install pdo pdo_mysql
      && docker-php-ext-configure intl
      && docker-php-ext-install intl
      && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
      && curl -sS https://deb.nodesource.com/setup_14.x | bash -
      && apt-get install -y nodejs
      && tail -f /dev/null"

    ports:
      - "8000:8000"
    depends_on:
      - database

  maildev:
    image: maildev/maildev
    ports:
      - "1080:80"
      - "1025:25"

```
ou
```yaml
version: '3.8'

services:
  database:
    image: mysql:8.0 # Version mise à jour, vérifiez la compatibilité ARM64
    environment:
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_DATABASE: symfony
    ports:
      - "3306:3306"

  phpmyadmin:
    image: phpmyadmin/phpmyadmin:latest # Utilisation de la dernière version pour la compatibilité ARM64
    environment:
      PMA_HOST: database
    ports:
      - "8080:80"
    depends_on:
      - database

  symfony:
    image: arm64v8/php:8.2-cli # Image spécifique pour ARM64
    volumes:
      - .:/var/www/symfony
    working_dir: /var/www/symfony
    command: >
      bash -c "apt-get update && apt-get install -y git unzip libpng-dev libonig-dev libxml2-dev curl gnupg libicu-dev 
      && docker-php-ext-install pdo pdo_mysql
      && docker-php-ext-configure intl
      && docker-php-ext-install intl
      && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
      && curl -sS https://deb.nodesource.com/setup_14.x | bash -
      && apt-get install -y nodejs
      && tail -f /dev/null"
    ports:
      - "8000:8000"
    depends_on:
      - database

  maildev:
    image: maildev/maildev:latest # Utilisation de la dernière version pour la compatibilité ARM64
    ports:
      - "1080:80"
      - "1025:25"
```

Commande à éxécuter dans l'ordre

```bash
docker-compose up -d
```
```bash
docker-compose exec symfony bash
```
```bash
apt-get update
```
```bash
apt-get install -y curl gnupg
```
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
```
```bash
apt-get install -y nodejs
```
```bash
npm install -g npm@10.4.0
```
```bash
npm install
```
```bash
apt-get update && apt-get install -y libicu-dev
```
```bash
docker-php-ext-configure intl
```
```bash
docker-php-ext-install intl
```

Clone du projet Symfony/Vue
```bash
git clone https://github.com/aurelienfvre/SAE401.git ecolearn
```
```bash
composer install
```
```bash
npm install
```
Pour lancer le serveur du projet
```bash
php -S 0.0.0.0:8000 -t public
```
URL du projet
```bash
http://localhost:8000
```
