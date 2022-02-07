#!/bin/bash

MACHINE=$1 #The EC2 instance you want to copy the code 
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

rsync -avz --exclude='.git/' --exclude='node_modules' --delete $SCRIPT_DIR $MACHINE:.
