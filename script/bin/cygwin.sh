#/bin/dash
LOCK=/tmp/cygwin

[ -f $LOCK ] && exit 0
touch $LOCK

fatal() {
  echo "$1"
  exit 1
}

warn() {
  echo "$1"
}
rsync -avzH --ipv4 --delay-updates  --delete-delay \
    rsync://mirrors.kernel.org/sourceware/cygwin/  /data/mirrors/cygwin



rm -f $LOCK
