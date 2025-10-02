const { program } = require('commander');
const fs = require('fs');

// Налаштовуємо параметри командного рядка
program
  .requiredOption('-i, --input <path>', 'Path to input JSON file')  // обовʼязковий параметр
  .option('-o, --output <path>', 'Path to output file')             // необовʼязковий параметр
  .option('-d, --display', 'Display result in console')             // необовʼязковий прапорець
  .parse(process.argv);

// Отримуємо значення аргументів
const options = program.opts();
const inputPath = options.input;
const outputPath = options.output;
const display = options.display;

// Читаємо JSON-файл
let data;
try {
  const raw = fs.readFileSync(inputPath);
  data = JSON.parse(raw);
} catch (err) {
  console.error('Error reading input file:', err.message);
  process.exit(1);
}

// Тут можна обробити data і отримати результат
const result = JSON.stringify(data, null, 2); // просто форматування JSON як приклад

// Вивід результату
if (display) {
  console.log(result);
}

// Запис у файл, якщо задано output
if (outputPath) {
  try {
    fs.writeFileSync(outputPath, result);
    console.log(`Result saved to ${outputPath}`);
  } catch (err) {
    console.error('Error writing output file:', err.message);
  }
}

