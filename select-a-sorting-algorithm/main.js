const sortType = document.getElementById("sort-type")
const name = document.getElementById("algorithm-name")
const unsortedArr = document.getElementById("unsorted-array")
const sortedArr = document.getElementById("sorted-array")
const button = document.getElementById("button")
const codeContainer = document.getElementById("code")
let array = []


function onChange(){
  sortedArr.textContent ="" // resets the display after you change
  // add it here







  let value = sortType.value
  let text = sortType.options[sortType.selectedIndex].text;

  array = fillArr()
  var display = array.join("    ")

  if ( value === "null"){
    unsortedArr.textContent = " "
    name.textContent = ""
    codeContainer.textContent = "No Code To Display Yet"
    button.disabled = true
  }

  else{
    unsortedArr.textContent = `Unsorted Array: ${display}`
    button.disabled = false
  }
  // unsortedArr.textContent = ( value === "null" ) ? " " : `Unsorted Array: ${display}`

switch(value){
    case "heap-sort":
      name.textContent = "Heap Sort"
      codeContainer.textContent = heapSortCode
      hljs.highlightAll()
      button.addEventListener("click", () => {
         selectionSort(array)
         var display = array.join("  ")
         sortedArr.textContent = `Sorted Array: ${display}`
       })
      break;
    case "selection-sort":
      name.textContent = "Selection Sort"
      codeContainer.textContent = selectionSortCode
      hljs.highlightAll()
      button.addEventListener("click", () => {
         selectionSort(array)
         var display = array.join("  ")
         sortedArr.textContent = `Sorted Array: ${display}`
       })
      break;

    case "insertion-sort":
      name.textContent = "Insertion Sort"
      codeContainer.textContent = insertionSortCode
      hljs.highlightAll()
      button.addEventListener("click", () => {
         insertionSort(array)
         var display = array.join(" ")
         sortedArr.textContent = `Sorted Array: ${display}`
       })
      break;

    case "bubble-sort":
      name.textContent = "Bubble Sort"
      codeContainer.textContent = bubbleSortCode
      hljs.highlightAll()
      button.addEventListener("click", () => {
         bubbleSort(array)
         var display = array.join(" ")
         sortedArr.textContent = `Sorted Array: ${display}`
       })
      break;

    case "counting-sort":
      name.textContent = "Counting Sort"
      codeContainer.textContent = countingSortCode
      hljs.highlightAll()
      button.addEventListener("click", () => {
         countingSort(array)
         var display = array.join(" ")
         sortedArr.textContent = `Sorted Array: ${display}`
       })
      break;

    case "merge-sort":
      name.textContent = "Merge Sort"
      codeContainer.textContent = mergeSortCode
      hljs.highlightAll()
      button.addEventListener("click", () => {
         mergeSort(array, 0, array.length -1)
         var display = array.join(" ")
         sortedArr.textContent = `Sorted Array: ${display}`
       })
      break;
  }
} // end of onChange

sortType.onchange = onChange
onChange()








function fillArr(){
  var arr = []
  for ( let i = 0; i < 10; i+=1 ){
    arr.push(getRandomInt(0, 51))
  }

  return arr;
} // fills array of length 10 with random numbers

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
} // returns a random int between the min and max passed in

function selectionSort(arr){
  for ( let i = 0; i < arr.length; i++){
    var minIndex = i
    var min = arr[i]

    for ( let j = 0 + i; j < arr.length; j++){
      if ( min > arr[j]){
        min = arr[j] // finds min in the array ( array is shortened by j every loop )
        minIndex = j // gives us the val of where the min value came from
      }
    }
    var temp = arr[i]
    arr[i] = min // swapping min value for the val at j
    arr[minIndex] = temp // moving val at j to where the min came from
  }
  return arr
} // returns a sorted array


