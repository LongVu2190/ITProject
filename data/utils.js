'use strict';
const fs = require('fs-extra');
const {join} = require('path');

const loadSqlQueries = async (folderName) => {

    const filePath = join(process.cwd(), 'data', folderName);

    const files = await fs.readdir(filePath);

    // Duyệt hết file đuôi .sql
    const sqlFiles = files.filter(f => f.endsWith('.sql'));
    const queries = {};

    // Duyệt hết files trong thư mục 
    for (const sqlfile of sqlFiles) {
        const query = fs.readFileSync(join(filePath, sqlfile), {encoding: "UTF-8"});
        queries[sqlfile.replace(".sql", "")] = query;
    }

    return queries;
}

module.exports = {
    loadSqlQueries
}