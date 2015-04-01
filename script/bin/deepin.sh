#/bin/dash
LOCK=/tmp/deepin

[ -f $LOCK ] && exit 0
touch $LOCK

fatal() {
  echo "$1"
  exit 1
}

warn() {
  echo "$1"
}
rsync -av --ipv4 --delete-delay packages.linuxdeepin.com::packages /data/mirrors/deepin
rsync -av --ipv4 --delete-delay cdimage.linuxdeepin.com::releases /data/mirrors/deepin-cd

rm -f $LOCK
