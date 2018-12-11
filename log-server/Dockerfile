FROM sebp/elk:642

# overwrite existing file
ADD ./pipelines/30-output.conf /etc/logstash/conf.d/30-output.conf

# add new file
ADD ./pipelines/aggregator-pipeline.conf /etc/logstash/conf.d/aggregator-pipeline.conf
ADD ./pipelines/apache-pipeline.conf /etc/logstash/conf.d/apache-pipeline.conf
ADD ./pipelines/api-pipeline.conf /etc/logstash/conf.d/api-pipeline.conf
ADD ./pipelines/graphql-pipeline.conf /etc/logstash/conf.d/graphql-pipeline.conf
ADD ./pipelines/mysql-pipeline.conf /etc/logstash/conf.d/mysql-pipeline.conf
ADD ./patterns/custom-patterns /etc/logstash/conf.d/patterns/custom-patterns

# Installing Elasticsearch plugins
ENV ES_HOME /opt/elasticsearch
WORKDIR ${ES_HOME}

RUN CONF_DIR=/etc/elasticsearch gosu elasticsearch bin/elasticsearch-plugin \
    install -b ingest-geoip

RUN echo "vm.max_map_count=262144" >> /etc/sysctl.conf

# Installing Logstash plugins
WORKDIR ${LOGSTASH_HOME}
RUN gosu logstash bin/logstash-plugin install logstash-filter-bytes
RUN gosu logstash bin/logstash-plugin install logstash-filter-multiline
RUN gosu logstash bin/logstash-plugin install logstash-filter-json_encode