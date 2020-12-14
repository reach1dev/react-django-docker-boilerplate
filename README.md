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

## Setup and test step by step

1. Clone repository

git clone https://github.com/clement1024/MySpeedCam.git

or if you have a directory already cloned

git pull origin master

2. Install python packages using pip(pip3) if you are first installation.

pip3 install -r requirements.txt

3. Config database connection details in home/settings/dev.py

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


4. Migrate database if you are first installation.

python3 manage.py migrate

5. Create user if you are first and, so hasn't any user.

Edit or confirm user details in create_user.py and run following command.

python manage.py shell < create_user.py

6. Install node packages for frontend and build frontend

npm i
npm run build

7. Create media folder in the root of project and move/copy server folder to media folder.

8. Run django server

python manage.py runserver



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
