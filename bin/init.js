#!/usr/bin/env node

'use strict';

const fs = require('fs-extra');
const path = require('path');

function copyFilesRecursive(sourceDir, destinationDir) {
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir);

  files.forEach(file => {
    const sourceFile = path.join(sourceDir, file);
    const destinationFile = path.join(destinationDir, file);

    if (fs.lstatSync(sourceFile).isDirectory()) {
      copyFilesRecursive(sourceFile, destinationFile); // 递归复制子目录中的文件和文件夹
    } else {
      fs.copyFileSync(sourceFile, destinationFile); // 复制单个文件
    }
  });

  console.log('所有文件复制完成。');
}

copyFilesRecursive(path.resolve(__dirname, '../patches'), path.resolve('./patches'));
