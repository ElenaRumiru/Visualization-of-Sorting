const NUMBERS_COUNT = 100,
    DELAY = 1


// Функция задержки
const delay = async(ms) => await new Promise(resolve => setTimeout(resolve, ms));

// Класс колонки
class Column {
    _number = 0
    _less = false
    _larger = false
    _timerFlash = null
    constructor(container, number) {
        // Создаем новую колонку
        this.column = document.createElement('div'),
            this.line = document.createElement('div'),
            this.lineValue = document.createElement('div'),
            this.infoNumber = document.createElement('span');
            this.arraySize = document.createElement('input');

        this.column.classList.add('chart-column')
        this.line.classList.add('chart-column-line')
        this.lineValue.classList.add('chart-column-value')
        this.infoNumber.classList.add('chart-column-number')


        this.number = number

        this.line.append(this.lineValue)
        this.column.append(this.line)
        container.append(this.column)
    }

    // Установка статуса larger/less
    setStatus(status) {
        this.resetStatus()
        this.column.classList.add(status)
        if (status == 'larger') this.flash()
    }

    // Сброс статусов
    resetStatus() {
        this.column.classList.remove('current')
        this.column.classList.remove('larger')
        this.column.classList.remove('less')
    }

    // Вспышка
    flash() {
        this.column.classList.remove('flash')
        clearTimeout(this._timerFlash)
        this.column.classList.add('flash')
        this._timerFlash = setTimeout(() => {
            this.column.classList.remove('flash')
        }, 1000)
    }

    // Установка номера
    set number(value) {
        this._number = value
        this.lineValue.style.height = (value * 100 / NUMBERS_COUNT) + "%";
        if (NUMBERS_COUNT <= 40) {
            this.infoNumber.textContent = this.number
        }
    }

    // Получение номера
    get number() {
        return this._number
    }
}

function createSortBox(container, sortFunction) {
    // Создаем элементы контейнера
    const chartBox = document.createElement('div'),
        infoBox = document.createElement('div'),
        leftInfo = document.createElement('div'),
        startBtn = document.createElement('button'),
        iterations = document.createElement('div'),
        iterationsCaption = document.createElement('span'),
        arraySize = document.createElement('input'),
        iterationsValue = document.createElement('span'),
        time = document.createElement('div'),

        timeCaption = document.createElement('span'),
        timeValue = document.createElement('span')

    // Добавляем классы
    infoBox.classList.add('info-box')
    chartBox.classList.add('chart-box')
    leftInfo.classList.add('left-info')
    startBtn.classList.add('start-btn')
    iterations.classList.add('iterations', 'info')
    iterationsCaption.classList.add('caption')
    iterationsValue.classList.add('value')
    time.classList.add('time', 'info')
    timeCaption.classList.add('caption')
    timeValue.classList.add('value')
    arraySize.classList.add('array-size')
    arraySize.setAttribute('type', 'number');

    // Добавляем текст
    iterationsCaption.textContent = 'Итераций:'
    iterationsValue.textContent = '0'
    timeCaption.textContent = 'Время сортировки:'
    timeValue.textContent = '0'
    startBtn.textContent = 'Старт'
    arraySize.value = 100;
    // Добавляем элементы в DOM
    iterations.append(iterationsCaption)
    iterations.append(iterationsValue)
    leftInfo.append(startBtn)
    leftInfo.append(iterations)
    leftInfo.append(arraySize)
    infoBox.append(leftInfo)
    time.append(timeCaption)
    time.append(timeValue)
    infoBox.append(time)
    container.append(infoBox)
    container.append(chartBox)
    // arraySize.value = 100;

    // Создаем массив чисел
    const numbers = []
    for (let i = 1; i <= NUMBERS_COUNT; i++) {
        numbers.push(i)
    }
    // Перемешивание массива
    numbers.sort(() => Math.random() - 0.5);
    // Создаем элементы графика
    const columns = [];
    // Настраиваем сетку для графика под нужное кол-во
    chartBox.setAttribute('style', `grid-template-columns: repeat(${NUMBERS_COUNT}, 1fr);`);
    // Добавление колонок
    numbers.forEach(number => {
        columns.push(new Column(chartBox, number))
    });

    // Запуск выполнения
    startBtn.addEventListener('click', function() {
        // Передаем в колбек-функцию параметры
        startBtn.disabled = true
        sortFunction(columns, { iterationsValue, timeValue })
    })
}

// Финал
function finishFlash(columns) {
    for (const column of columns) {
        column.flash()
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Метод пузырька
    createSortBox(document.getElementById('bubble'), async function(columns, { iterationsValue, timeValue }) {
        let startTime = Date.now();

        let interval = setInterval(function() {
            var elapsedTime = Date.now() - startTime;
            timeValue.textContent = (elapsedTime / 1000).toFixed(3);
        }, 100);

        for (let j = columns.length - 1; j > 0; j--) {
            for (let i = 0; i < j; i++) {
                const A = columns[i],
                    B = columns[i + 1];

                A.setStatus('current')
                B.setStatus('current')

                // Задержка
                await delay(DELAY / 2)
                if (A.number > B.number) {
                    // Меняем местами
                    const temp = A.number
                    A.number = B.number
                    B.number = temp

                    B.setStatus('larger')
                    A.setStatus('less')
                } else {
                    A.resetStatus()
                    B.resetStatus()
                }

                // Кол-во итераций
                iterationsValue.textContent++;

                // Задержка
                await delay(DELAY)
            }
        }
        finishFlash(columns)
        clearInterval(interval)
    })


    // Метод выбора
    createSortBox(document.getElementById('choice'), async function(columns, { iterationsValue, timeValue }) {
        let startTime = Date.now();

        let interval = setInterval(function() {
            var elapsedTime = Date.now() - startTime;
            timeValue.textContent = (elapsedTime / 1000).toFixed(3);
        }, 100);

        for (let i = 0, l = columns.length, k = l - 1; i < k; i++) {
            let indexMin = i;
            columns[i].setStatus('current')
            for (let j = i + 1; j < l; j++) {
                columns[j].setStatus('current')

                // Задержка
                await delay(DELAY / 4)
                columns[j].resetStatus();
                if (columns[indexMin].number > columns[j].number) {
                    columns[indexMin].resetStatus();
                    indexMin = j;
                    columns[indexMin].setStatus('less');
                    columns[i].setStatus('current')
                }

                // Кол-во итераций
                iterationsValue.textContent++;
            }
            await delay(DELAY / 4)
            if (indexMin !== i) {
                columns[i].resetStatus()
                columns[indexMin].setStatus('larger');
                [columns[i].number, columns[indexMin].number] = [columns[indexMin].number, columns[i].number];
            }
            columns[indexMin].resetStatus()

            // Задержка
            await delay(DELAY)
            columns[i].resetStatus()
            columns[indexMin].resetStatus()
        }
        finishFlash(columns)
        clearInterval(interval)
    })  
})
