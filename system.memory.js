/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

var argscheck = require('cordova/argscheck');
var channel = require('cordova/channel');
var exec = require('cordova/exec');

channel.createSticky('onSystemInfoReady');
// Tell cordova channel to wait on the CordovaInfoReady event
channel.waitForInitialization('onSystemInfoReady');

/**
 * This represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
function SystemMemory () {
    this.available = false;
    
    this.availableCapacity = null;
    this.capacity = null;

    this.consumedCapacity = null;
    this.totalCapacity = null;

    var me = this;

    channel.onCordovaReady.subscribe(function () {
        me.getInfo(
            function (info) {
                // ignoring info.cordova returning from native, we should use value from cordova.version defined in cordova.js
                // TODO: CB-5105 native implementations should not return info.cordova
                me.available = true;
                me.availableCapacity = info.availableCapacity;
                me.capacity = info.capacity;
               
                channel.onSystemInfoReady.fire();
            },
            function (e) {
                me.available = false;
                console.error('[ERROR] Error initializing cordova-plugin-system-memory: ' + e);
            }
        );
    });
}

/**
 * Get info
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
SystemMemory.prototype.getInfo = function (successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'SystemMemory.getInfo', arguments);
    exec(successCallback, errorCallback, 'SystemMemory', 'getInfo', []);
};

/**
 * Get current info
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
SystemMemory.prototype.getCurrentInfo = function (successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'SystemMemory.getCurrentInfo', arguments);
    exec(successCallback, errorCallback, 'SystemMemory', 'getCurrentInfo', []);
};

module.exports = new SystemMemory();
