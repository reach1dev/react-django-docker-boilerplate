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

## Deploy using docker

1. Clone repository

```json
git clone https://github.com/clement1024/MySpeedCam.git
```

or if you have a directory already cloned

```json
git pull origin master
```

2. Install docker and docker-compose.

https://docs.docker.com/engine/install/ubuntu/
https://docs.docker.com/compose/install/


3. Config database connection details in home/settings/dev.py

```json
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'speedsnap',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': '<should be your computer IP, not localhost>',
        'PORT': 3306,
    }
}
```


4. Docker compose build.

```json
docker-compose -f docker-compose.yml -f docker-compose.test.yml build
```

5. Docker compose up.

```json
docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```
