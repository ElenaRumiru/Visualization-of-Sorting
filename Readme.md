DEMO-VISUALISATION: https://elenarumiru.github.io/Visualization-of-Sorting/

#### Визуализация алгоритмов сортировки пузырьком и выбором
Создано Румянцевой Еленой в 2023 году
с помощью Youtube-канала Александра Дудукало

Позже: добавлю все остальные методы сортировки благодаря сотруднечеству с автором канала.

### 1. Описание проекта
Визуализация алгоритмов сортировки методов пузырьком и выбором.
Количество элементов массива задается первой строкой в файле main.js при помощи глобальной переменной NUMBERS_COUNT. 
Для наглядности количество элементов было уменьшено до 100.
Данное значение можно изменить при желании.

### 2. Структура работы
- index.html - главная страница игры.
- style.css - стилизация страницы.
- main.js - скрипт сортировки и ее визуализации.


### 3. Особенности
Элементы создаются через javascript  c помощью класса Column и функции createSortBox.
В HTMLL создается лишь контейнеры, равные количеству визуализированных методов сортировки.
Итерируемые элементы подсвечиваются за счет присваивания определенных CSS классов с анимацией вспышек.

Важно: для эффектов анимации была добавлена задержка, поэтому скорость выполнения сортировки не является чистой скоростью сортировки!

### 3. Авторские права
Автором анимации является Александр Дудукало.
