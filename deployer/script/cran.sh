#/bin/dash
LOCK=/tmp/cran

[ -f $LOCK ] && echo "already running" >&2 && exit 0
touch $LOCK

fatal() {
  echo "$1"
  exit 1
}

warn() {
  echo "$1"
}
rsync -rtlzv --ipv4 --delete-delay --delay-updates cran.r-project.org::CRAN /data/mirrors/cran > /dev/null
rm -f $LOCK

