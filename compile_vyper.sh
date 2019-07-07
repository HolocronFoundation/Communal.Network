#!/bin/bash
# Sets the base directory to this scripts location
  BASEDIR=$(dirname "$BASH_SOURCE")

cd $BASEDIR || exit
vyper Communal.Network.v.py > Communal.Network.vyc
vyper -f abi Communal.Network.v.py > Communal.Network.abi