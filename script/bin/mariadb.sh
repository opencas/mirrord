#/bin/dash
LOCK=/tmp/mariadb

[ -f $LOCK ] && exit 0
touch $LOCK

fatal() {
  echo "$1"
  exit 1
}

warn() {
  echo "$1"
}
rsync -a --partial --delete-delay --delay-updates rsync.osuosl.org::mariadb /data/mirrors/mariadb


rm -f $LOCK
