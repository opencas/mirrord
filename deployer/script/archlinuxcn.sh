#/bin/dash
source=rsync://repo@sync.repo.archlinuxcn.org/repo/
target=/data/mirrors/archlinuxcn
lock=/tmp/archlinuxcn

[ -f $lock ] && echo "already running" >&2 && exit 0
touch $lock

fatal() {
  echo "$1"
  exit 1
}

warn() {
  echo "$1"
}
rsync -avzH --timeout=600 --ipv4 \
      --delay-updates  --delete-delay \
      ${source} ${target}

rm -f $lock