function bubbleSort(arr){
  var sorted = false
    while ( !sorted ){ // while array is not sorted
      sorted = true
      for ( let i = 0; i < arr.length-1; i++){
        if ( arr[i+1]<arr[i] ){ // if second elem is less than one before
          var swap = arr[i] // stores val before swap
          arr[i] = arr[i+1] // one after puts his number into position before
          arr[i+1] = swap
          sorted = false
        }
      }
    }
    return arr
} // end of bubble sort


function countingSort(arr){
  var max = 0;
  for ( let i = 0; i < arr.length; i++ ){
    if ( max < arr[i] )
      max = arr[i]
  }


  countArr = new Array(max + 1)
  // going thru original array and counting how many times each elem occurs then indexing straight into the count arrau with the num
  for ( let j = 0; j < arr.length; j++ ){
    countArr[ arr[j] ]++
  }

  for ( let k = 0; k < countArr.length-1; k++ ){
    countArr[k+1] += countArr[k]
  }

  sorted = new Array(arr.length)

  for ( let i = 0; i < arr.length; i++){
    var index = countArr[ arr[i] ] - 1;
    sorted[index] = arr[i]
    countArr[ arr[i] ]-- // descresing the count of that elem we just stored into the final array
  }
  return sorted

}
function insertionSort(arr){
  // iterate trhough sorrted portion, starts at j and go down
  for ( let j = 0; j < arr.length-1; j++){
    for ( let i = j; i >= 0 ; i--){ // this loops backwards from wherever j is. so lets say j=5, then the inner loop
                                  // will iterate from 5 to zero backwards
      if ( arr[i+1] < arr[i]){

        var temp = arr[i+1]
        arr[i+1] = arr[i]
        arr[i] = temp
      }
    }
  }
  return arr;
}
function mergeSort(arr, leftIndex, rightIndex){
  if ( leftIndex < rightIndex ){
    var midpoint = Math.floor( (rightIndex + leftIndex) / 2) // finds midpoint of subArray
    mergeSort(arr, leftIndex, midpoint ) // first half of array
    mergeSort(arr, midpoint+1, rightIndex ) // second half of array
    merge(arr, leftIndex, midpoint, rightIndex )
  }
  return arr
}
function merge( arr,leftIndex, midpoint, rightIndex ){
  console.log(arr,leftIndex, midpoint, rightIndex)
  var leftSubArrayLength = ( midpoint - leftIndex ) + 1
  var rightSubArrayLength =  rightIndex - midpoint


  var leftSubArray = new Array(leftSubArrayLength)
  var rightSubArray = new Array(rightSubArrayLength)


  for ( let i = 0; i < leftSubArrayLength; i++ ){
    leftSubArray[i] = arr[i+leftIndex]
  }


  for ( let j = 0; j < rightSubArrayLength; j++ ){
    rightSubArray[j] = arr[j + midpoint + 1]
  }

  var arr1Index = 0
  var arr2Index = 0
  var index = leftIndex

  while ((arr1Index < leftSubArrayLength) && (arr2Index < rightSubArrayLength)){ // looping through both arrays
    if ( leftSubArray[arr1Index] <= rightSubArray[arr2Index] ){ // if elem in first array is less than elem in second array
      arr[index] = leftSubArray[arr1Index]
      arr1Index++
    }
    else{
      arr[index] = rightSubArray[arr2Index]
      arr2Index++
    }
    index++
  }

  while ( arr1Index < leftSubArrayLength ){
    arr[index] = leftSubArray[arr1Index]
    index++
    arr1Index++
  }
  while ( arr2Index < rightSubArrayLength){
    arr[index] = rightSubArray[arr2Index]
    index++
    arr2Index++
  }
}


const bubbleSortCode =
` public static int[] bubbleSort( int[] arr )
  {
    boolean sorted = false;
    while ( !sorted)  // while array is not sorted
    {
      sorted = true;
      for ( int i = 0; i < arr.length-1; i++)
      {
        if ( arr[i+1]<arr[i] ) // if second elem is less than one before
        {
          int swap = arr[i]; // stores val before swap
          arr[i] = arr[i+1]; // one after puts his number into position before
          arr[i+1] = swap;
          sorted= false;
        }
      }
    }
    return arr;
  }`
