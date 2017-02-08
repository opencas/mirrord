import os
import time
import json


mirrorPath = '/data/mirrors/'


def getSize(dir):
    size = 0
    for root, dirs, files in os.walk(dir):
        size += sum([os.path.getsize(
            os.path.join(root, name)) for name in files])
    return size


def getState():
    mirrorList = os.listdir(mirrorPath)
    mirrorList.sort()
    state = dict()

    last_modify = {
        'centos': '/timestamp.txt',
        'android': '/repository',
        'epel': '/fullfilelist',
        'pypi': '/status'
    }

    for mirror in mirrorList:
        temp = {}
        if os.path.isdir(mirrorPath + os.path.sep + mirror):
            if os.path.exists('/tmp' + os.path.sep + mirror):
                temp['state'] = 'syncing'
            else:
                temp['state'] = 'success'

            temp["doc"] = 'http://mirrors.opencas.org/docs/' + mirror + '.html'
            info = os.stat(mirrorPath + os.path.sep + mirror)
            if mirror in last_modify:
                info = os.stat(mirrorPath + os.path.sep +
                               mirror + last_modify[mirror])
            temp["up_time"] = time.strftime('%Y-%m-%d %H:%M:%S',
                                            time.localtime(info.st_mtime))
            temp["link"] = 'http://mirrors.opencas.org/' + mirror
            state[mirror] = temp
    return state


if __name__ == '__main__':
    state = sorted(getState().items(), key=lambda d: d[0])
    content = json.dumps(state)

    with open(mirrorPath + 'state.json', 'w') as outFile:
        outFile.write(content)
