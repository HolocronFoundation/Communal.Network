#!/bin/bash
# Sets the base directory to this scripts location
  BASEDIR=$(dirname "$BASH_SOURCE")

cd $BASEDIR || exit
python3 -m http.server
