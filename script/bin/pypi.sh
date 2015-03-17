#/bin/dash
LOCK=/tmp/pypi

[ -f $LOCK ] && exit 0
touch $LOCK

fatal() {
  echo "$1"
  exit 1
}

warn() {
  echo "$1"
}
/usr/bin/bandersnatch mirror 1> /dev/null 2>&1

rm -f $LOCK
