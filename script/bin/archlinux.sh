#!/bin/bash

home="/data/mirrors"
target="${home}/archlinux"
tmp="${home}/archlinux/.tmp"
lock='/tmp/mirrorsync.lck'
bwlimit=4096
#source='rsync://rsync.archlinux.org/ftp_tier1'
#lastupdate_url="http://rsync.archlinux.org/lastupdate"
source='rsync://mirrors.kernel.org/archlinux/'
lastupdate_url="http://mirror.pkgbuild.com/lastupdate"

[ ! -d "${target}" ] && mkdir -p "${target}"
[ ! -d "${tmp}" ] && mkdir -p "${tmp}"

exec 9>"${lock}"
flock -n 9 || exit

# if we are called without a tty (cronjob) only run when there are changes
if ! tty -s && diff -b <(curl -s "$lastupdate_url") "$target/lastupdate" >/dev/null; then
	exit 0
fi

if ! stty &>/dev/null; then
    QUIET="-q"
fi

rsync -rtlvH --safe-links --delete-delay --progress -h ${QUIET} --timeout=600 --contimeout=60 -p \
	--delay-updates --no-motd --bwlimit=$bwlimit \
	--temp-dir="${tmp}" \
	--exclude='*.links.tar.gz*' \
	--exclude='/other' \
	--exclude='/sources' \
	--exclude='/iso' \
	${source} \
	"${target}"

#echo "Last sync was $(date -d @$(cat ${target}/lastsync))"
