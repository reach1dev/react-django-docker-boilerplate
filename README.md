<p align="center">
  <p align="center">
    React + Django + Docker Boilerplate
  </p>
</p>

## Build and Deploy using docker

```json
docker-compose -f docker-compose.yml -f docker-compose.test.yml build

docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```

If you are updating this source code and rebuild, use following command to clean docker container cache.

```json
docker-compose down --rmi all -v --remove-orphans

docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```
