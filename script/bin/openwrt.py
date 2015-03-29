#!/usr/bin/python
# forked from https://github.com/We-Neusoft/Scripts
from string import rfind
from time import mktime, strptime
from os import makedirs, path, stat, utime
from urllib import urlretrieve, urlopen
from xml.etree import ElementTree
import re

base_url = 'https://downloads.openwrt.org/snapshots'
out_dir = '/data/mirrors/openwrt/snapshots'

def download(filename, last_modified):
   file = out_dir + filename
   print 'Downloading ' + filename
   urlretrieve(base_url + filename, file)
   utime(file, (last_modified, last_modified))

   process(filename)

def retrieve(filepath):
   if '../' in filepath:
      return None
   handle = urlopen(base_url + filepath)
   return handle.read()

def process(filename, size=-1):
   file = out_dir + filename
   if path.isfile(file) and stat(file).st_size == size:
      print 'Skipping: ' + filename
      return

   print 'Processing: ' + filename
   handle = urlopen(base_url + filename)
   headers = handle.info()
   content_length = int(headers.getheader('Content-Length'))
   last_modified = mktime(strptime(headers.getheader('Last-Modified'), '%a, %d %b %Y %H:%M:%S %Z'))

   if rfind(filename, '/') > 0:
      dir = out_dir + filename[:rfind(filename, '/')]
   else:
      dir = out_dir

   if not path.isdir(dir):
      print 'Creating ' + dir
      makedirs(dir)

   if not path.isfile(file):
      download(filename, last_modified)
   else:
      file_stat = stat(file)
      if file_stat.st_mtime != last_modified or file_stat.st_size != content_length:
         download(filename, last_modified)
      else:
         print 'Skipping: ' + filename

pattern = r'<a href="(.*?)">'


def fetch(dir):
   dir_str = retrieve(dir)
   items = re.findall(pattern, dir_str)
   for item in items:
      if item == '../':
        continue
      if item[-1] == '/':
         fetch(dir + item)
         continue
      process(dir + item)



fetch('/')
