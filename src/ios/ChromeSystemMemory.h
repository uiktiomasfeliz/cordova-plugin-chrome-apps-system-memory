// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#import <Cordova/CDVPlugin.h>


@interface ChromeSystemMemory : CDVPlugin

- (void)getInfo:(CDVInvokedUrlCommand*)command;
- (void)getCurrentInfo: (CDVInvokedUrlCommand*)command;

@end
