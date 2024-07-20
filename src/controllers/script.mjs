export function renderCharts(insertData, searchData, sortData) {
    // Configuración del gráfico para tiempos de inserción
    const ctxInsert = document.getElementById('insertChart').getContext('2d');
    new Chart(ctxInsert, {
        type: 'bar',
        data: {
            labels: ['Array', 'LinkedList'],
            datasets: [{
                label: 'Insertion Time (ms)',
                data: insertData,
                backgroundColor: ['#FF6384', '#36A2EB'],
                borderColor: ['#FF6384', '#36A2EB'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Time (ms)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Data Structure'
                    }
                }
            }
        }
    });

    // Configuración del gráfico para tiempos de búsqueda
    const ctxSearch = document.getElementById('searchChart').getContext('2d');
    new Chart(ctxSearch, {
        type: 'bar',
        data: {
            labels: ['Array', 'LinkedList'],
            datasets: [{
                label: 'Search Time (ms)',
                data: searchData,
                backgroundColor: ['#FF6384', '#36A2EB'],
                borderColor: ['#FF6384', '#36A2EB'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Time (ms)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Data Structure'
                    }
                }
            }
        }
    });

    // Configuración del gráfico para tiempos de ordenamiento
    const ctxSort = document.getElementById('sortChart').getContext('2d');
    new Chart(ctxSort, {
        type: 'bar',
        data: {
            labels: ['Bubble Sort (Array)', 'Merge Sort (Array)', 'Bubble Sort (LinkedList)', 'Merge Sort (LinkedList)'],
            datasets: [{
                label: 'Sorting Time (ms)',
                data: sortData.times,
                backgroundColor: ['#FF6384', '#FF9F40', '#36A2EB', '#4BC0C0'],
                borderColor: ['#FF6384', '#FF9F40', '#36A2EB', '#4BC0C0'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Time (ms)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Sorting Algorithm'
                    }
                }
            }
        }
    });
}
