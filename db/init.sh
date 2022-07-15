# https://stackoverflow.com/a/69244873
echo "** Creating default db and users"

mysql -u root -p$MYSQL_ROOT_PASSWORD --execute \
"CREATE DATABASE IF NOT EXISTS $MYSQL_DATABASE;
CREATE USER '$MYSQL_RW_USER'@'%' IDENTIFIED BY '$MYSQL_RW_USER_PASSWORD';
CREATE TABLE IF NOT EXISTS schedule_golf.schedule_golf_users
	(
		sql_id INT PRIMARY KEY AUTO_INCREMENT INVISIBLE,
		user_id VARCHAR(36),
		company_name VARCHAR(255),
	 	first_name VARCHAR(255),
		last_name VARCHAR(255),
		email VARCHAR(255),
		hash CHAR(60)
	);
GRANT ALL PRIVILEGES ON $MYSQL_DATABASE.* TO '$MYSQL_RW_USER'@'%';"


echo "** Finished creating default db and users"