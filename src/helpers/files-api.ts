/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/* exported getFileHandle, getNewFileHandle, readFile, writeFile */

/**
 * Open a handle to an existing file on the local file system.
 *
 * @return {!Promise<FileSystemFileHandle>} Handle to the existing file.
 */
export function getFileHandle() {
  const handle = (window as any).chooseFileSystemEntries();
  return handle;
}

/**
 * Create a handle to a new file on the local file system.
 *
 * @return {!Promise<FileSystemFileHandle>} Handle to the new file.
 */
export function getNewFileHandle() {
  const opts = {
    type: 'saveFile',
    accepts: [{
      description: 'Image file',
      extensions: ['jpg', 'png']
    }],
  };
  const handle = (window as any).chooseFileSystemEntries(opts);
  return handle;
}

/**
 * Reads the raw text from a file.
 *
 * @param {FileSystemFileHandle} fileHandle
 * @return {!Promise<string>} A promise that resolves to the parsed string.
 */
export async function readFile(fileHandle) {
  const file = await fileHandle.getFile();
  return await _readFileLegacy(file);
}

/**
 * Reads the raw text from a file.
 *  Note, used for Chrome 77 and later where .text() is supported.
 *
 * @private
 * @param {File} file
 * @return {Promise<string>} A promise that resolves to the parsed string.
 */
export function _readFileBlob(file) {
  const result = file.blob();
  return result;
}

/**
 * Reads the raw text from a file.
 *  Note, used for Chrome 76 and earlier with the the old FileReader API.
 *
 * @private
 * @param {File} file
 * @return {Promise<string>} A promise that resolves to the parsed string.
 */
export function _readFileLegacy(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      const text = (e.srcElement as any).result;
      resolve(text);
    });
    reader.readAsDataURL(file);
  });
}

/**
 * Writes the contents to disk.
 *
 * @param {FileSystemFileHandle} fileHandle File handle to write to.
 * @param {string} contents Contents to write.
 */
export async function writeFile(fileHandle, contents) {
  // Create a writer
  const writer = await fileHandle.createWriter();
  // Make sure we start with an empty file
  await writer.truncate(0);
  // Write the full length of the contents
  await writer.write(0, contents);
  // Close the file and write the contents to disk
  await writer.close();
}