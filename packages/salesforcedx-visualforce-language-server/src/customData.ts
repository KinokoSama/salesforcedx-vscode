/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See OSSREADME.json in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as fs from 'fs';
import {
  HTMLDataProvider,
  IHTMLDataProvider
} from 'vscode-html-languageservice';

export function getDataProviders(dataPaths?: string[]): IHTMLDataProvider[] {
  if (!dataPaths) {
    return [];
  }

  const providers: IHTMLDataProvider[] = [];

  dataPaths.forEach((path, i) => {
    try {
      if (fs.existsSync(path)) {
        const htmlData = JSON.parse(fs.readFileSync(path, 'utf-8'));

        providers.push(new HTMLDataProvider(`customProvider${i}`, htmlData));
      }
    } catch (err) {
      console.log(`Failed to load tag from ${path}`);
    }
  });

  return providers;
}
