FROM ruby:2.5.1

RUN apt-get update && \
  apt-get install -y mysql-client nodejs vim --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

RUN mkdir /app

WORKDIR /app

ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock

RUN gem install bundler
RUN bundle install

ADD . /app