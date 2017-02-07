#/bin/dash
LOCK=/tmp/gentoo

[ -f $LOCK ] && exit 0
touch $LOCK

fatal() {
  echo "$1"
  exit 1
}

warn() {
  echo "$1"
}
rsync --timeout=600 --ipv4 --archive --verbose  --delete-delay --delay-updates \
     rsync://rsync.cn.gentoo.org/gentoo-portage/  /data/mirrors/gentoo



rm -f $LOCK