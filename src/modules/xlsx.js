import xlsx from 'xlsx';

export function parseJson(file) {
  const data = xlsx.read(file, { type: 'binary' });
  const ws = data.Sheets[data.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(ws, { header: 1 });

  const headers = rows[0];

  rows.splice(0, 1);

  const result = [];
  rows.forEach((row) => {
    const item = {};
    row.forEach((v, i) => {
      item[headers[i]] = v;
    });
    result.push(item);
  });

  return result;
}

export function loadFromFile(file, callback) {
  const reader = new FileReader();

  reader.onload = ({ target: { result } }) => callback(parseJson(result));

  reader.readAsBinaryString(file);
}
