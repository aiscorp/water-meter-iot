# aiscorp/water-meter-iot :hammer:
## Hardware part

Hardware part made by NodeMCU. The NodeMCU programming model is similar to that of Node.js, only in Lua. It is
 asynchronous
 and event-driven. Many
 functions, therefore, have parameters for callback functions.    
 Lua code files are located in the `/lua` folder.


### Board circuit   
The first version of the prototype is assembled on a breadboard for testing. The next 3-4 copies are planned to be
 performed according to the factory.  
 Circuit, schemes and prototype files are located in the `/circuit` folder.  
![Sketch circuit](https://github.com/aiscorp/water-meter-iot/blob/master/nodemcu/circuit/sketch.png)

### NodeMCU firmware
NodeMCU is an open source Lua based firmware for the ESP8266 WiFi SOC.    
[View on Github](https://github.com/nodemcu/nodemcu-firmware)    
[View docs](https://nodemcu.readthedocs.io/en/1.5.4.1-final/)

Firmware based on 3.0 version of NodeMCU with 17 modules and dev mode.     
Modules: `dht,enduser_setup,file,gpio,http,mdns,net,node,rtcfifo,rtcmem,rtctime,sjson,sntp,tmr,uart,wifi,tls`    
Build made by https://nodemcu-build.com/.    
Last build are located in the `/firmware` folder. 

### How code works
Below is the `main.lua` file that is called after the chip is initialized. The code in this file shows the basic
 operation of the device. Additional files implement modules for working with wi-fi, communicating with the server, and so on.

