class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

export class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Nodo de la lista enlazada

    // Insertar al final de la lista
    insert(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    // Búsqueda lineal
    linearSearch(value) {
        let current = this.head;
        while (current) {
            if (current.data === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    // Bubble Sort (ordenamiento)
    bubbleSort() {
        if (this.size <= 1) return;
        let swapped;
        do {
            swapped = false;
            let current = this.head;
            while (current && current.next) {
                if (current.data > current.next.data) {
                    [current.data, current.next.data] = [current.next.data, current.data];
                    swapped = true;
                }
                current = current.next;
            }
        } while (swapped);
    }

    // Merge Sort (ordenamiento)
    mergeSort() {
        this.head = this.mergeSortRec(this.head);
    }

    mergeSortRec(head) {
        if (!head || !head.next) return head;

        const middle = this.getMiddle(head);
        const nextToMiddle = middle.next;
        middle.next = null;

        const left = this.mergeSortRec(head);
        const right = this.mergeSortRec(nextToMiddle);

        return this.merge(left, right);
    }

    getMiddle(head) {
        if (!head) return head;
        let slow = head;
        let fast = head.next;
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    merge(left, right) {
        if (!left) return right;
        if (!right) return left;

        if (left.data < right.data) {
            left.next = this.merge(left.next, right);
            return left;
        } else {
            right.next = this.merge(left, right.next);
            return right;
        }
    }

    // Radix Sort (ordenamiento)
    radixSort() {
        if (this.size <= 1) return;
        const max = this.getMax();
        let exp = 1;
        while (Math.floor(max / exp) > 0) {
            this.countSort(exp);
            exp *= 10;
        }
    }

    getMax() {
        let max = this.head.data;
        let current = this.head.next;
        while (current) {
            if (current.data > max) max = current.data;
            current = current.next;
        }
        return max;
    }

    countSort(exp) {
        const output = new Array(this.size);
        const count = new Array(10).fill(0);

        let current = this.head;
        while (current) {
            const index = Math.floor(current.data / exp) % 10;
            count[index]++;
            current = current.next;
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        current = this.head;
        while (current) {
            const index = Math.floor(current.data / exp) % 10;
            output[count[index] - 1] = current.data;
            count[index]--;
            current = current.next;
        }

        let i = 0;
        current = this.head;
        while (current) {
            current.data = output[i++];
            current = current.next;
        }
    }
}
