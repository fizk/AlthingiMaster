# Althingi Master

Maybe not the best way of doing things, but it does the job.
The purpose of this repo is to pull all the different micro-services to gether and provide one `docker-compose.yml` file that can start the whole system in production mode.

The sub-systems are:
* https://github.com/fizk/AlthingiAggregator
* https://github.com/fizk/AlthingiQL
* https://github.com/fizk/Loggjafarthing
* https://github.com/fizk/AlthingiAccumulator

Each repo is responsible for their own `Dockerfile`, but this repo provides a `docker-compose.yml` that ties the all together.

## Setup.
Either clone each of the sub-system into theyr own directory and sim-link into the root of this repo or clone directly into the root. The names (directory names) of the sub-systems are importand and need to be as follow:

```
root
|
+ - accumulator [simlink] or [git clone https://github.com/fizk/AlthingiAccumulator accumulator]
|
+ - aggregator [simlink] or [git clone https://github.com/fizk/AlthingiAggregator aggregator]
|
+ - assets
| 
+ - client [simlink] or [git clone https://github.com/fizk/AlthingiQL client]
|
+ - data
|
+ - logs
|
+ - log-server
|
+ - server [simlink] or [git clone https://github.com/fizk/Loggjafarthing server]
| 
+ - docker-compose.yml
| 
` - Dockerfile
```

The hole systems looks like this:
![althingi-schema 2 0](https://user-images.githubusercontent.com/386336/56483409-2c140300-650d-11e9-8f25-b5f65d2e0fd4.png)

## Run
To get everything up and running

```bash
$ docker-compose up -d master
```

For individual services, see docker-compose file. Example: To run pnly the API (and all system dependant), run 
```bash
$ docker-compose up -d api
```

## Logging.
If run in _deamon_ mode, one can monitor `stdout` via docker-compose logs
```bash
$ docker-compose logs -tf --tail="all" api graphql aggregator accumulator
```
...or any combination of systems you want to monitor.

## Useful commands

### Aggregator
The Aggregator is run as a one off command. Have a look at [available scripts to run](https://github.com/fizk/AlthingiAggregator/tree/master/auto).

```
$ docker-compose run -d aggregator /usr/src/auto/globals.sh
$ docker-compose run -d aggregator /usr/src/auto/assembly.sh 147
```

Sometimes it is desirable to clear the consumer/provider cache assosiated with the Aggregator. For that we have to get into the running cache Docker container and flush the cache. Find the `CONTAINER ID` by running `docker ps -a`, the go into the container and clear the cache

```
$ docker exec -it <CONTAINER ID> /bin/bash
redis-cli
flushall
```

https://qbox.io/blog/author/vineeth-mohan?utm_source=qbox.io&utm_medium=article&utm_campaign=migrating-mysql-data-into-elasticsearch-using-logstash


https://github.com/oprearocks/RabbitMQ-Docker-cluster
https://www.youtube.com/watch?v=w2kGd2VRJWE
https://mindbyte.nl/2018/04/05/run-rabbitmq-using-docker-compose-with-guest-user.html
