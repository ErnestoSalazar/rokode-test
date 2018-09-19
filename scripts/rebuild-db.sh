psql postgres -c "CREATE USER postgres SUPERUSER;"
psql postgres -c "CREATE DATABASE postgres WITH OWNER postgres;"


psql postgres -c "CREATE DATABASE postgres WITH ENCODING 'UTF8'"

psql postgres -c 'SET search_path to "rokode_exam_db",public;
                 ALTER ROLE postgres SET search_path TO rokode_exam_db,public;'

psql postgres -c 'set "search_path" to "rokode_examclear_db",public;'


echo ==================================
echo         DROPING DATABASE
echo ==================================
# delete database
node_modules/.bin/sequelize db:migrate:undo:all

echo ==================================
echo         CREATING DATABASE
echo ==================================
# create database again
node_modules/.bin/sequelize db:migrate