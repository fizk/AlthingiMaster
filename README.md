# althingi master

The sub projects need to be sim-linked into the root of this directory
as listed below:

```
root
|
+ - accumulator [simlink]
|
+ - aggregator [simlink]
|
+ - assets
| 
+ - client [simlink]
|
+ - data
|
+ - logs
|
+ - log-server
|
+ - server [simlink]
| 
+ - docker-compose.yml
| 
` - Dockerfile
```

![althingi-schema 2 0](https://user-images.githubusercontent.com/386336/54566370-c53e8e00-4a24-11e9-99e7-8cedad9113b2.png)


To get everything up and running

```bash
$ docker-compose up master
```

for individual services, see docker-compose file.


## Useful commands

### Aggregator

Get into a running `aggregator`
```
$ docker-compose run aggregator bash
```
from there you can `cd` into `usr/src/auto` to run the scripts

...or just run it in one command
```
$ docker-compose run  aggregator /usr/src/auto/globals.sh
$ docker-compose run -d --rm aggregator /usr/src/auto/assembly.sh 147
```


Clear the Redis cache
```
$ docker exec -it <CONTAINER ID> /bin/bash
redis-cli
flushall
```

### API

Re-index all speeches (ElasticSearch)
```
$ docker-compose run -d --rm api /var/www/auto/index-speeches.sh
```



https://qbox.io/blog/author/vineeth-mohan?utm_source=qbox.io&utm_medium=article&utm_campaign=migrating-mysql-data-into-elasticsearch-using-logstash


https://github.com/oprearocks/RabbitMQ-Docker-cluster
https://www.youtube.com/watch?v=w2kGd2VRJWE
https://mindbyte.nl/2018/04/05/run-rabbitmq-using-docker-compose-with-guest-user.html
