// Aide des tests outils.js et outils-moteur.js (pas un test) : lit un zip « stocké » (méthode 0) octet par octet, sans
// bibliothèque, à partir de son répertoire central. Renvoie { nom: { methode, crc, data } } ou lève une erreur.
module.exports = function lireZip(buf) {
  let e = buf.length - 22;
  while (e >= 0 && buf.readUInt32LE(e) !== 0x06054b50) e--;
  if (e < 0) throw new Error('fin du zip introuvable');
  const n = buf.readUInt16LE(e + 10), res = {};
  let p = buf.readUInt32LE(e + 16);
  for (let k = 0; k < n; k++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('répertoire central abîmé');
    const methode = buf.readUInt16LE(p + 10), crc = buf.readUInt32LE(p + 16), taille = buf.readUInt32LE(p + 20);
    const ln = buf.readUInt16LE(p + 28), lx = buf.readUInt16LE(p + 30), lc = buf.readUInt16LE(p + 32), pos = buf.readUInt32LE(p + 42);
    const nom = buf.slice(p + 46, p + 46 + ln).toString('utf8');
    if (buf.readUInt32LE(pos) !== 0x04034b50) throw new Error('entête locale abîmée : ' + nom);
    if (buf.readUInt32LE(pos + 18) !== taille || buf.readUInt32LE(pos + 14) !== crc) throw new Error('entête locale différente du répertoire : ' + nom);
    const debut = pos + 30 + buf.readUInt16LE(pos + 26) + buf.readUInt16LE(pos + 28);
    res[nom] = { methode, crc, data: buf.slice(debut, debut + taille) };
    p += 46 + ln + lx + lc;
  }
  return res;
};
