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
git checkout docker_version
```

or if you have a directory already cloned

```json
git checkout docker_version
git pull origin docker_version
```

2. Install docker and docker-compose (skip this if you've instealld already).

https://docs.docker.com/engine/install/ubuntu/

https://docs.docker.com/compose/install/


3. Config database connection details in the following file.

```json
vi ./django/src/home/settings/dev.py

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

4. Config ports forwarding in docker-compose.yml.

```json
services:
    django:
        ...
        ports: # you can remove these 2 lines if you don't want to export django server.
            - "8000:8000"
        ...

    nginx:
        ...
        ports:
            - "443:443"
            - "80:80" # you can change the second forwarding port, e.g. "80:8000".
```

5. You should add host of docker container to the mysql user.

```json
service mysql restart
```


6. Docker compose build.

```json
docker-compose -f docker-compose.yml -f docker-compose.test.yml build
```

7. Docker compose start services.

```json
docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```
