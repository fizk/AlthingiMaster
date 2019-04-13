FROM logstash:6.7.0

# Remove default pipeline
RUN rm -f /usr/share/logstash/pipeline/logstash.conf

# Add custom GROK patterns
ADD ./patterns/custom-patterns /etc/logstash/conf.d/patterns/custom-patterns

# Add new pipelines
ADD ./pipelines/combined.conf /usr/share/logstash/pipeline/combined.conf

# Installing Logstash plugins
RUN logstash-plugin install logstash-filter-bytes
RUN logstash-plugin install logstash-filter-multiline
RUN logstash-plugin install logstash-filter-json_encode