<p align="center">
  <p align="center">
    <a href="https://justdjango.com/?utm_source=github&utm_medium=logo" target="_blank">
      <img src="https://user-images.githubusercontent.com/58422477/102029022-e8df6580-3dbd-11eb-9954-019ff2767884.png" alt="mySpeedCam" height="72">
    </a>
  </p>
  <p align="center">
    MySpeedcam - dashboard where you can search the vehicles detected by the speed camera.
  </p>
</p>

## DB migration

python manage.py migrate


## Create user

Change user detail in create_user.py
python manage.py shell < create_user.py


## Remove user

Change username in delete_user.py
python manage.py shell < delete_user.py


## Backend development workflow

```json
virtualenv env
source env/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

## Frontend development workflow

```json
npm i
npm start
```

## For deploying

```json
npm run build
```
