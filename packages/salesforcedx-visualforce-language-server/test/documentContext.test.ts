/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See OSSREADME.json in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as assert from 'assert';
import { getDocumentContext } from '../src/utils/documentContext';

// tslint:disable:only-arrow-functions
suite('HTML Document Context', () => {
  test('Context', function(): any {
    const docURI = 'file:///users/test/folder/test.html';
    const rootFolders = [{ name: '', uri: 'file:///users/test/' }];

    const context = getDocumentContext(docURI, rootFolders);
    assert.equal(context.resolveReference('/', docURI), 'file:///users/test/');
    assert.equal(
      context.resolveReference('/message.html', docURI),
      'file:///users/test/message.html'
    );
    assert.equal(
      context.resolveReference('message.html', docURI),
      'file:///users/test/folder/message.html'
    );
    assert.equal(
      context.resolveReference('message.html', 'file:///users/test/'),
      'file:///users/test/message.html'
    );
  });
});
