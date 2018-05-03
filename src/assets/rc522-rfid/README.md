#rc522-rfid
node.js module to access a rfid reader with rc522 chipset which is connected a raspberry pi

## Warning
The library work with RPI v1 only. It is based on bcm2835 module. The RIPv2 has different addresses.
```
On RPI 2, the peripheral addresses are different and the bcm2835 library gets them from reading /proc/device-tree/soc/ranges. This is only availble with recent versions of the kernel on RPI 2.
```
Source: http://www.airspayce.com/mikem/bcm2835/
Issue: https://github.com/sbrinkmann/rc522-rfid/issues/2

## Purpose
This node module is to access RFID reader with a rc522 chipset (e.g. http://amzn.com/B00GYR1KJ8) via GPIO interface of the raspberry pi.

## Functionality
The module is currently only able to read the serial number of the tag which is hold onto the reader.

## Requirements
- The RFID reader is plugged onto the raspberry pi like it is described over here http://geraintw.blogspot.de/2014/01/rfid-and-raspberry-pi.html
- The GCC compiler is installed ```sudo apt-get install build-essential```
- node-gyp is installed ```npm install -g node-gyp```

## Installation
First of all we have to install the C library for Broadcom BCM 2835 as it describe` here
```
wget http://www.airspayce.com/mikem/bcm2835/bcm2835-1.35.tar.gz
tar -zxf bcm2835-1.35.tar.gz
cd bcm2835-1.35
./configure
sudo make install
```
Then we can install the rc522 rfid nodejs module
```
npm install --save rc522-rfid
```

## Usage
```
var rc522 = require("rc522-rfid");

rc522(function(rfidSerialNumber){
	console.log(rfidSerialNumber);
});
```
