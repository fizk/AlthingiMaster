https://elk-docker.readthedocs.io/#troubleshooting

```
GET /_cat/indices
GET _template/template_*

DELETE _template/template_aggregator
PUT _template/template_aggregator?include_type_name=true
{
    "mappings": {
        "doc": {
            "properties": {
                "@timestamp": {
                    "type": "date"
                },
                "@version": {
                    "type": "keyword"
                },
                "action": {
                    "type": "keyword"
                },
                "code": {
                    "type": "integer"
                },
                "host": {
                    "type": "keyword"
                },
                "level": {
                    "type": "keyword"
                },
                "memory": {
                  "type" : "object",
                  "properties": {
                    "peak": {
                      "type": "long"
                    },
                    "usage": {
                      "type": "long"
                    }
                  }
                },
                "path": {
                    "type": "text"
                },
                "payload": {
                    "type": "text"
                },
                "type": {
                    "type": "keyword"
                }
            }
        }

    },
    "settings": {
        "index.refresh_interval": "5s"
    },
    "index_patterns": "aggregator-*"

}

DELETE _template/template_mysql
PUT _template/template_mysql?include_type_name=true
{
    "mappings": {
        "doc": {
            "properties": {
                "@timestamp": {
                    "type": "date"
                },
                "@version": {
                    "type": "keyword"
                },
                "host": {
                    "type": "keyword"
                },
                "level": {
                    "type": "keyword"
                },
                "path": {
                    "type": "text"
                },
                "message": {
                    "type": "text"
                },
                "type": {
                    "type": "keyword"
                }
            }
        }
    },
    "settings": {
        "index.refresh_interval": "5s"
    },
    "index_patterns": "mysql-*"
}

DELETE _template/template_graphql
PUT _template/template_graphql?include_type_name=true
{
    "mappings": {
        "doc": {
            "properties": {
                "@timestamp": {
                    "type": "date"
                },
                "@version": {
                    "type": "keyword"
                },
                "requestTime": {
                    "type": "double"
                },
                "cache": {
                    "type": "keyword"
                },
                "request": {
                    "type": "text"
                },
                "level": {
                    "type": "keyword"
                },
                "payload": {
                    "type": "text"
                },
                "host": {
                    "type": "keyword"
                },
                "path": {
                    "type": "text"
                },
                "cpu": {
                    "dynamic": true,
                    "properties": {
                        "system": {
                          "type": "long"
                        },
                        "user": {
                          "type": "long"
                        }
                    }
                },
                "memory": {
                    "dynamic": true,
                    "properties": {
                        "external": {
                          "type": "long"
                        },
                        "heapTotal": {
                          "type": "long"
                        },
                        "rss": {
                          "type": "long"
                        },
                        "heapUsed": {
                          "type": "long"
                        }
                    }

                }
            }
        }
    },
    "settings": {
        "index.refresh_interval": "5s"
    },
    "index_patterns": "graphql-*"
}

DELETE _template/template_apache
PUT _template/template_apache?include_type_name=true
{
    "mappings": {
        "doc": {
            "properties": {
                "@timestamp": {
                    "type": "date"
                },
                "@version": {
                    "type": "keyword"
                },
                "auth": {
                    "type": "text"
                },
                "bytes": {
                    "type": "long"
                },
                "clientip": {
                    "type": "text"
                },
                "httpversion": {
                    "type": "text"
                },
                "ident": {
                    "type": "text"
                },
                "message": {
                    "type": "text"
                },
                "referrer": {
                    "type": "text"
                },
                "request": {
                    "type": "text"
                },
                "response": {
                    "type": "integer"
                },
                "type": {
                    "type": "keyword"
                },
                "verb": {
                    "type": "keyword"
                },
                "geoip"  : {
                    "dynamic": true,
                    "properties" : {
                        "ip": { "type": "ip" },
                        "location" : { "type" : "geo_point" },
                        "latitude" : { "type" : "half_float" },
                        "longitude" : { "type" : "half_float" }
                    }
                },
                "agent": {
                    "type": "text"
                },
                "UA": {
                    "dynamic": true,
                    "properties" : {
                        "build": { "type": "text"},
                        "device": { "type": "keyword"},
                        "major": { "type": "integer"},
                        "minor": { "type": "integer"},
                        "name": { "type": "keyword"},
                        "os": { "type": "keyword"},
                        "os_major": { "type": "integer"},
                        "os_minor": { "type": "integer"},
                        "os_name": { "type": "keyword"},
                        "patch": { "type": "integer"}
                    }
                }
            }
        }
    },
    "settings": {
        "index.refresh_interval": "5s"
    },
    "index_patterns": "apache-*"
}

DELETE _template/template_api
PUT _template/template_api?include_type_name=true
{
    "mappings": {
        "doc": {
            "properties": {
                "@timestamp": {
                    "type": "date"
                },
                "@version": {
                    "type": "keyword"
                },
                "memory": {
                  "type" : "object",
                  "properties": {
                    "peak": {
                      "type": "long"
                    },
                    "usage": {
                      "type": "long"
                    }
                  }
                },
                "action": {
                    "type": "text"
                },
                "host": {
                    "type": "keyword"
                },
                "level": {
                    "type": "keyword"
                },
                "path": {
                    "type": "text"
                },
                "payload": {
                    "type": "text"
                },
                "type": {
                    "type": "keyword"
                }
            }
        }
    },
    "settings": {
        "index.refresh_interval": "5s"
    },
    "index_patterns": "api-*"
}

DELETE _template/template_indexer
PUT _template/template_indexer?include_type_name=true
{
    "mappings": {
        "doc": {
            "properties": {
                "@timestamp": {
                    "type": "date"
                },
                "@version": {
                    "type": "keyword"
                },
                "id": {
                    "type": "text"
                },
                "result": {
                    "type": "text"
                },
                "index": {
                    "type": "text"
                },
                "warnings": {
                    "type": "text"
                },
                "queue": {
                    "type": "keyword"
                },
                "statusCode": {
                    "type": "integer"
                },
                "msg": {
                    "type": "text"
                },
                "time": {
                    "type": "integer"
                }
            }
        }
    },
    "settings": {
        "index.refresh_interval": "5s"
    },
    "index_patterns": "indexer-*"
}
```