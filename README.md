## The Link to the project online
1. Frontend - https://locate-physician.herokuapp.com/
2. Backend - http://find-physician.herokuapp.com/physicians?search=al

### The project files are zipped and provided

./my-app folder contains the UI code built using basic React bootstrap elements

adddata.js - This handled the migration of local database to online database

server.js - A basic server, serving required information about the physicians names and addresses 

./mongoimport -d test -c test_col --type csv --file OP_DTL_OWNRSHP_PGYR2016_P06292018.csv --headerline 

./mongoimport -d test -c test_col --type csv --file /Users/kaushalop/Downloads/PGYR16_P062918/OP_DTL_GNRL_PGYR2016_P06292018.csv --headerline

./mongoimport -d test -c test_col --type csv --file /Users/kaushalop/Downloads/PGYR16_P062918/OP_DTL_RSRCH_PGYR2016_P06292018.csv --headerline

This command was used to dump the CSV data downloaded to the local mongo

### The immediate future enhancements on the project

1. Cache or pre compute the lat long of the physicians to prevent redundant calls to the Google Maps API
2. Search input can be used to filter responses fetched from the database