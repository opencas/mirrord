#!/bin/bash
lock="/tmp/openthos"
timestamp="timestamp.txt"
HOST=dev.openthos.org/openthos/publish/android_x86_64_oto.img


[ -f $lock ] && exit 0
touch $lock

fatal() {
  echo "$1"
  exit 1
}

warn() {
  echo "$1"
}

cd /data/mirrors/openthos
latest=`curl -s -v -X HEAD $HOST 2>&1 | grep 'Last-Modified:' |  cut -d ':' -f2 | awk '{gsub(/^ +| +$/,"")}1'`
last_modified=`cat $timestamp`

if [ "$latest" != "$last_modified" ]; then
    curl $HOST -LO
    echo "$latest" > $timestamp
fi

rm -f $lock