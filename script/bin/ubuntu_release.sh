#/bin/dash
LOCK=/tmp/ubuntu_releases

[ -f $LOCK ] && exit 0
touch $LOCK
fatal() {
  echo "$1"
  exit 1
}

warn() {
  echo "$1"
}

# Find a source mirror near you which supports rsync on
# https://launchpad.net/ubuntu/+cdmirrors
# rsync://<iso-country-code>.rsync.releases.ubuntu.com/releases should always work
RSYNCSOURCE=rsync://rsync.releases.ubuntu.com/releases

# Define where you want the mirror-data to be on your mirror
BASEDIR=/data/mirrors/ubuntu-releases

if [ ! -d ${BASEDIR} ]; then
  warn "${BASEDIR} does not exist yet, trying to create it..."
  mkdir -p ${BASEDIR} || fatal "Creation of ${BASEDIR} failed."
fi

rsync --ipv4 --verbose --recursive --times --links --hard-links \
  --stats --delete-after \
  ${RSYNCSOURCE} ${BASEDIR} || fatal "Failed to rsync from ${RSYNCSOURCE}."

date -u > ${BASEDIR}/.trace/${HOSTNAME}
rm -f $LOCK
