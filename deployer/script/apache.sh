#/bin/dash
LOCK=/tmp/apache

[ -f $LOCK ] && echo "already running" >&2 && exit 0
touch $LOCK

fatal() {
  echo "$1"
  exit 1
}

warn() {
  echo "$1"
}
rsync -avz --ipv4 --delete-delay --delay-updates --safe-links rsync.apache.org::apache-dist /data/mirrors/apache > /dev/null
rm -f $LOCK
