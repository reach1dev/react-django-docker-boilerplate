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

```json
git clone https://github.com/clement1024/MySpeedCam.git
```

or if you have a directory already cloned

```json
git pull origin master
```

2. Install python packages using pip(pip3) if you are first installation.

```json
pip3 install -r requirements.txt
```

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

```json
python3 manage.py migrate
```

5. Create user if you are first and, so hasn't any user.

Edit or confirm user details in create_user.py and run following command.

```json
python manage.py shell < create_user.py
```

6. Install node packages for frontend and build frontend

```json
npm i
npm run build
```

7. Create media folder in the root of project and move/copy server folder to media folder.

8. Run django server for local test.

```json
python manage.py runserver
```

9. Run django server for private net test.
Add your private net ip to the ALLOWED_HOSTS and run following command.

```json
python manage.py runserver 0.0.0.0:8000
```

## Possible issues in building.
Refer to this article.
https://stackoverflow.com/questions/44761246/temporary-failure-in-name-resolution-errno-3-with-docker