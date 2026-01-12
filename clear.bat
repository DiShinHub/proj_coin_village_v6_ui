@echo INFO: clear.bat activate

@REM 폴더 및 파일 삭제
RMDIR /s /q %cd%\build
RMDIR /s /q %cd%\dist
RMDIR /s /q %cd%\program
del %cd%\main.spec

@echo INFO: dummies have been deleted Succesfully.