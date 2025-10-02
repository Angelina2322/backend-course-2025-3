const { program } = require('commander');
const fs = require('fs');

// -----------------------------
// Налаштування командного рядка
// -----------------------------
program
  .requiredOption('-i, --input <path>', 'Path to input JSON file')
  .option('-o, --output <path>', 'Path to output file')
  .option('-d, --display', 'Display result in console')
  .option('-h, --humidity', 'Display Humidity3pm')
  .option('-r, --rainfall <value>', 'Filter records by Rainfall > value', parseFloat)
  .parse(process.argv);

const options = program.opts();

// -----------------------------
// Перевірка обов'язкового параметра
// -----------------------------
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

let data;
try {
  const raw = fs.readFileSync(options.input);
  data = JSON.parse(raw);
} catch (err) {
  console.error('Cannot find input file');
  process.exit(1);
}

// -----------------------------
// Формування результату
// -----------------------------
const display = options.display;
const outputPath = options.output;
const showHumidity = options.humidity;
const minRainfall = options.rainfall;

let result = '';

data.forEach(record => {
  // Фільтр за опадами, якщо задано
  if (minRainfall !== undefined && record.Rainfall <= minRainfall) return;

  let line = `${record.Rainfall} ${record.Pressure3pm}`;
  if (showHumidity) line += ` ${record.Humidity3pm}`;

  result += line + '\n';
});

// -----------------------------
// Вивід результату
// -----------------------------
if (display && result) console.log(result);

// Запис у файл, якщо задано
if (outputPath && result) {
  try {
    fs.writeFileSync(outputPath, result);
    console.log(`Result saved to ${outputPath}`);
  } catch (err) {
    console.error('Error writing output file:', err.message);
  }
}

// Якщо не задано жодного необов’язкового параметра - нічого не виводимо
