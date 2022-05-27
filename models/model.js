module.exports = model = {
    
    getAllElements: (table = '') => `SELECT * FROM ${table}`,

    getOneElement: (table = '', row = '', value = '') => `SELECT * FROM ${table} WHERE ${row} = '${value}'`,
    
    insertElement: (table = '', values = []) => {
       `INSERT INTO ${table} VALUES (${values})` }
}
