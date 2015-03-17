#!/bin/bash

##
## This is the official eclipse.org mirror site script.
##
## Set your options and run once manually, then as a cronjob - preferably not as root
##
## Last updated: 2012-07-10 by Denis Roy (webmaster@eclipse.org)
##


##
## User-defined options

# Set the base path for your mirror site here
# No ending /
mirror_path="/data/mirrors/eclipse"

# path to your RSYNC binary
RSYNC=/usr/bin/rsync

# Lockfile location - prevents rsync script from re-spawning
LOCKFILE="/tmp/eclipse_lockfile"

# if you rsync from master server, use these options
RSYNC_HOST=download.eclipse.org
RSYNC_PATH=eclipseMirror

# Alternate RSYNC.  Comment the master server options above
#RSYNC_HOST=rsync.gtlib.gatech.edu
#RSYNC_PATH=eclipse

# Alternate RSYNC.  Comment the master server options above
#RSYNC_HOST=rsync.osuosl.org
#RSYNC_PATH=eclipse
#RSYNC_HOST=mirrors.ustc.edu.cn
#RSYNC_PATH=eclipse




# Select the content you want to mirror.
# Please see http://eclipse.org/downloads for information on the space requirements.

# full_eclipse is a complete eclipse.org mirror, without nightly builds.  This is what most people want.
# If you set this to no, set the projects you want to yes below.
full_eclipse=yes


# full_patform is the Eclipse Platform project.
# It includes Stable and Release builds, but not nightlies.
# It does not include any other project (Release trains, tools, webtools, technology, birt, etc)
full_platform=no

# All Simultaneous Releases. This will be a high-demand item. Say no here if you said yes to full_eclipse.
release_trains=no

# BIRT project. Say no here if you said yes to full_eclipse.
full_birt=no

# modeling Project. Say no here if you said yes to full_eclipse.
full_modeling=no

# RT Project. Say no here if you said yes to full_eclipse.
full_rt=no

# technology Project. Say no here if you said yes to full_eclipse.
full_technology=no

# Tools project. Say no here if you said yes to full_eclipse.
full_tools=no

# Testing and Performance Tools Project (TPTP). Say no here if you said yes to full_eclipse.
full_tptp=no

# Webtools project. Say no here if you said yes to full_eclipse.
full_webtools=no

# Datatools project. Say no here if you said yes to full_eclipse.
full_datatools=no

## End: User-defined options
##



#
## Contributed by Gabriel Akos 2005-10-14
host $RSYNC_HOST > /dev/null
hres=$?
if [ $hres -ne 0 ]; then
	echo "Eclipse mirror - host $RSYNC_HOST resolution failed" >/dev/stderr
	exit 1
fi


if [ -e $LOCKFILE ]; then
	echo "Eclipse mirror - Lockfile $LOCKFILE exists" >/dev/stderr
	exit 1
fi
touch $LOCKFILE

## END: Contributed by Gabriel Akos 2005-10-14
#



# required "mirror root" timestamp.
# All mirror sites must get this.
$RSYNC -tlvp $RSYNC_HOST::$RSYNC_PATH/TIME $mirror_path 


if [ $full_eclipse == yes ]; then
	$RSYNC -rtvp --delete $RSYNC_HOST::$RSYNC_PATH/* $mirror_path
fi 

if [ $full_platform == yes ] ; then
	$RSYNC -rtvp --delete $RSYNC_HOST::$RSYNC_PATH/eclipse/* $mirror_path/eclipse/
fi

if [ $release_trains == yes ]; then
	$RSYNC -rtvp --delete $RSYNC_HOST::$RSYNC_PATH/releases/* $mirror_path/releases/
fi


if [ $full_birt == yes ]; then
	$RSYNC -rtvp --delete $RSYNC_HOST::$RSYNC_PATH/birt/* $mirror_path/birt/
fi

if [ $full_modeling == yes ]; then
	$RSYNC -rtvp --delete $RSYNC_HOST::$RSYNC_PATH/modeling/* $mirror_path/modeling/
fi

if [ $full_rt == yes ]; then
	$RSYNC -rtvp --delete $RSYNC_HOST::$RSYNC_PATH/rt/* $mirror_path/rt/
fi

if [ $full_technology == yes ]; then
	$RSYNC -rtvp --delete $RSYNC_HOST::$RSYNC_PATH/technology/* $mirror_path/technology/
fi

if [ $full_tools == yes ]; then
	$RSYNC -rtvp --delete $RSYNC_HOST::$RSYNC_PATH/tools/* $mirror_path/tools/
fi

if [ $full_tptp == yes ]; then
	$RSYNC -rtvp --delete $RSYNC_HOST::$RSYNC_PATH/tptp/* $mirror_path/tptp/
fi

if [ $full_webtools == yes ]; then
	$RSYNC -rtvp --delete $RSYNC_HOST::$RSYNC_PATH/webtools/* $mirror_path/webtools/
fi

if [ $full_datatools == yes ]; then
	$RSYNC -rtvp --delete $RSYNC_HOST::$RSYNC_PATH/datatools/* $mirror_path/datatools/
fi

# required "mirror root" timestamp.
# All mirror sites must get this.
$RSYNC -tvp $RSYNC_HOST::$RSYNC_PATH/ztime/* $mirror_path/ztime/


rm $LOCKFILE
