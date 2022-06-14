# This is the script file to make it easier to organise the database initialisation
echo '======================== DROPPING ALL THE DATABASE FILES'
psql project3_db < server/db/schema_init.sql # Drop all tables 
echo '======================== SETTING THE SCHEMA'
psql project3_db < server/db/schema.sql # Set the schema
echo '======================== INSERTING STATIC DATA'
psql project3_db < server/db/static_seed.sql # Give the static data
echo '======================== INSERTING DUMMY DATA'
psql project3_db < server<db<seed_dummy.sql # Seed with any dummy data