const countingSortCode =
`static int[] countingSort( int[] arr )
{
  int max = 0;
  for ( int i = 0; i < arr.length; i++ ){
    if ( max < arr[i] )
      max = arr[i];
  }

  int[] countArr = new int[max + 1];
  // going thru original array and counting how many times each elem occurs then indexing straight into the count arrau with the num
  for ( int j = 0; j < arr.length; j++ ){
    countArr[ arr[j] ]++;
  }

  // adding the prev elem starting at 1 to the next index... can start at 0 or 1 doenst matter
  for ( int k = 0; k < countArr.length-1; k++ ){
    countArr[k+1] += countArr[k];
  }

  int[] sorted = new int[arr.length];
  for ( int i = 0; i < arr.length; i++){
    int index = countArr[ arr[i] ] - 1;
    sorted[index] = arr[i];
    countArr[ arr[i] ]--; // descresing the count of that elem we just stored into the final array
  }
  return sorted;
}`

const mergeSortCode =
`  public static void mergeSort( int[] arr, int leftIndex, int rightIndex ) // rightIndex comes in as 0, leftIndex comes in as arr.length-1
  {
    if ( leftIndex < rightIndex )
    {
      int midpoint = ( rightIndex + leftIndex)/2; // finds midpoint of subArray
      mergeSort(arr, leftIndex, midpoint ); // first half of array
      mergeSort(arr, midpoint+1, rightIndex ); // second half of array
      merge(arr, leftIndex, midpoint, rightIndex );
    }`

const selectionSortCode =
`public static int[] SelectionSort( int[] arr )
{
  //int count = arr.length-1;
  for ( int j = 0; j < arr.length; j++)
  {
    int minIndex = j;
    int min = arr[j];
    for ( int i = 0+j; i < arr.length; i++) // the +j increments the array search space so that you dont search the beggining part as you sort
    {
      if ( min > arr[i])
      {
        min = arr[i]; // finds min in the array ( array is shortened by j every loop )
        minIndex = i; // gives us the val of where the min value came from
      }
    }
    int temp = arr[j];
    arr[j] = min; // swapping min value for the val at j
    arr[minIndex] = temp; // moving val at j to where the min came from

  }
  return arr;
}`

const insertionSortCode =
`public static int[] InsertionSort( int[] arr ) // compare arr[i] to all values before and move the min to the back
  {

    // iterate trhough sorrted portion, starts at j and go down
    for ( int j = 0; j < arr.length-1; j++)
    {
      for ( int i = j; i >= 0 ; i--) // this loops backwards from wherever j is. so lets say j=5, then the inner loop
      {                              // will iterate from 5 to zero backwards
        if ( arr[i+1] < arr[i])
        {
          int temp = arr[i+1];
          arr[i+1] = arr[i];
          arr[i] = temp;
        }
      }


    }
    return arr;
  }`

const heapSortCode =
`public static void heapSort(){
  int length = array.length;
  // iterating from the first non-leaf node, which is at index (length/2) - 1
  // building max heap
  for ( int i = (length/2) - 1; i >= 0; i-- )
    heapify(length, i );

  for ( int j = length-1; j>=0; j--){
    // swaps root with last element
    int temp = array[0];
    array[0] = array[j];
    array[j] = temp;
    heapify( j, 0 );
  }
}

public static void heapify(int length, int i){
  int parent = i;
  int left = 2 * i + 1;
  int right = 2 * i + 2;

  if ( left < length && array[left] > array[parent] )
    parent = left; // swapping indexes
  if ( right < length && array[right] > array[parent] )
    parent = right;

  if ( parent != i ){
    int temp = array[parent];
    array[parent] = array[i];
    array[i] = temp;
    heapify(length, parent);
  }
}
`
