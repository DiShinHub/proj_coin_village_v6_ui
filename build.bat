
@echo off
@echo INFO: build.bat activate

@REM clear.bat 실행 (TODO : 오류 나는 부분 수정)
call %cd%\clear.bat

@REM 공통 변수 셋팅
set root_path=program
set main_path=%root_path%\main

@REM 원본 파일 경로 셋팅
set web_org_path=%cd%\web\*.*
set env_org_path=%cd%\.env
set dist_org_path=%cd%\dist\main\*.*

@REM 신규생성 파일 경로 셋팅
set web_path=%main_path%\web

@REM 폴더 생성
mkdir %root_path%
mkdir %main_path%
mkdir %web_path%

@REM py intaller 실행
pyinstaller .\main.py -y

@REM 웹, 메인, dist, .env 복사
xcopy %web_org_path% %web_path% /e /h /k
xcopy %dist_org_path% %main_path% /e /h /k
copy %env_org_path% %main_path%

@REM 불필요한 파일 정리
RMDIR /s /q %cd%\build
RMDIR /s /q %cd%\dist
del %cd%\main.spec

@echo INFO: %root_path% has been created Succesfully.
@echo INFO: main.exe is in %cd%\%main_path%\