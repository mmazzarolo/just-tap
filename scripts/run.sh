#!/bin/bash

COLOR_RED='\033[0;31m'
COLOR_CYAN='\033[0;36m'
COLOR_PURPLE='\033[0;35m'
COLOR_DEFAULT='\033[0m'

use_scrcpy=0
platform="ios"

while getopts ":p:" option; 
do
    case "${option}" in
        p) platform=${OPTARG};;
    esac
done

for arg in "$@" 
do
    if [ "$arg" == "--scrcpy" ] || [ "$arg" == "-s" ]; then 
        use_scrcpy=1 
    fi
done

if [[ "$platform" == "android" ]]; 
then
    (sleep 4 && npm run android) & pid=$!
    PID_LIST+=" $pid";
    if [[ "$use_scrcpy" == 1 ]]; then
        scrcpy & pid=$!
        PID_LIST+=" $pid";
    fi
elif [[ "$platform" == "ios" ]];
then
    (sleep 4 && react-native run-ios --simulator="iPhone 7" && react-native log-ios) & pid=$!
    PID_LIST+=" $pid";
else 
    echo -e "${COLOR_RED}Invalid platform. Allowed platforms: ios, android${COLOR_DEFAULT}"
    exit 1
fi

npm run start & pid=$!
PID_LIST+=" $pid";


trap "kill $PID_LIST" SIGINT

echo -e "${COLOR_PURPLE}Metro bundler started and ${platform} development started ${COLOR_DEFAULT}";

wait $PID_LIST

echo
echo -e "${COLOR_PURPLE}Metro bundler stopped and ${platform} development completed ${COLOR_DEFAULT}";