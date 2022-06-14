# This is the script file to make it easier to organise the database initialisation
speaker-test -t sine -f 1000 -l 1
echo 'This is the FULL database initialisation script. All data will be lost'
echo -n 'Do you wish to proceed (y/n)?'
read INPUT
if [[ ($INPUT == "y")|| ($INPUT == "Y")]]
then
echo '======================== DROPPING ALL THE DATABASE FILES'
psql project3_db < server/db/db_init.sql # Drop all tables 
echo '======================== SETTING THE SCHEMA'
psql project3_db < server/db/schema.sql # Set the schema
echo '======================== INSERTING STATIC DATA'
psql project3_db < server/db/seed_static.sql # Give the static data
echo '======================== INSERTING DUMMY DATA'
psql project3_db < server/db/seed_dummy.sql # Seed with any dummy data
else
echo 'OPERATION CANCELLED'
fi