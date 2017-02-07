#/bin/dash
LOCK=/tmp/raspbian

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
    archive.raspbian.org::archive /data/mirrors/raspbian



rm -f $LOCK
