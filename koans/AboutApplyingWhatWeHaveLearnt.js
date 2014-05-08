var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      _(products).filter(function(pizza) {
        if (!pizza.containsNuts &&
            !_(pizza.ingredients).any(function(ingredient) {
            return ingredient === "mushrooms" ? true : false;
          })) {
          productsICanEat.push(this);
        }
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    /* try chaining range() and reduce() */
    var sum = _.range(1000).reduce(function(lastSum, currVal) {
      return currVal % 3 === 0 || currVal % 5 === 0 ? lastSum + currVal : lastSum;
    }, 0)

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    _(products).chain().map(function(elem) {
      return elem.ingredients;
    }).flatten().reduce(function(last, curr) {
      last[curr] = last[curr] !== undefined ? last[curr] : 0;
      last[curr]++;
      return last;
    }, ingredientCount);

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  it("should find the largest prime factor of a composite number", function () {

    function largestPrimeFactor(number) {
      var result = 1;
      for (var i = 1; i <= (number / 2); i++) {
        if (number % i === 0 &&
            largestPrimeFactor(i) === 1 &&
            i > result) {
          result = i;
        }
      }
      return result;
    }

    expect(largestPrimeFactor(1)).toBe(1);
    expect(largestPrimeFactor(25)).toBe(5);
    expect(largestPrimeFactor(855)).toBe(19);
    expect(largestPrimeFactor(13195)).toBe(29);
    // TODO refine/research algorithm to handle very large numbers
//    expect(largestPrimeFactor(600851475143)).toBe(6857);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function palindromeCheck(num) {
      var numString = num.toString();
      var first = numString.slice(0, Math.ceil(numString.length / 2));
      var last = numString.slice(Math.floor(numString.length / 2));
      return first === last.split("").reverse().join("") ? true : false;
    }

    function palindromeSearch(a, b) {
      var result = undefined;
      for (var i = a; i >= 1 && result === undefined; i--) {
        for (var j = b; j >= 1 && result === undefined; j--) {
          var product = i * j;
          if (palindromeCheck(product)) result = product;
        }
      }
      return result;
    }

    expect(palindromeCheck("foof")).toBe(true);
    expect(palindromeCheck("bob")).toBe(true);
    expect(palindromeCheck(121)).toBe(true);
    expect(palindromeCheck(423324)).toBe(true);
    expect(palindromeCheck(999080999)).toBe(true);

    expect(palindromeCheck(23423)).toBe(false);
    expect(palindromeCheck("mike")).toBe(false);
    expect(palindromeCheck(99908999)).toBe(false);

    expect(palindromeSearch(999, 999)).toBe(90909)
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    function numSearch() {
      var num = 1;
      var found = false;
      while (!found) {
        var divCheck = true;
        for (var i = 1; i <= 20 && divCheck; i++) {
          if (num % i !== 0) divCheck = false;
        }
        if (divCheck) {
          found = true;
        } else {
          num++;
        }
      }
      return num;
    }

    expect(numSearch()).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
  });

  it("should find the 10001st prime", function () {
    function primeCheck(num) {
      var isPrime = true;
      for (var i = 2; i <= (num / 2) && isPrime; i++) {
        if (num % i === 0) isPrime = false;
      }
      return isPrime;
    }

    function primeSearch(n) {
      var primes = [];
      var num = 2;
      while (primes.length < n) {
        if (primeCheck(num)) primes.push(num);
        num++;
      }
      return primes[primes.length - 1];
    }

    var nth = 10001;
    expect(primeSearch(nth)).toBe(104743);
  });
});
