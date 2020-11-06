#!/bin/bash
echo "Starting deploy.."
cd /var/www/ais-code.ru/
sudo -u www-data rm -rf ./water-meter-iot/
sudo -u www-data pm2 delete server
sudo -u www-data git clone https://github.com/aiscorp/water-meter-iot
sudo -u www-data cp -a ./water-meter-iot/server/. ./
sudo -u www-data npm i
sudo -u www-data pm2 start npm -n server -- start -l log.txt
echo "Deploy finished"
