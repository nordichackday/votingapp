FROM node:0.12.7-onbuild

MAINTAINER Øyvind Holmstad

RUN echo "Europe/Oslo" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata
