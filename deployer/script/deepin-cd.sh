#/bin/dash
LOCK=/tmp/deepin-cd

[ -f $LOCK ] && exit 0
touch $LOCK

fatal() {
  echo "$1"
  exit 1
}

warn() {
  echo "$1"
}

rsync -av --timeout=600 --ipv4 --delete-delay rsync.deepin.com::releases/ /data/mirrors/deepin-cd

rm -f $LOCK

