/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

const getDigit = (number, position) => {
   let numberStr = number.toString();
   let len = numberStr.length;
   if (position >= len) {
     return 0;
   } else {
     let largestIndex = len - 1;
     return parseInt(numberStr.charAt(largestIndex - position));
   }
}

const getLargestNumberDigits = (nums) => {
   let largest = '';
   for(let i = 0; i < nums.length; i++) {
     let numLength = nums[i].toString().length;
     if (largest < numLength) {
       largest = numLength
     } 
   }

   return largest;
}


function radixSort(array) {
  // code goes here

  if (array.length < 2) return array;

  let largestDigit = getLargestNumberDigits(array);

  let buckets = new Array(10).fill(0).map(ele => []);

  // looping over the digits
  for (let i = 0; i < largestDigit; i++) {
    
    // loop over the arrays
    while (array.length) {
      let currentElement = array.shift();
      buckets[getDigit(currentElement, i)].push(currentElement);
    }

    array = array.concat(...buckets);
    // need to empty the buckets at the end
    buckets = buckets.map(ele => []);

  }

  return array;
}

// unit tests
// do not modify the below code
describe.skip("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20,
      51,
      3,
      801,
      415,
      62,
      4,
      17,
      19,
      11,
      1,
      100,
      1244,
      104,
      944,
      854,
      34,
      3000,
      3001,
      1200,
      633
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1,
      3,
      4,
      11,
      17,
      19,
      20,
      34,
      51,
      62,
      100,
      104,
      415,
      633,
      801,
      854,
      944,
      1200,
      1244,
      3000,
      3001
    ]);
  });
  /*it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort());
  });*/
});
