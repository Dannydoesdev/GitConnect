# This script is used by the NPM SCRIPTS 
# This will reset only the dummy data required
# Feel free to comment out any you dont want to be reset.

echo '======================== DROPPING THE DUMMY TABLES'
psql project3_db < server/db/schema_init_dummy_only.sql
echo '======================== SETTING THE SCHEMA'
psql project3_db < server/db/schema.sql # Set the schema
