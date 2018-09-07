# althingi master

The sub projects need to be sim-linked into the root of this directory
as listed below:

```
root
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
+ - server [simlink]
| 
+ - docker-compose.yml
| 
` - Dockerfile
```


To get everything up and running

```bash
$ docker-compose up master
```

for individual services, see docker-compose file.
