#!/bin/sh

# DB_CONNECTION=mysql
# DB_HOST=mysql
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=sail
# DB_PASSWORD=password

BASEDIR="$(dirname ${0})/.."

. ${BASEDIR}/.env

SAIL="${BASEDIR}/vendor/bin/sail"
DUMPDIR="sh/dump"
DUMPTO="${DUMPDIR}/$(date '+%Y%m%d-%H%M%S')-${DB_DATABASE}.sql"

test ! -e ${DUMPDIR} && mkdir ${DUMPDIR}

echo "dump to: ${DUMPTO}"

(
cd ${BASEDIR}

# ${SAIL} mysql -- mysqldump -u ${DB_USERNAME} -p ${DB_PASSWORD}
docker compose exec mysql mysqldump -u ${DB_USERNAME} -p${DB_PASSWORD} \
  --quote-names --opt --databases --no-tablespaces ${DB_DATABASE} > ${DUMPTO}
)
