FROM ruby

RUN apt-get update -qq \
  && apt-get install -y nodejs libpq-dev build-essential tree nodejs \
  && apt-get clean autoclean && apt-get autoremove -y \
  && rm -rf /var/lib/apt /var/lib/dpkg /var/lib/cache /var/lib/log

RUN npm install --global yarn

WORKDIR /app
ADD Gemfile /app/
ADD Gemfile.lock  /app/
RUN bundle install

COPY . /app
RUN bundle exec rake assets:precompile \
  && rm -rf /app/tmp/cache/assets/

EXPOSE 3000
CMD bin/rails s
