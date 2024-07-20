export class CustomArray {
    constructor() {
        this.array = [];
    }

    insert(value) {
        this.array.push(value);
    }

    linearSearch(value) {
        const index = this.array.indexOf(value);
        return index !== -1 ? this.array[index] : null;
    }

    bubbleSort() {
        let iterations = 0;
        for (let i = 0; i < this.array.length - 1; i++) {
            for (let j = 0; j < this.array.length - 1 - i; j++) {
                iterations++;
                if (this.array[j] > this.array[j + 1]) {
                    [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
                }
            }
        }
        return iterations;
    }

    mergeSort(array = this.array) {
        if (array.length < 2) return array;
        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);
        return this.merge(this.mergeSort(left), this.mergeSort(right));
    }

    merge(left, right) {
        let result = [];
        while (left.length && right.length) {
            if (left[0] < right[0]) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }
        return result.concat(left, right);
    }

    radixSort() {
        const getMax = () => Math.max(...this.array);
        const countingSort = (exp) => {
            const output = new Array(this.array.length);
            const count = new Array(10).fill(0);
            
            for (let i = 0; i < this.array.length; i++) {
                count[Math.floor(this.array[i] / exp) % 10]++;
            }
            
            for (let i = 1; i < 10; i++) {
                count[i] += count[i - 1];
            }
            
            for (let i = this.array.length - 1; i >= 0; i--) {
                output[count[Math.floor(this.array[i] / exp) % 10] - 1] = this.array[i];
                count[Math.floor(this.array[i] / exp) % 10]--;
            }
            
            for (let i = 0; i < this.array.length; i++) {
                this.array[i] = output[i];
            }
        };

        const max = getMax();
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            countingSort(exp);
        }
    }
}
