const { program } = require('commander');
const fs = require('fs');

// -----------------------------
// Налаштування параметрів командного рядка
// -----------------------------
program
  .option('-i, --input <path>', 'Path to input JSON file')   // обовʼязковий параметр перевіримо вручну
  .option('-o, --output <path>', 'Path to output file')       // необовʼязковий параметр
  .option('-d, --display', 'Display result in console')       // необовʼязковий прапорець
  .parse(process.argv);

const options = program.opts();
const inputPath = options.input;
const outputPath = options.output;
const display = options.display;

// -----------------------------
// Перевірка обовʼязкового параметра
// -----------------------------
if (!inputPath) {
  console.error('Please, specify input file');
  process.exit(1);
}

// -----------------------------
// Читання JSON-файлу
// -----------------------------
let data;
try {
  const raw = fs.readFileSync(inputPath);
  data = JSON.parse(raw);
} catch (err) {
  console.error('Cannot find input file');
  process.exit(1);
}

// -----------------------------
// Обробка даних (приклад: просто форматування JSON)
// -----------------------------
const result = JSON.stringify(data, null, 2);

// -----------------------------
// Вивід результату у консоль, якщо задано прапорець -d
// -----------------------------
if (display) {
  console.log(result);
}

// -----------------------------
// Запис результату у файл, якщо задано -o
// -----------------------------
if (outputPath) {
  try {
    fs.writeFileSync(outputPath, result);
    // Якщо не виводимо в консоль, виводимо повідомлення про збереження
    if (!display) {
      console.log(`Result saved to ${outputPath}`);
    }
  } catch (err) {
    console.error('Error writing output file:', err.message);
  }
}
