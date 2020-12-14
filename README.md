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

## Backend environment setup

```json
virtualenv env
source env/bin/activate
pip install -r requirements.txt
```

## DB setup and migration

Edit database connection in home/settings/dev.py (for production, prod.py).
```json
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'speedsnap',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': 3306,
    }
}
```
Migrate database by running following command.
```json
python manage.py migrate
```

## Create user

Change user detail in create_user.py and run following command.
```json
python manage.py shell < create_user.py
```

## Remove user

Change username in delete_user.py and run following command.
```json
python manage.py shell < delete_user.py
```

## Backend development workflow

```json
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
