#! /bin/bash
importserver="localhost:27017"                                                                                                            
db="db-rss-posts"
collections=("categories" "creators" "posts" "admins")

echo "Begin To Import"

for c in ${collections[@]};
do
    echo "importing $c .."
     mongoimport --host $importserver --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase admin --db=$db --collection $c --file "/docker-entrypoint-initdb.d/$c.json" --jsonArray
done

echo "Done."