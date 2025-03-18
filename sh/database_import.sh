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

test -z "${1}" && echo "sh ${0} <dump file name>" && exit

IMPORTFROM="${DUMPDIR}/${1}"
echo "import from: ${IMPORTFROM}"

(
cd ${BASEDIR}

test ! -e ${IMPORTFROM} && echo "error: ${IMPORTFROM} not found." && exit

# need -T option for pipe input
cat ${IMPORTFROM} | docker compose exec -T mysql mysql -u ${DB_USERNAME} -p${DB_PASSWORD}
)
