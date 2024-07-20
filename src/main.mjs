import { CustomArray } from './models/Array.mjs';
import { LinkedList } from './models/Linkedlist.mjs';
import { renderCharts } from './controllers/script.mjs';

// Cargar el dataset de manera eficiente
async function loadDataset() {
    try {
        const response = await fetch('copia.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let jsonString = '';
        let done = false;

        while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;
            jsonString += decoder.decode(value, { stream: !done });
        }

        // Dividir el contenido en líneas y parsear cada línea como un objeto JSON
        const jsonLines = jsonString.trim().split('\n');
        return jsonLines.map(line => JSON.parse(line));
    } catch (error) {
        console.error('Error loading dataset:', error);
        return [];
    }
}


async function main() {
    const array = new CustomArray();
    const linkedList = new LinkedList();
    const data = await loadDataset();

    // Extraer los valores de interés para el análisis
    const values = data.map(item => item.stars);

    // Inserción de datos
    const arrayInsertTime = measureTime(() => values.forEach(value => array.insert(value)));
    const linkedListInsertTime = measureTime(() => values.forEach(value => linkedList.insert(value)));

    // Búsqueda de datos
    const searchValue = 3.0; // Ejemplo de valor para búsqueda
    const arraySearchTime = measureTime(() => array.linearSearch(searchValue));
    const linkedListSearchTime = measureTime(() => linkedList.linearSearch(searchValue));

    // Ordenamiento de datos
    const arrayBubbleSortTime = measureTime(() => array.bubbleSort());
    const arrayMergeSortTime = measureTime(() => array.mergeSort());
    const linkedListBubbleSortTime = measureTime(() => linkedList.bubbleSort());
    const linkedListMergeSortTime = measureTime(() => linkedList.mergeSort());

    // Ordenamiento con Radix Sort
    const arrayRadixSortTime = measureTime(() => array.radixSort());
    const linkedListRadixSortTime = measureTime(() => linkedList.radixSort());

    // Datos para gráficos
    const insertData = [arrayInsertTime, linkedListInsertTime];
    const searchData = [arraySearchTime, linkedListSearchTime];
    const sortData = {
        times: [
            arrayBubbleSortTime,
            arrayMergeSortTime,
            arrayRadixSortTime,
            linkedListBubbleSortTime,
            linkedListMergeSortTime,
            linkedListRadixSortTime
        ]
    };

    // Renderizar gráficos
    renderCharts(insertData, searchData, sortData);
}

function measureTime(fn) {
    const startTime = performance.now();
    fn();
    const endTime = performance.now();
    return endTime - startTime;
}

main();