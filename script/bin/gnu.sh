#/bin/dash
LOCK=/tmp/gnu

[ -f $LOCK ] && echo "already running" >&2 && exit 0
touch $LOCK

fatal() {
  echo "$1"
  exit 1
}

warn() {
  echo "$1"
}
rsync -avzHS --timeout=600 --ipv4 --delay-updates --delete-excluded --delete-delay rsync://ftp.gnu.org/gnu/ /data/mirrors/gnu
rm -f $LOCK
