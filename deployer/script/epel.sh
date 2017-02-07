#/bin/dash
LOCK=/tmp/epel

[ -f $LOCK ] && exit 0
touch $LOCK

fatal() {
  echo "$1"
  exit 1
}

warn() {
  echo "$1"
}
SOURCE=rsync://dl.fedoraproject.org/fedora-epel
rsync -vazH --timeout=600 --ipv4 --numeric-ids  --delay-updates --delete-delay \
   $SOURCE /data/mirrors/epel

/usr/local/bin/report_mirror > /dev/null

rm -f $LOCK
