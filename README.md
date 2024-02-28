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
    command: bash -c "apt-get update && apt-get install -y git unzip libpng-dev libonig-dev libxml2-dev curl gnupg && docker-php-ext-install pdo pdo_mysql && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && curl -sS https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs && tail -f /dev/null"
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
Clone du projet Symfony/Vue
```bash
git clone https://github.com/aurelienfvre/SAE401.git ecolearn
```
```bash
composer install
```
