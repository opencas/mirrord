#/bin/dash
LOCK=/tmp/anthonos

[ -f $LOCK ] && echo "already running" >&2 && exit 0
touch $LOCK

fatal() {
  echo "$1"
  exit 1
}

warn() {
  echo "$1"
}
rsync -avzH --timeout=600 --ipv4 --delay-updates  --delete-delay  rsync://mirror.anthonos.org/anthon  /data/mirrors/anthonos
#rsync -avzH --ipv4 --delay-updates  --delete-delay mirrors.kernel.org::centos /data/mirrors/centos


rm -f $LOCK