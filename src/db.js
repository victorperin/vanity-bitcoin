const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('keys.json');
const db = low(adapter);

db.defaults({ adresses: [] })
  .write();

const saveKey = (key) => {
  const teste = db.get('adresses')
    .push(key)
    .write();

  console.log(teste);
  return teste;
}

module.exports = {
  saveKey,
};
