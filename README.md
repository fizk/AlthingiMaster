# Althingi Master

Maybe not the best way of doing things, but it does the job.
The purpose of this repo is to pull all the different micro-services together and provide one `docker-compose.yml` file that can start the whole system in production mode.

The sub-systems are:
* https://github.com/fizk/AlthingiAggregator
* https://github.com/fizk/AlthingiQL
* https://github.com/fizk/Loggjafarthing
* https://github.com/fizk/AlthingiAccumulator
* https://github.com/fizk/AlthingiSearchIndexer

![althingi-schema 2 0](https://user-images.githubusercontent.com/386336/56483409-2c140300-650d-11e9-8f25-b5f65d2e0fd4.png)

## Install / Setup
Each repo is responsible for their own `Dockerfile`, but this repo provides a `docker-compose.yml` that ties the all together.

Either `clone` each of the sub-system into their own directory and sim-link into the root of this repo or `clone` directly into the root. The names (directory names) of the sub-systems are important and need to be as follow:

```
root/
  ├── accumulator/ [simlink] or [git clone https://github.com/fizk/AlthingiAccumulator accumulator]
  ├── aggregator/ [simlink] or [git clone https://github.com/fizk/AlthingiAggregator aggregator]
  ├── assets/
  ├── client/ [simlink] or [git clone https://github.com/fizk/AlthingiQL client]
  ├── data/
  ├── logs/
  ├── log-server/
  ├── server/ [simlink] or [git clone https://github.com/fizk/Loggjafarthing server]
  ├── docker-compose.yml
  └── Dockerfile
```

### Assets
There are some assets that either have no repo on their own (master Apache config file, MySQL config, RabbitMQ config) or are shared between many repos (RabbitMQ definitions). They are therefor placed in the `./assets` directory.

## Run
To run the system in production mode (in Docker containers), run 

```bash
$ docker-compose up -d master
```

Look at `docker-compose.yml` to see which individual systems can be run. To run for example only the [API](https://github.com/fizk/Loggjafarthing) part, run 

```bash
$ docker-compose up -d api
```

## Logging / Monitoring
Docker containers should report all their logging to **stdout**, and the idea is that each container should then be hooked up to a **stdin** container that can poll the data into a logging aggregator.

This systems uses the ELK stack (ElasticSearch, Logstash, Kibana) to aggregate logs. To get logs from a Docker container into ElasticSearch, a middle-layer called Logstash is used. It accepts data in different ways (file, stream etc...), re-formats the data and sends it into ElasticSearch (it also has support for queues to be able to accept more data at a time than ES).

Different log-drivers can be attached to a Docker container (log to file, to stream etc...). To be able to move logs from Docker into Logstash without having to write them first to disk (which would be slow), the Gelf driver is used. 

It is a UDP protocol stream that Logstash can listen to.

### Monitoring: development

The only problem with it is that, if the Gelf driver is running, the Docker container can not send data to **stdout**.

Since docker-compose does not have conditional statements, the only way to monitor systems through the terminal during development is to comment out the logging-driver section for every system you want to monitor

```
    # logging:
    #   driver: gelf
    #   options:
    #     gelf-address: udp://127.0.0.1:12201
    #     tag: "xxxxx"
```

After restating the containers, you can run 
```bash
$ docker-compose logs -tf --tail="all" api graphql aggregator accumulator
```
...or any combination of systems you want to monitor.

### Monitoring: production
In production, all logs go to the ELK stack (ElasticSearch, Logstash, Kibana) and can be viewed via Kibana.

Kibana is running on port [:5601](http://loggjafarthing.einarvalur.co:5601)

If you are setting up the system locally you need to tell ElasticSearch about the format that the logs take. IE. you need to provide a schema template. Under the **Dev Tools** tab in Kibana run the command described in [log-server's readme.md](https://github.com/fizk/AlthingiMaster/blob/master/log-server/README.md) file.


## Useful commands

### Aggregator
The Aggregator is run as a one off command. Have a look at [available scripts to run](https://github.com/fizk/AlthingiAggregator/tree/master/auto).

```
$ docker-compose run -d aggregator /usr/src/auto/globals.sh
$ docker-compose run -d aggregator /usr/src/auto/assembly.sh 147
$ docker-compose run -d aggregator /usr/src/auto/issue.sh 147 1 A
```

Sometimes it is desirable to clear the consumer/provider cache associated with the Aggregator.

```
$ docker exec -it cache-api redis-cli FLUSHALL
```

https://qbox.io/blog/author/vineeth-mohan?utm_source=qbox.io&utm_medium=article&utm_campaign=migrating-mysql-data-into-elasticsearch-using-logstash


https://github.com/oprearocks/RabbitMQ-Docker-cluster
https://www.youtube.com/watch?v=w2kGd2VRJWE
https://mindbyte.nl/2018/04/05/run-rabbitmq-using-docker-compose-with-guest-user.html

### MySQL
```
docker exec database /usr/bin/mysqldump -u root --password=example althingi > /root/backup.sql

docker exec -i database sh -c 'exec mysql -uroot -pexample' < /root/dump.sql
```

### SSL


To set up HTTPS in local development, follow this article https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/

For production, this was run

```
certbot certonly --webroot -w /root/AlthingiMaster/static/ -d loggjafarthing.einarvalur.co
```

Because the httpd.conf file is set up to find the cert files in
```
SSLCertificateFile /usr/local/apache2/cert/server.crt
SSLCertificateKeyFile /usr/local/apache2/cert/server.key
SSLCertificateChainFile /usr/local/apache2/cert/server.chain
```
but certbot keeps it in a nother location, and because using simlinks in Docker is tricky, a post-hook in placed in
`/etc/letsencrypt/renewal-hooks/post` that looks like this

```bash
#!/bin/bash

cp /etc/letsencrypt/archive/loggjafarthing.einarvalur.co/chain1.pem /root/AlthingiMaster/cert/server.chain
cp /etc/letsencrypt/archive/loggjafarthing.einarvalur.co/cert1.pem /root/AlthingiMaster/cert/server.crt
cp /etc/letsencrypt/archive/loggjafarthing.einarvalur.co/privkey1.pem /root/AlthingiMaster/cert/server.key
```
