<p align="center">
  <p align="center">
    <a href="https://justdjango.com/?utm_source=github&utm_medium=logo" target="_blank">
      <img src="https://user-images.githubusercontent.com/58422477/105461911-f16d6a80-5c9e-11eb-8b78-042858cf6895.png" alt="mySpeedCam" height="72">
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
        'USER': 'speedsnap',
        'PASSWORD': 'speedsnap',
        'HOST': '<should be your computer IP, not localhost>',
        'PORT': 3306,
    }
}
```

** Give % access to this user with password.
```json
mysql -u root -p

GRANT ALL ON speedsnap.* TO 'speedsnap'@'%' IDENTIFIED BY 'speedsnap';
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


5. Docker compose build and start.

```json
docker-compose -f docker-compose.yml -f docker-compose.test.yml build

docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```

If you are updating this source code and rebuild, use following command to clean docker container cache.

```json
docker-compose down --rmi all -v --remove-orphans

docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```



License key: a5ffa952670070ed76249bbf5b15e681T1JERVI6MjA0NzQsRVhQSVJZPTE2NDI5NzcyNDMwMDAsS0VZVkVSU0lPTj0x

Expiry date: Sun Jan 23 2022

Installation instructions: https://material-ui.com/components/data-grid/getting-started/#license-key-installation

