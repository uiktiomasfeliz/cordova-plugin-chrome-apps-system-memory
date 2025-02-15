// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package org.apache.cordova.systemmemory;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.ActivityManager.MemoryInfo;
import android.os.Build;
import android.os.Debug;
import android.util.Log;

public class SystemMemory extends CordovaPlugin {
    private static final String LOG_TAG = "SystemMemory";

    private ActivityManager activityManager;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        Activity activity = cordova.getActivity();
        activityManager = (ActivityManager) activity.getSystemService(Activity.ACTIVITY_SERVICE);
    }

    @Override
    public boolean execute(String action, CordovaArgs args, final CallbackContext callbackContext) throws JSONException {
        if ("getInfo".equals(action)) {
            getInfo(args, callbackContext);
            return true;
        }
        else if ("getCurrentInfo".equals(action)) {
            getCurrentInfo(args, callbackContext);
            return true;
        }
        return false;
    }

    private void getInfo(final CordovaArgs args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject ret = new JSONObject();
                    MemoryInfo memoryInfo = new MemoryInfo();
                    activityManager.getMemoryInfo(memoryInfo);

                    ret.put("availableCapacity", memoryInfo.availMem);
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
                        ret.put("capacity", memoryInfo.totalMem);
                    }

                    callbackContext.success(ret);
                } catch (Exception e) {
                    Log.e(LOG_TAG, "Error occured while getting memory info", e);
                    callbackContext.error("Could not get memory info");
                }
            }
        });
    }

    private long getMemoryFootprint() {
        Debug.MemoryInfo memInfo = new Debug.MemoryInfo();
        Debug.getMemoryInfo(memInfo);
        long res = memInfo.getTotalPrivateDirty();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT)
            res += memInfo.getTotalPrivateClean();
        return res * 1024L;
    }

    private void getCurrentInfo(final CordovaArgs args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject ret = new JSONObject();
                    MemoryInfo memoryInfo = new MemoryInfo();
                    activityManager.getMemoryInfo(memoryInfo);
                    long consumedCapacity = getMemoryFootprint();
                    ret.put("consumedCapacity", consumedCapacity);
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
                        ret.put("totalCapacity", memoryInfo.totalMem);
                    }
                    callbackContext.success(ret);
                } catch (Exception e) {
                    Log.e(LOG_TAG, "Error occured while getting memory info", e);
                    callbackContext.error("Could not get memory info");
                }
            }
        });
    }
}
