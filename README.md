<a name="contents"></a>

## Вычислитель отличий

[difference-calculator]: https://github.com/aleonaos/frontend-project-lvl2 'Difference-calculator'

---

### Hexlet tests and linter status:

[![Actions Status](https://github.com/aleonaos/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/aleonaos/frontend-project-lvl2/actions)
[![Node CI](https://github.com/aleonaos/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/aleonaos/frontend-project-lvl2/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/72b54ed519889b6fe954/maintainability)](https://codeclimate.com/github/aleonaos/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/72b54ed519889b6fe954/test_coverage)](https://codeclimate.com/github/aleonaos/frontend-project-lvl2/test_coverage)

---

Вычислитель отличий - программа, определяющая различия между двумя структурами данных.

##### Возможности утилиты:

- Поддержка разных форматов ввода: yaml, json.
- Формирование отчёта в форматах: plain text, stylish, json.

Стек: _JS, Node.js, commander, filesystem, lodash, Jest, ESLint, make, npm, Git, GitHub Actions (CI), CodeClimate_.

Основные задачи проекта:

- [x] Функциональное программирование.
- [x] Создание архитектуры приложения.
- [x] Работа с параматерами командной строки.
- [x] Написание автоматизированных тестов.

---

### Установка

```
$ make install
```

---

### Примеры использования.

#### Поиск отличий между двумя плоскими файлами(.json или .yml).

![Alt Text](https://github.com/aleonaos/frontend-project-lvl2/blob/main/src/examples/gendiff_flat_files.gif?raw=true)

---

### Доступны различные типы ввода

##### Stylish (по умолчанию)

![Alt Text](https://github.com/aleonaos/frontend-project-lvl2/blob/main/src/examples/gendiff_nested_files.gif?raw=true)

##### Plain

![Alt Text](https://github.com/aleonaos/frontend-project-lvl2/blob/main/src/examples/to_plain_format.gif?raw=true)

##### JSON

![Alt Text](https://github.com/aleonaos/frontend-project-lvl2/blob/main/src/examples/gendiff_json_format.gif?raw=true)

---
