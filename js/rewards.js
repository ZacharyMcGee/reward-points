  ////////////////////////////////////
 //          SETTINGS             //
///////////////////////////////////

var OVER_50_DEFAULT = 1; // This one is not necessary for this problem but if we want to change later we should use this for easy integration
var OVER_100_DEFAULT = 2; // Default multiplier for points over 100
var CUSTOMER_AMOUNT = 5; // Amount of Customers to Generate

  ////////////////////////////////////
 //            SETUP              //
///////////////////////////////////

var customers = generateRandomCustomers(CUSTOMER_AMOUNT);

document.getElementById("transaction-table").innerHTML = createTransactionTable(customers);
document.getElementById("customer-table").innerHTML = createCustomerTable(customers);

  ////////////////////////////////////
 //    MAIN PROBLEM, CALC POINTS  //
///////////////////////////////////

function calculatePoints(transaction) {
  transaction = Math.floor(transaction); // We are concerned with dollar amounts, 50.80 is > 50 but not a dollar amount over 50
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

  ////////////////////////////////////
 //      GENERATE CUSTOMERS       //
///////////////////////////////////

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

  ////////////////////////////////////
 //    GENERATE TRANSACTIONS      //
///////////////////////////////////

function generateRandomTransations(amount, startid) {
  var jsonArr = [];
  var TodayDate = new Date();

  for(var i = 0; i < amount; i++) {
      jsonArr.push({
          transactionID: startid + i,
          transactionDate: randomDate(new Date(TodayDate.getFullYear(), TodayDate.getMonth() - 2, TodayDate.getDay()), TodayDate),
          customerName: "text",
          transactionAmount: (Math.random() * 250).toFixed(2)
      });
  }
  return jsonArr;
}

  ////////////////////////////////////
 //  CREATE TABLE OF TRANSACTIONS //
///////////////////////////////////

function createTransactionTable(array) {
  var table = "<table class='transaction-table'><tr><th>Transaction ID</th><th>Transaction Date</th><th>Customer #</th><th>Customer Name</th><th>Transaction Amount</th></tr>";

  for(var i = 0; i < array.length; i++) {
    for(var j = 0; j < array[i].transactionHistory.length; j++) {
      table = table + "<tr><td style='text-align:center;'>" + array[i].transactionHistory[j].transactionID + "</td><td>" + array[i].transactionHistory[j].transactionDate + "</td><td style='text-align:center;'>" + array[i].customerID + "</td><td>" + array[i].customerName + "</td><td style='text-align:center;'>$" + array[i].transactionHistory[j].transactionAmount + "</td></tr>";
    }
  }
  return table;
}

  ////////////////////////////////////
 // CREATE TABLE OF CUSTOMERS     //
///////////////////////////////////

function createCustomerTable(array) {
  var table = "<table class='transaction-table'><tr><th>Customer ID</th><th>Customer Name</th><th>Total Spent / Rewards</th><th>Month 3 Spent / Points</th><th>Month 2 Spent / Points</th><th>Month 1 Spent / Points</th></tr>";
  var TodayDate = new Date();
  for(var i = 0; i < array.length; i++) {
    var totalSpent = 0;
    var month1 = 0;
    var month2 = 0;
    var month3 = 0;
    for(var j = 0; j < array[i].transactionHistory.length; j++) {
      totalSpent = (parseFloat(totalSpent) + parseFloat(array[i].transactionHistory[j].transactionAmount)).toFixed(2);
      switch(true) {
        case ((TodayDate.getMonth() - array[i].transactionHistory[j].transactionDate.getMonth()) == 0):
          month1 = (parseFloat(month1) + parseFloat(array[i].transactionHistory[j].transactionAmount)).toFixed(2);
          break;
        case ((TodayDate.getMonth() - array[i].transactionHistory[j].transactionDate.getMonth()) == 1):
          month2 = (parseFloat(month2) + parseFloat(array[i].transactionHistory[j].transactionAmount)).toFixed(2);
          break;
        case ((TodayDate.getMonth() - array[i].transactionHistory[j].transactionDate.getMonth()) == 2):
          month3 = (parseFloat(month3) + parseFloat(array[i].transactionHistory[j].transactionAmount)).toFixed(2);
          break;
        default:
          break; // We shouldn't reach this
      }
    }
    table = table + "<tr><td style='text-align:center;'>" + array[i].customerID + "</td><td>" + array[i].customerName + "</td><td>$" + totalSpent + " / " + (parseFloat(calculatePoints(month1)) + parseFloat(calculatePoints(month2)) + parseFloat(calculatePoints(month3))) + "</td><td>$" + month1 + " Spent / " + calculatePoints(month1) + " Points</td><td>$" + month2 + " Spent / " + calculatePoints(month2) + " Points</td><td>$" + month3 + " Spent / " + calculatePoints(month3) + " Points</td></tr>";
  }
  return table;
}

  ////////////////////////////////////
 //   GENERATE RANDOM NAMES        //
///////////////////////////////////

function generateName() {
  var rawFile = new XMLHttpRequest();
  var names;

  rawFile.open("GET", "names/names.txt", false);
  rawFile.onreadystatechange = function ()
  {
      if(rawFile.readyState === 4)
      {
          if(rawFile.status === 200 || rawFile.status == 0)
          {
              var allText = rawFile.responseText;
              names = allText.split('\n');
          }
      }
  }
  rawFile.send(null);
  return names[Math.floor(Math.random() * names.length)]
}

  ////////////////////////////////////
 //       RETURN NAME LIST        //
///////////////////////////////////

function getNamelist() {
  var rawFile = new XMLHttpRequest();
  var names;

  rawFile.open("GET", "names/names.txt", false);
  rawFile.onreadystatechange = function ()
  {
      if(rawFile.readyState === 4)
      {
          if(rawFile.status === 200 || rawFile.status == 0)
          {
              var allText = rawFile.responseText;
              names = allText.split('\n');
          }
      }
  }
  rawFile.send(null);
  return names;
}

  ////////////////////////////////////
 //      GENERATE RANDOM DATE      //
///////////////////////////////////

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

  ////////////////////////////////////
 //      GENERATE NEW DATASET      //
///////////////////////////////////

function generateDataset() {
  customers = generateRandomCustomers(CUSTOMER_AMOUNT);
  document.getElementById("transaction-table").innerHTML = createTransactionTable(customers);
  document.getElementById("customer-table").innerHTML = createCustomerTable(customers);
}

  ////////////////////////////////////
 //      VIEW JSON OF DATASET     //
///////////////////////////////////

function viewDataset() {
  var title = "JSON Data";
  var content = JSON.stringify(customers);
  showModal(title, content);
}

  ////////////////////////////////////
 //    VIEW THE NAME LIST          //
///////////////////////////////////

function viewNamelist() {
  var title = "Name List";
  var nameList = getNamelist();
  var content = "<p>";
  for(var i = 0; i < nameList.length; i++) {
    content = content + nameList[i] + "<br>\n";
  }
  content = content + "</p>"
  showModal(title, content);
}

  ////////////////////////////////////
 //     ENTER AN AMOUNT SPENT      //
///////////////////////////////////

function calculateReward() {
  var title = "Calculate Reward";
  var content = "<div class='settings'><p>Amount Spent:</p><input id='spentAmount' type='textbox' value='120'><br><input class='save-button' type='button' onclick='calculateRewardPoints()' value='Calculate'><input class='save-button' type='button' onclick='closeModal()' value='Cancel'></div>";
  showModal(title, content);
}

  ///////////////////////////////////
 //   CALC POINTS BASED ON ABOVE  //
///////////////////////////////////

function calculateRewardPoints() {
  var amount = document.getElementById("spentAmount").value;
  var title = "Reward Points";
  var content = "The points for $" + amount + " purchase is: " + calculatePoints(amount) + "<br><input class='save-button' type='button' onclick='calculateReward()' value='Back'><input class='save-button' type='button' onclick='closeModal()' value='Close'></div>";
  showModal(title, content);
}

  ///////////////////////////////////
 //    OPEN CURRENT SETTINGS      //
///////////////////////////////////

function openSettings() {
  var title = "Settings";
  var content = "<div class='settings'><p>50-100 Reward Multiplier</p><input id='50-100' type='textbox' value='" + OVER_50_DEFAULT + "'><p>Over 100 Reward Multiplier</p><input id='over100' type='textbox' value='" + OVER_100_DEFAULT + "'><p>Customer Amount:</p><input id='customerAmt' type='textbox' value='" + CUSTOMER_AMOUNT + "'><br><input class='save-button' type='button' onclick='saveSettings()' value='Save'><input class='save-button' type='button' onclick='closeModal()' value='Cancel'></div>";
  showModal(title, content);
}

 ////////////////////////////////////
 //         SAVE SETTINGS         //
///////////////////////////////////

function saveSettings() {
  OVER_50_DEFAULT = document.getElementById("50-100").value;
  OVER_100_DEFAULT = document.getElementById("over100").value;
  CUSTOMER_AMOUNT = document.getElementById("customerAmt").value;
  closeModal();
}

  ///////////////////////////////////
 //        CLEAR SEARCH BAR       //
///////////////////////////////////

function clearSearch() {
  document.getElementById("search").value = "";
  searchHandle();
}

  ////////////////////////////////////
 //   SEARCHBAR LISTEN FOR INPUT   //
///////////////////////////////////

document.getElementById("search").addEventListener('input', function (evt) {
  searchHandle();
});

  ////////////////////////////////////
 //     HANDLE SEARCHBAR INPUT     //
///////////////////////////////////

function searchHandle() {
  if(document.getElementById("search").value.length > 0){
    document.getElementById("searchButton").innerHTML = "<i class='fa fa-times'></i>";
    document.getElementById("content").innerHTML = "<div class='full-card'><div class='card-title'><p><i class='fas fa-users' style='padding-right:5px;'></i> Customer Search Results</p></div><div class='card-body' style='max-height:300px; overflow-y: scroll; width:100%;'><table id='result-table' class='transaction-table'></table></div></div>";
    document.getElementById("result-table").innerHTML = "<table class='transaction-table'><tr><th>Customer ID</th><th>Customer Name</th><th>Total Spent / Rewards</th><th>Month 3 Spent / Points</th><th>Month 2 Spent / Points</th><th>Month 1 Spent / Points</th></tr>";
    var TodayDate = new Date();
    for(var i = 0; i < customers.length; i++) {
      if(customers[i].customerName.toLowerCase().includes(document.getElementById("search").value.toLowerCase())) {
        var totalSpent = 0;
        var month1 = 0;
        var month2 = 0;
        var month3 = 0;
        for(var j = 0; j < customers[i].transactionHistory.length; j++) {
          totalSpent = (parseFloat(totalSpent) + parseFloat(customers[i].transactionHistory[j].transactionAmount)).toFixed(2);
          switch(true) {
            case ((TodayDate.getMonth() - customers[i].transactionHistory[j].transactionDate.getMonth()) == 0):
              month1 = (parseFloat(month1) + parseFloat(customers[i].transactionHistory[j].transactionAmount)).toFixed(2);
              break;
            case ((TodayDate.getMonth() - customers[i].transactionHistory[j].transactionDate.getMonth()) == 1):
              month2 = (parseFloat(month2) + parseFloat(customers[i].transactionHistory[j].transactionAmount)).toFixed(2);
              break;
            case ((TodayDate.getMonth() - customers[i].transactionHistory[j].transactionDate.getMonth()) == 2):
              month3 = (parseFloat(month3) + parseFloat(customers[i].transactionHistory[j].transactionAmount)).toFixed(2);
              break;
            default:
              break; // We shouldn't reach this
          }
        }
        document.getElementById("result-table").innerHTML = document.getElementById("result-table").innerHTML + "<tr><td style='text-align:center;'>" + customers[i].customerID + "</td><td>" + customers[i].customerName + "</td><td>$" + totalSpent + " / " + (parseFloat(calculatePoints(month1)) + parseFloat(calculatePoints(month2)) + parseFloat(calculatePoints(month3))) + "</td><td>$" + month1 + " Spent / " + calculatePoints(month1) + " Points</td><td>$" + month2 + " Spent / " +  calculatePoints(month2) + " Points</td><td>$" + month3 + " Spent / " + calculatePoints(month3) + " Points</td></tr>";
      }
    }
  }
  else
  {
    document.getElementById("searchButton").innerHTML = "<i class='fa fa-search'></i>";
    document.getElementById("content").innerHTML = "<div class='full-card'><div class='card-title'><p><i class='fas fa-history' style='padding-right:5px;'></i> 3 Month Transaction Dataset</p></div><div class='card-body' style='max-height:300px; overflow-y: scroll; width:100%;'><table id='transaction-table' class='transaction-table'></table></div></div><div class='full-card' style='margin-top: 20px;'><div class='card-title'><p><i class='fas fa-users' style='padding-right:5px;'></i> Reward Breakdown by Customer</p></div><div class='card-body' style='max-height:300px; overflow-y: scroll; width:100%;'><table id='customer-table' class='transaction-table'></table></div></div>";

    document.getElementById("transaction-table").innerHTML = createTransactionTable(customers);
    document.getElementById("customer-table").innerHTML = createCustomerTable(customers);
  }
}

  ///////////////////////////////////
 //        SHOW POPUP MODAL       //
///////////////////////////////////

function showModal(title, content) {
  var modal = document.getElementById('modal');
  var modalTitle = document.getElementById('modalTitle');
  var modalContent = document.getElementById('modalContent');

  modal.style.display = "block";

  modalTitle.innerHTML = "<p>" + title + "</p><span onClick='javascript:closeModal()' class='close'>&times;</span>";
  modalContent.innerHTML = content;
}

  ////////////////////////////////////
 //       CLOSE POPUP MODAL        //
///////////////////////////////////

function closeModal() {
  var modal = document.getElementById('modal');
  modal.style.display = "none";
}
