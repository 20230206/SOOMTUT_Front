#! user/bin/env bash

PROJECT_ROOT="home/ubuntu/app/front"
REACT_FILE="$PROJECT_ROOT"

APP_LOG="$PROJECT_ROOT/applcation.log"
ERROR_LOG="$PROJECT_ROOT/error.log"
DEPLOY_LOG="$PROJECT_ROOT/deploy.log"

TIME_NOW=$(date +%c)

# react 파일 실행
echo "$TIME_NOW > $REACT_FILE 파일 실행" >> $DEPLOY_LOG


CURRENT_PID=$(ps -ef | grep 'node' | grep -v grep | awk '{print $2}')
echo "$TIME_NOW > 실행된 프로세서 아이디 $CURRENT_PID 입니다." >> $DEPLOY_LOG