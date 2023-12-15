
// Selection Sort 

function selectionSort(arr) {
    const length = arr.length;
    for (let i = 0; i < length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = selectionSort(array);
console.log("Sorted Array:", sortedArray);


// Insertion Sort

function insertionSort(arr) {
    const length = arr.length;
    for (let i = 1; i < length; i++) {
        let current = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = current;
    }
    return arr;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = insertionSort(array);
console.log("Sorted Array:", sortedArray);


//  Binary Insertion Sort

function binarySearch(arr, item, low, high) {
    if (high <= low) {
        return (item > arr[low]) ? (low + 1) : low;
    }

    const mid = Math.floor((low + high) / 2);

    if (item === arr[mid]) {
        return mid + 1;
    }

    if (item > arr[mid]) {
        return binarySearch(arr, item, mid + 1, high);
    }

    return binarySearch(arr, item, low, mid - 1);
}

function binaryInsertionSort(arr) {
    const length = arr.length;
    for (let i = 1; i < length; i++) {
        const selected = arr[i];
        let j = i - 1;

        const position = binarySearch(arr, selected, 0, j);

        while (j >= position) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = selected;
    }
    return arr;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = binaryInsertionSort(array);
console.log("Sorted Array:", sortedArray);

//  Merge Sort

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = mergeSort(array);
console.log("Sorted Array (Merge Sort):", sortedArray);


//  Quick Sort (Left to Right Pointers)
function quickSortLR(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
    }

    return [...quickSortLR(left), pivot, ...quickSortLR(right)];
}

// Example usage:
const arrayLR = [64, 25, 12, 22, 11];
console.log("Original Array:", arrayLR);
const sortedArrayLR = quickSortLR(arrayLR);
console.log("Sorted Array (Quick Sort - LR):", sortedArrayLR);


function quickSortTernaryLR(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        let { low, high } = partitionTernaryLR(arr, left, right);

        quickSortTernaryLR(arr, left, low - 1);
        quickSortTernaryLR(arr, high + 1, right);
    }
    return arr;
}

// Quick Sort (ternary, LR ptrs)

function partitionTernaryLR(arr, left, right) {
    const pivot = arr[left];
    let low = left;
    let high = right;
    let i = left + 1;

    while (i <= high) {
        if (arr[i] < pivot) {
            swap(arr, i, low);
            low++;
            i++;
        } else if (arr[i] > pivot) {
            swap(arr, i, high);
            high--;
        } else {
            i++;
        }
    }

    return { low, high };
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = quickSortTernaryLR(array);
console.log("Sorted Array (Quick Sort - Ternary, LR):", sortedArray);


//Quick Sort (dual pivot)

function quickSortDualPivot(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        if (arr[low] > arr[high]) {
            swap(arr, low, high);
        }

        let pivot1 = arr[low];
        let pivot2 = arr[high];

        let left = low + 1;
        let right = high - 1;
        let i = low + 1;

        while (i <= right) {
            if (arr[i] < pivot1) {
                swap(arr, i, left);
                left++;
            } else if (arr[i] >= pivot2) {
                while (arr[right] > pivot2 && i < right) {
                    right--;
                }
                swap(arr, i, right);
                right--;

                if (arr[i] < pivot1) {
                    swap(arr, i, left);
                    left++;
                }
            }
            i++;
        }

        left--;
        right++;

        swap(arr, low, left);
        swap(arr, high, right);

        quickSortDualPivot(arr, low, left - 1);
        quickSortDualPivot(arr, left + 1, right - 1);
        quickSortDualPivot(arr, right + 1, high);
    }
    return arr;
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = quickSortDualPivot(array);
console.log("Sorted Array (Quick Sort - Dual Pivot):", sortedArray);


//buble_sort

function bubbleSort(arr) {
    const length = arr.length;

    for (let i = 0; i < length - 1; i++) {
        let swapped = false;

        for (let j = 0; j < length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements if they are in the wrong order
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }

        // If no two elements were swapped in the inner loop, the array is already sorted
        if (!swapped) {
            break;
        }
    }

    return arr;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = bubbleSort(array);
console.log("Sorted Array (Bubble Sort):", sortedArray);

// Cocktail Shaker Sort

function cocktailShakerSort(arr) {
    let left = 0;
    let right = arr.length - 1;
    let swapped = true;

    while (swapped) {
        swapped = false;

        // Forward pass similar to Bubble Sort
        for (let i = left; i < right; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap elements if they are in the wrong order
                const temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        right--;

        if (!swapped) {
            break;
        }

        swapped = false;

        // Backward pass
        for (let j = right; j > left; j--) {
            if (arr[j] < arr[j - 1]) {
                // Swap elements if they are in the wrong order
                const temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
                swapped = true;
            }
        }
        left++;
    }

    return arr;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = cocktailShakerSort(array);
console.log("Sorted Array (Cocktail Shaker Sort):", sortedArray);


//Gnome sort
function gnomeSort(arr) {
    let index = 0;

    while (index < arr.length) {
        if (index === 0 || arr[index] >= arr[index - 1]) {
            index++;
        } else {
            // Swap elements if they are in the wrong order
            const temp = arr[index];
            arr[index] = arr[index - 1];
            arr[index - 1] = temp;
            index--;
        }
    }

    return arr;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = gnomeSort(array);
console.log("Sorted Array (Gnome Sort):", sortedArray);


//Comb Sort


function combSort(arr) {
    const length = arr.length;
    let gap = length;
    let swapped = true;

    while (gap > 1 || swapped) {
        // Calculate the gap using a shrink factor of 1.3
        gap = Math.floor(gap / 1.3);

        if (gap < 1) {
            gap = 1;
        }

        swapped = false;

        for (let i = 0; i + gap < length; i++) {
            if (arr[i] > arr[i + gap]) {
                // Swap elements if they are in the wrong order
                const temp = arr[i];
                arr[i] = arr[i + gap];
                arr[i + gap] = temp;
                swapped = true;
            }
        }
    }

    return arr;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = combSort(array);
console.log("Sorted Array (Comb Sort):", sortedArray);


//Shell Sort

function shellSort(arr) {
    const length = arr.length;
    let gap = Math.floor(length / 2);

    while (gap > 0) {
        for (let i = gap; i < length; i++) {
            const temp = arr[i];
            let j = i;

            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }

            arr[j] = temp;
        }

        gap = Math.floor(gap / 2);
    }

    return arr;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = shellSort(array);
console.log("Sorted Array (Shell Sort):", sortedArray);


// Heap Sort

function heapSort(arr) {
    buildMaxHeap(arr);

    for (let i = arr.length - 1; i > 0; i--) {
        // Swap the root (maximum value) of the heap with the last element
        swap(arr, 0, i);

        // Reduce the size of the heap and heapify the root element
        heapify(arr, 0, i);
    }

    return arr;
}

function buildMaxHeap(arr) {
    const length = arr.length;
    for (let i = Math.floor(length / 2); i >= 0; i--) {
        heapify(arr, i, length);
    }
}

function heapify(arr, index, size) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let largest = index;

    if (left < size && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < size && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== index) {
        swap(arr, index, largest);
        heapify(arr, largest, size);
    }
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = heapSort(array);
console.log("Sorted Array (Heap Sort):", sortedArray);


//Smooth Sort

function smoothSort(arr) {
    // Function to find Leonardo number sequence
    function leonardo(i) {
        if (i === 0 || i === 1) {
            return 1;
        } else {
            return leonardo(i - 1) + leonardo(i - 2) + 1;
        }
    }

    // Function to sift down an element in heap
    function siftDown(start, end) {
        let root = start;
        while ((2 * root + 1) <= end) {
            let child = 2 * root + 1;
            let swap = root;

            if (arr[swap] < arr[child]) {
                swap = child;
            }

            if (child + 1 <= end && arr[swap] < arr[child + 1]) {
                swap = child + 1;
            }

            if (swap !== root) {
                [arr[root], arr[swap]] = [arr[swap], arr[root]];
                root = swap;
            } else {
                return;
            }
        }
    }

    // Build the initial Leonardo heap
    let len = arr.length;
    let last = -1;
    let next = 1;
    let i = 0;

    while (i < len) {
        if (arr[i] === undefined) {
            arr[i] = Infinity;
        }
        if (i === next - 1) {
            siftDown(last, i);
            last = i;
            next *= 2;
        } else {
            next = leonardo(++i);
        }
    }

    // Perform smooth sort
    for (let i = len - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        siftDown(0, i - 1);
    }

    return arr;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = smoothSort(array);
console.log("Sorted Array (Smooth Sort):", sortedArray);


//Odd-Even Sort

function oddEvenSort(arr) {
    const length = arr.length;
    let sorted = false;

    while (!sorted) {
        sorted = true;

        // Perform the odd-indexed elements comparison
        for (let i = 1; i < length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
                sorted = false;
            }
        }

        // Perform the even-indexed elements comparison
        for (let i = 0; i < length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
                sorted = false;
            }
        }
    }

    return arr;
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = oddEvenSort(array);
console.log("Sorted Array (Odd-Even Sort):", sortedArray);


//Bitonic Sort

function bitonicSort(arr) {
    const bitonicMerge = (arr, low, length, direction) => {
        if (length > 1) {
            const mid = Math.floor(length / 2);

            for (let i = low; i < low + mid; i++) {
                compareAndSwap(arr, i, i + mid, direction);
            }

            bitonicMerge(arr, low, mid, direction);
            bitonicMerge(arr, low + mid, mid, direction);
        }
    };

    const compareAndSwap = (arr, i, j, direction) => {
        if ((arr[i] > arr[j] && direction === 1) || (arr[i] < arr[j] && direction === 0)) {
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    };

    const bitonicSortRecursive = (arr, low, length, direction) => {
        if (length > 1) {
            const mid = Math.floor(length / 2);

            bitonicSortRecursive(arr, low, mid, 1);
            bitonicSortRecursive(arr, low + mid, mid, 0);

            bitonicMerge(arr, low, length, direction);
        }
    };

    const length = arr.length;
    const direction = 1; // 1 for ascending order, 0 for descending order

    bitonicSortRecursive(arr, 0, length, direction);

    return arr;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = bitonicSort(array);
console.log("Sorted Array (Bitonic Sort):", sortedArray);


//Cycle Sort

function cycleSort(arr) {
    const n = arr.length;

    for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
        let item = arr[cycleStart];
        let pos = cycleStart;
        
        for (let i = cycleStart + 1; i < n; i++) {
            if (arr[i] < item) {
                pos++;
            }
        }

        if (pos === cycleStart) {
            continue;
        }

        while (item === arr[pos]) {
            pos++;
        }

        if (pos !== cycleStart) {
            const temp = arr[pos];
            arr[pos] = item;
            item = temp;
        }

        while (pos !== cycleStart) {
            pos = cycleStart;

            for (let i = cycleStart + 1; i < n; i++) {
                if (arr[i] < item) {
                    pos++;
                }
            }

            while (item === arr[pos]) {
                pos++;
            }

            if (item !== arr[pos]) {
                const temp = arr[pos];
                arr[pos] = item;
                item = temp;
            }
        }
    }

    return arr;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = cycleSort(array);
console.log("Sorted Array (Cycle Sort):", sortedArray);

//Radix Sort (LSD)

function radixSortLSD(arr) {
    const getMax = (arr) => {
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    };

    const countSort = (arr, exp) => {
        const output = new Array(arr.length).fill(0);
        const count = new Array(10).fill(0);

        for (let i = 0; i < arr.length; i++) {
            const digit = Math.floor(arr[i] / exp) % 10;
            count[digit]++;
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (let i = arr.length - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }

        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
        }
    };

    const max = getMax(arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countSort(arr, exp);
    }

    return arr;
}

// Example usage:
const array = [170, 45, 75, 90, 802, 24, 2, 66];
console.log("Original Array:", array);
const sortedArray = radixSortLSD(array);
console.log("Sorted Array (Radix Sort LSD):", sortedArray);


//Radix Sort (MSD)

function radixSortMSD(arr) {
    const getMax = (arr) => {
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    };

    const countSort = (arr, exp) => {
        const output = new Array(arr.length).fill(0);
        const count = new Array(10).fill(0);

        for (let i = 0; i < arr.length; i++) {
            const digit = Math.floor(arr[i] / exp) % 10;
            count[digit]++;
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (let i = arr.length - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }

        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
        }
    };

    const max = getMax(arr);
    const exp = 1;

    const radixSortRecursive = (arr, exp1, exp2) => {
        if (exp1 >= exp2) {
            return;
        }

        countSort(arr, exp1);

        let prev = 0;
        for (let i = 1; i < arr.length; i++) {
            if (Math.floor(arr[i] / exp1) % 10 !== Math.floor(arr[prev] / exp1) % 10 || i === arr.length - 1) {
                radixSortRecursive(arr.slice(prev, i + 1), exp1 * 10, exp2 * 10);
                prev = i;
            }
        }
    };

    radixSortRecursive(arr, exp, max);

    return arr;
}

// Example usage:
const array = [170, 45, 75, 90, 802, 24, 2, 66];
console.log("Original Array:", array);
const sortedArray = radixSortMSD(array);
console.log("Sorted Array (Radix Sort MSD):", sortedArray);


// std::sort (gcc)

const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);

// Using JavaScript's built-in sort method
array.sort((a, b) => a - b); // This sorts the array in ascending order

console.log("Sorted Array (JavaScript Sort):", array);

//Tim Sort

function timSort(arr) {
    const MIN_MERGE = 32;

    const calcMinRun = (n) => {
        let r = 0;
        while (n >= MIN_MERGE) {
            r |= n & 1;
            n >>= 1;
        }
        return n + r;
    };

    const insertionSort = (arr, left, right) => {
        for (let i = left + 1; i <= right; i++) {
            let temp = arr[i];
            let j = i - 1;
            while (j >= left && arr[j] > temp) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = temp;
        }
    };

    const merge = (arr, l, m, r) => {
        const len1 = m - l + 1;
        const len2 = r - m;
        const left = new Array(len1);
        const right = new Array(len2);

        for (let x = 0; x < len1; x++) {
            left[x] = arr[l + x];
        }
        for (let x = 0; x < len2; x++) {
            right[x] = arr[m + 1 + x];
        }

        let i = 0,
            j = 0,
            k = l;

        while (i < len1 && j < len2) {
            if (left[i] <= right[j]) {
                arr[k] = left[i];
                i++;
            } else {
                arr[k] = right[j];
                j++;
            }
            k++;
        }

        while (i < len1) {
            arr[k] = left[i];
            k++;
            i++;
        }

        while (j < len2) {
            arr[k] = right[j];
            k++;
            j++;
        }
    };

    const timSortImpl = (arr) => {
        const n = arr.length;
        const minRun = calcMinRun(n);

        for (let i = 0; i < n; i += minRun) {
            insertionSort(arr, i, Math.min(i + minRun - 1, n - 1));
        }

        for (let size = minRun; size < n; size = 2 * size) {
            for (let left = 0; left < n; left += 2 * size) {
                const mid = left + size - 1;
                const right = Math.min(left + 2 * size - 1, n - 1);
                merge(arr, left, mid, right);
            }
        }
    };

    timSortImpl(arr);
    return arr;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = timSort(array);
console.log("Sorted Array (Tim Sort):", sortedArray);


//Block Merge Sort (WikiSort)

function blockMergeSort(arr) {
    const MIN_SIZE = 32; // Minimum block size

    const merge = (arr, start1, end1, start2, end2) => {
        // Implementation of merging two sorted halves of an array
        let result = [];
        let i = start1;
        let j = start2;

        while (i <= end1 && j <= end2) {
            if (arr[i] <= arr[j]) {
                result.push(arr[i]);
                i++;
            } else {
                result.push(arr[j]);
                j++;
            }
        }

        while (i <= end1) {
            result.push(arr[i]);
            i++;
        }

        while (j <= end2) {
            result.push(arr[j]);
            j++;
        }

        for (let k = start1; k <= end2; k++) {
            arr[k] = result[k - start1];
        }
    };

    const insertionSort = (arr, start, end) => {
        // Simple insertion sort implementation
        for (let i = start + 1; i <= end; i++) {
            let current = arr[i];
            let j = i - 1;
            while (j >= start && arr[j] > current) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = current;
        }
    };

    const blockMergeSortImpl = (arr, start, end) => {
        const length = end - start + 1;

        if (length <= MIN_SIZE) {
            insertionSort(arr, start, end);
            return;
        }

        const block_size = Math.floor(Math.sqrt(length));
        const blocks = Math.ceil(length / block_size);

        for (let i = 0; i < blocks; i++) {
            const block_start = start + i * block_size;
            const block_end = Math.min(block_start + block_size - 1, end);
            insertionSort(arr, block_start, block_end);
        }

        for (let sz = block_size; sz < length; sz *= 2) {
            for (let start1 = start; start1 <= end; start1 += 2 * sz) {
                const end1 = Math.min(start1 + 2 * sz - 1, end);
                const start2 = Math.min(start1 + sz, end);
                const end2 = Math.min(start2 + sz - 1, end);
                merge(arr, start1, end1, start2, end2);
            }
        }
    };

    blockMergeSortImpl(arr, 0, arr.length - 1);
    return arr;
}

// Example usage:
const array = [64, 25, 12, 22, 11];
console.log("Original Array:", array);
const sortedArray = blockMergeSort(array);
console.log("Sorted Array (Block Merge Sort - WikiSort):", sortedArray);

