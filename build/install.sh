#!/bin/bash

set -e

SCRIPT=$(readlink -f "$0")
BASEDIR=$(dirname "$SCRIPT")

bash ${BASEDIR}/nvm.sh
bash ${BASEDIR}/node.sh