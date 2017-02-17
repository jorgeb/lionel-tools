﻿// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var currentSpreadId = '';


/**
 * Sample implementation of the function called when this script
 * is invoked as a web app.
 * @return {String} HTML as string for Apps Script to render.
 */
function doGet(e) {
    var html = HtmlService.createTemplateFromFile('home.view');
    currentSpreadId = e.parameter.spread;

    if (e.parameter.page) {
        // When no specific page requested, return "home page"
        html = HtmlService.createTemplateFromFile(e.parameter.page);
    }
    
    html.mode = 'web';

    return html.evaluate();
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}

function getAppUrl() {
    return ScriptApp.getService().getUrl();
}
