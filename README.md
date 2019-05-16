# reward-points
 An interview screening question
 
 Email:
![Email Question](https://raw.githubusercontent.com/ZacharyMcGee/reward-points/master/images/email.png)
## Goal
Create a program that can calculate points based on transactions.

 - 2 Points per dollar over $100
 - 1 Point per dollar over $50
 - 3 Month period of transactions
 - Calculate rewards earned for each customer per month and total

## Example
$120 purchase = 2x$20 + 1x$50 = 90 Points

## Additional Information
Suggested that it should only require a few lines of code, but we could get creative.

##  My Solution
#### The Main Function
This will take a transaction amount and calculate the reward points.

    function calculatePoints(transaction) {
	  transaction = Math.floor(transaction); // We are concerned 	with dollar amounts, 50.80 is > 50 but not a dollar amount over 50
	  totalRewards = 0;
	  switch(true) {
	    case (transaction <= 50): // We have no points, just return totalRewards since it is at 0 for default
	      return totalRewards;
	      break;
	    case (transaction <= 100):
	      totalRewards = ((transaction - 50) * OVER_50_DEFAULT); // Our points are > 50 but < 100 so our points are just ever dollar over 50
	      return totalRewards;
	      break;
	    case (transaction > 100):
	      totalRewards = (((transaction - 100) * OVER_100_DEFAULT) + 50); // We calculate ever dollar over 100 as * 2 points then add 50 since we are over 100
	      return totalRewards;
	      break;
	    default:
	      break; // We shouldn't reach this
	  }
	}

But I wanted to be a little creative, so I created a quick web application that could generate random datasets. 
#### Creating Datasets 
My solution was to create a customers JSON object that would be structured as follows:

 - customerID
 - customerName
 - transactionHistory
		 - transactionID
		 - transactionDate
		 - transactionAmount

Therefore, we create a random customer and then create random transactions for each customer.

##### Random Customer
Each customer will generate 1-10 transactions

    function generateRandomCustomers(amount) {
	  var jsonArr = [];
	  var currentTransactionID = 0;
	  var randomTransactions;

	  for(var i = 0; i < amount; i++) {
	    randomTransactions = generateRandomTransations(Math.floor(Math.random() * 10) + 1, currentTransactionID);
	    jsonArr.push({
	      customerID: i,
	      customerName: generateName(),
	      transactionHistory: randomTransactions,
	    });
	    currentTransactionID = currentTransactionID + randomTransactions.length;
	  }
	  return jsonArr;
	}

##### Random Transactions 
Each transactions will get a date with 3 months of time and an amount from 0-250.

    function generateRandomTransations(amount, startid) {
	  var jsonArr = [];
	  var TodayDate = new Date();

	  for(var i = 0; i < amount; i++) {
	      jsonArr.push({
	          transactionID: startid + i,
	          transactionDate: randomDate(new Date(TodayDate.getFullYear(), TodayDate.getMonth() - 2, TodayDate.getDay()), TodayDate),
	          transactionAmount: (Math.random() * 250).toFixed(2)
	      });
	  }
	  return jsonArr;
	}

# Finished Product
View Live: [https://zacharymcgee.github.io/reward-points/](https://zacharymcgee.github.io/reward-points/)

![
](https://raw.githubusercontent.com/ZacharyMcGee/reward-points/master/images/example.png)
### Test Case ($120 Spent should = 90 Points)
![enter image description here](https://raw.githubusercontent.com/ZacharyMcGee/reward-points/master/images/example2.png)

### Result (Yes, it gave us 90 as a result)
![
](https://raw.githubusercontent.com/ZacharyMcGee/reward-points/master/images/example4.png)
