//capitalize first letter function
function titleCase(str) {
    return str.split(' ').map(function (val) {
        return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
    }).join(' ');
};

//define objects variables functions
let loginUserName = "";
let loginUserId = "";

let goalId = "";
let budgetId = "";

let date = new Date();
let currentMonth = addLeadingZeroToMonthNumbers(date.getMonth());
let currentYear = date.getFullYear();

//functions
function addLeadingZeroToMonthNumbers(monthNumber) {
    if (monthNumber < 9) {
        monthNumber = "0" + (monthNumber + 1);
    } else {
        monthNumber = (monthNumber + 1);
    }
    return monthNumber;
}

function convertMonthNumberToMonthWord(monthNumber) {
    let monthWord = "";
    if (monthNumber == 1) {
        monthWord = "January";
    } else if (monthNumber == 2) {
        monthWord = "February";
    } else if (monthNumber == 3) {
        monthWord = "March";
    } else if (monthNumber == 4) {
        monthWord = "April";
    } else if (monthNumber == 5) {
        monthWord = "May";
    } else if (monthNumber == 6) {
        monthWord = "June";
    } else if (monthNumber == 7) {
        monthWord = "July";
    } else if (monthNumber == 8) {
        monthWord = "August";
    } else if (monthNumber == 9) {
        monthWord = "September";
    } else if (monthNumber == 10) {
        monthWord = "October";
    } else if (monthNumber == 11) {
        monthWord = "November";
    } else {
        monthWord = "December";
    }

    return monthWord;
}

function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false; // Invalid format
    var d = new Date(dateString);
    if (!d.getTime() && d.getTime() !== 0) return false; // Invalid date
    return d.toISOString().slice(0, 10) === dateString;
}



//display users budgets
function displayBudgets(userId) {
    //    console.log(userId);
    $.ajax({
            type: "GET",
        url: 'https://budget-buddy-react-capstone.herokuapp.com/budgets/' + userId,
            dataType: 'json',
        })
        .done(function (dataOutput) {
            //            console.log(dataOutput);
            //displays the external api json object in the console
            displayBudgetResult(dataOutput.budgets);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//display users goals
function displayGoals(userId) {
    //    console.log(userId);
    $.ajax({
            type: "GET",
        url: 'https://budget-buddy-react-capstone.herokuapp.com/goals/' + userId,
            dataType: 'json',
        })
        .done(function (dataOutput) {
            //            console.log(dataOutput);
            //displays the external api json object in the console
            displayFinancialGoalResult(dataOutput.goals);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//goal html output
function displayFinancialGoalResult(dataOutput) {
    var buildTheHtmlOutput = "";

    buildTheHtmlOutput += '<div class="row rowTitle">';
    buildTheHtmlOutput += '<div class="cellTrans">Descritpion</div>';
    buildTheHtmlOutput += '<div class="cellTrans">Date</div>';
    buildTheHtmlOutput += '<div class="cellTrans">Budgeted</div>';
    buildTheHtmlOutput += '<div class="cellTrans">Actual</div>';
    buildTheHtmlOutput += '<div class="cellTrans">Difference</div>';
    buildTheHtmlOutput += '<div class="cellTrans">Action</div>';
    buildTheHtmlOutput += '</div>';

    let goalBudgetTotal = 0;
    let goalActualTotal = 0;
    let goalDifferenceTotal = 0;

    $.each(dataOutput, function (dataKey, dataValue) {
        //        console.log(dataValue);
        goalBudgetTotal = goalBudgetTotal + parseFloat(dataValue.budgeted);
        goalActualTotal = goalActualTotal + parseFloat(dataValue.actual);
        goalDifferenceTotal = goalDifferenceTotal + parseFloat(dataValue.actual - dataValue.budgeted);

        buildTheHtmlOutput += '<div class="row">';
        buildTheHtmlOutput += '<input class="loggedInUser" type="hidden" id="modifyGoalId" value="' + dataValue._id + '">';
        if ((dataValue.actual) - (dataValue.budgeted) >= 0) {
            buildTheHtmlOutput += '<div class="cellTrans modifyDescription" value="' + dataValue.description + '"><i class="fas fa-thumbs-up positive typeIcon"></i>' + dataValue.description + '</div>';
        } else {
            buildTheHtmlOutput += '<div class="cellTrans modifyDescription" value="' + dataValue.description + '"><i class="fas fa-thumbs-down negative typeIcon"></i>' + dataValue.description + '</div>';
        }
        buildTheHtmlOutput += '<div class="cellTrans modifyDate" value="' + dataValue.date + '">' + dataValue.date + '</div>';
        buildTheHtmlOutput += '<div class="cellTrans modifyBudgeted" value="' + dataValue.budgeted + '">$' + dataValue.budgeted + ' </div>';
        buildTheHtmlOutput += '<div class="cellTrans modifyActual" value="' + dataValue.actual + '">$' + dataValue.actual + '</div>';
        if ((dataValue.actual - dataValue.budgeted) >= 0) {
            buildTheHtmlOutput += '<div class="cellTrans positive ">$' + (dataValue.actual - dataValue.budgeted).toFixed(2) + '</div>';
        } else if ((dataValue.actual - dataValue.budgeted) < 0) {
            buildTheHtmlOutput += '<div class="cellTrans negative ">$' + (dataValue.actual - dataValue.budgeted).toFixed(2) + '</div>';
        }
        buildTheHtmlOutput += '<div class="cellTrans">';
        buildTheHtmlOutput += '<a class="tableTriggerGoalButton" href=""><i class="fas fa-pen-square tableIcons"></i></a>';
        buildTheHtmlOutput += '<a class="jsDeleteGoalButton" href=""><i class="fas fa-trash-alt tableIcons"></i></a>';
        buildTheHtmlOutput += '</div>';

        buildTheHtmlOutput += '</div>';
    });

    buildTheHtmlOutput += '<div class="row budgetTotalContainer" id="goalTotal">';
    buildTheHtmlOutput += '<div class="cellTrans">Totals</div>';
    buildTheHtmlOutput += '<div class="cellTrans"> </div>';
    buildTheHtmlOutput += '<div class="cellTrans" id="goalBudgetedTotal">$' + goalBudgetTotal.toFixed(2) + '</div>';
    buildTheHtmlOutput += '<div class="cellTrans" id="goalActualTotal">$' + goalActualTotal.toFixed(2) + '</div>';
    if ((goalActualTotal - goalBudgetTotal) >= 0) {
        buildTheHtmlOutput += '<div class="cellTrans positive" id="goalTotal">$' + goalDifferenceTotal.toFixed(2) + '</div>';
    } else if ((goalActualTotal - goalBudgetTotal) < 0) {
        buildTheHtmlOutput += '<div class="cellTrans negative" id="goalTotal">$' + goalDifferenceTotal.toFixed(2) + '</div>';
    }
    buildTheHtmlOutput += '<div class="cellTrans"> </div>';
    buildTheHtmlOutput += '</div>';
    buildTheHtmlOutput += '</div>';


    $(".homeSectionsTable").html(buildTheHtmlOutput);
};

//edited goal output
function displayEditedGoalForm(dataOutput) {
    var buildTheHtmlOutput = "";

    buildTheHtmlOutput += '<form class="jsEditedGoalForm" method="POST">';
    buildTheHtmlOutput += '<h2 class="loginTitle"><i class="fas fa-tasks logos formIcons"></i> Edit Goal</h2>';
    $.each(dataOutput, function (dataKey, dataValue) {
        //        console.log(dataValue);

        buildTheHtmlOutput += '<input class="loggedInUser" id="modifyGoalId" type="hidden" value="' + dataValue._id + '"><br>';

        buildTheHtmlOutput += '<div class="demoContainer">';
        buildTheHtmlOutput += '<div class="formGroup">';
        buildTheHtmlOutput += '<label class="label" for="goalDescription">Description</label>';
        buildTheHtmlOutput += '<input class="formControl" id="editGoalDescription" type="text" name="description" value="' + dataValue.description + '" required>';
        buildTheHtmlOutput += '</div>';

        buildTheHtmlOutput += '<div class="formGroup">';
        buildTheHtmlOutput += '<label class="label" for="date">Date</label>';
        buildTheHtmlOutput += '<input class="formControl" id="editGoalDate" type="string" name="date" value="' + dataValue.date + '" required>';
        buildTheHtmlOutput += '</div>';

        buildTheHtmlOutput += '<div class="formGroup">';
        buildTheHtmlOutput += '<label class="label" for="budgetedGoal">Budgeted($)</label>';
        buildTheHtmlOutput += '<input class="formControl" id="editBudgetedGoal" type="string" name="budgeted" min="0.00" max="100,000.00" step="1.00" value="' + dataValue.budgeted + '" required>';
        buildTheHtmlOutput += '</div>';

        buildTheHtmlOutput += '<div class="formGroup">';
        buildTheHtmlOutput += '<label class="label" for="actualGoal">Actual($)</label>';
        buildTheHtmlOutput += '<input class="formControl" id="editActualGoal" type="string" name="actual" min="0.00" max="100,000.00" step="1.00" value="' + dataValue.actual + '" required>';
        buildTheHtmlOutput += '</div>';
    });
    buildTheHtmlOutput += '<div class="formButtonsContainer">';
    buildTheHtmlOutput += '<button class="formButton" id="editSaveGoalForm" type="submit">Save</button>';
    buildTheHtmlOutput += '<button class="formButton" id="editCancelGoalForm" type="submit">Cancel</button>';
    buildTheHtmlOutput += '</div>';
    buildTheHtmlOutput += '</div>';
    buildTheHtmlOutput += '</form>';


    $(".editedGoalsOutterContainer").html(buildTheHtmlOutput);
};

//monthly budget totals and conditional statement
function prePopulateDateDropDown(inputDate) {
    let userId = $(".loginUserId").val();
    let inputDateArray = inputDate.split("-");
    let inputDateYear = inputDateArray[0];
    let inputDateMonth = inputDateArray[1];
    //    console.log(inputDateArray, inputDateYear, (parseInt(inputDateMonth) + 6));
    let buildTheHtmlOutput = "";

    buildTheHtmlOutput += '<h1 id = "budgetTitle"> <i class = "fas fa-balance-scale logos"> </i> Monthly Budgets</h1>';
    buildTheHtmlOutput += '<select class = "jsSelectMonth" >';
    //    for loop for the last 6 months and the next 6 months
    for (let thisMonth = (parseInt(inputDateMonth) - 12); thisMonth <= (parseInt(inputDateMonth) + 12); thisMonth++) {
        //convert the display month and year from the automaticaly generated values above
        let thisDisplayMonth = 0;
        let thisDisplayYear = parseInt(inputDateYear);
        if (thisMonth == 0) {
            thisDisplayMonth = 12;
            thisDisplayYear = parseInt(inputDateYear) - 1;
        } else if (thisMonth < 0) {
            thisDisplayMonth = 12 + thisMonth;
            thisDisplayYear = parseInt(inputDateYear) - 1;
        } else if (thisMonth >= 13) {
            thisDisplayMonth = thisMonth - 12;
            thisDisplayYear = parseInt(inputDateYear) + 1;
        } else {
            thisDisplayMonth = thisMonth;
        }
        //        select the current month in the dropp down
        if ((thisDisplayYear == date.getFullYear()) && (thisDisplayMonth == (parseInt(date.getMonth()) + 1))) {
            buildTheHtmlOutput += '<option value = "' + thisDisplayYear + '-' + addLeadingZeroToMonthNumbers((thisDisplayMonth - 1)) + '" id = "select-' + thisDisplayYear + '-' + addLeadingZeroToMonthNumbers((thisDisplayMonth - 1)) + '" selected>';
        } else {
            buildTheHtmlOutput += '<option value = "' + thisDisplayYear + '-' + addLeadingZeroToMonthNumbers((thisDisplayMonth - 1)) + '"  id = "select-' + thisDisplayYear + '-' + addLeadingZeroToMonthNumbers((thisDisplayMonth - 1)) + '">';
        }
        buildTheHtmlOutput += convertMonthNumberToMonthWord(thisDisplayMonth) + ' ' + thisDisplayYear;

        buildTheHtmlOutput += '</option>';
        getDifferenceByUserByMonth(userId, (thisDisplayYear + '-' + addLeadingZeroToMonthNumbers((thisDisplayMonth - 1))));
    }

    buildTheHtmlOutput += '</select>';

    $(".monthlyBudgetTotals").html(buildTheHtmlOutput);
};

function getDifferenceByUserByMonth(userId, date) {
    $.ajax({
            type: "GET",
        url: 'https://budget-buddy-react-capstone.herokuapp.com/budget-by-month/' + userId + '/' + date,
            dataType: 'json',
        })
        .done(function (dataOutput) {
            //        console.log(dataOutput);
            displayDifferenceByUserByMonth(dataOutput.budgets, date);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function displayDifferenceByUserByMonth(dataOutput, date) {
    //    console.log(dataOutput);
    //define a value for the total difference per month
    let monthTotalDifference = 0;
    //    parse the results object
    $.each(dataOutput, function (dataKey, dataValue) {
        //if the data is income create the month difference as actual - budgeted
        if (dataValue.type == "income") {
            monthTotalDifference += parseFloat(dataValue.actual) - parseFloat(dataValue.budgeted);
        }
        //if the data is expense create the month difference as budgeted - actual
        else {
            monthTotalDifference += parseFloat(dataValue.budgeted) - parseFloat(dataValue.actual);
        }
    });
    //    console.log(monthTotalDifference);
    //get the existing value of the select
    let existingText = $("#select-" + date).text();
    //and add the total difference per month to it
    $("#select-" + date).text(existingText + " (" + monthTotalDifference.toFixed(2) + ")");

}

function displayBudgetByMonth(userId, date) {
    //    console.log(userId, date);
    $.ajax({
            type: "GET",
        url: 'https://budget-buddy-react-capstone.herokuapp.com/budget-by-month/' + userId + '/' + date,
            dataType: 'json',
        })
        .done(function (dataOutput) {
            //            console.log(dataOutput);
            //displays the external api json object in the console
            displayBudgetResult(dataOutput.budgets);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//when another month is slected from the dropp down; show budget related to that month
$(document).on('change', '.jsSelectMonth', function (event) {
    event.preventDefault();
    let userId = $(".loginUserId").val();
    //display you are over or under budget
    displayBudgetByMonth(userId, this.value);
})


//budget html output
function displayBudgetResult(dataOutput) {

    var buildTheHtmlOutput = "";

    buildTheHtmlOutput += '<div class="row rowTitle">';
    buildTheHtmlOutput += '<div class="cellTrans">Descritpion</div>';
    buildTheHtmlOutput += '<div class="cellTrans">Date</div>';
    buildTheHtmlOutput += '<div class="cellTrans">Budgeted</div>';
    buildTheHtmlOutput += '<div class="cellTrans">Actual</div>';
    buildTheHtmlOutput += '<div class="cellTrans">Difference</div>';
    buildTheHtmlOutput += '<div class="cellTrans">Action</div>';
    buildTheHtmlOutput += '</div>';

    let budgetBudgetTotal = 0;
    let budgetActualTotal = 0;
    let budgetDifferenceTotal = 0;

    $.each(dataOutput, function (dataKey, dataValue) {
        //        console.log(dataValue);
        buildTheHtmlOutput += '<div class="row">';

        buildTheHtmlOutput += '<input type="hidden" id="modifyBudgetId" value="' + dataValue._id + '">';
        buildTheHtmlOutput += '<input type="hidden" class="modifyBudgetType" value="' + dataValue.type + '">';

        if (dataValue.type == 'expense') {
            buildTheHtmlOutput += '<div class="cellTrans modifyBudgetDescription"><i class="fas fa-level-down-alt typeIcon negative"></i>' + dataValue.description + '</div>';
        } else {
            buildTheHtmlOutput += '<div class="cellTrans modifyBudgetDescription"><i class="fas fa-level-up-alt typeIcon positive"></i>' + dataValue.description + '</div>';
        }
        buildTheHtmlOutput += '<div class="cellTrans modifyBudgetDate">' + dataValue.date + '</div>';
        //budgeted amount
        if (dataValue.type === 'expense') {
            buildTheHtmlOutput += '<div class="cellTrans modifyBudgetBudgeted">$' + dataValue.budgeted + '</div>';
        } else {
            buildTheHtmlOutput += '<div class="cellTrans modifyBudgetBudgeted">$' + dataValue.budgeted + '</div>';
        }
        //actual amount
        if (dataValue.type === 'expense') {
            buildTheHtmlOutput += '<div class="cellTrans modifyBudgetActual">$' + dataValue.actual + '</div>';
        } else {
            buildTheHtmlOutput += '<div class="cellTrans modifyBudgetActual">$' + dataValue.actual + '</div>';
        }
        //difference between budgeted and actual
        if (dataValue.type === 'expense' && ((dataValue.budgeted - dataValue.actual) < 0)) {
            buildTheHtmlOutput += '<div class="cellTrans negative ">$' + (dataValue.budgeted - dataValue.actual).toFixed(2) + '</div>';
        } else if (dataValue.type === 'expense' && ((dataValue.budgeted - dataValue.actual) > 0)) {
            buildTheHtmlOutput += '<div class="cellTrans positive ">$' + (dataValue.budgeted - dataValue.actual).toFixed(2) + '</div>';
        } else if (dataValue.type === 'expense' && ((dataValue.budgeted - dataValue.actual) == 0)) {
            buildTheHtmlOutput += '<div class="cellTrans middle ">$' + (dataValue.budgeted - dataValue.actual).toFixed(2) + '</div>';
        } else if (dataValue.type === 'income' && ((dataValue.actual - dataValue.budgeted) > 0)) {
            buildTheHtmlOutput += '<div class="cellTrans  positive ">$' + (dataValue.actual - dataValue.budgeted).toFixed(2) + '</div>';
        } else if (dataValue.type === 'income' && ((dataValue.actual - dataValue.budgeted) < 0)) {
            buildTheHtmlOutput += '<div class="cellTrans negative ">$' + (dataValue.actual - dataValue.budgeted).toFixed(2) + '</div>';
        } else if (dataValue.type === 'income' && ((dataValue.actual - dataValue.budgeted) == 0)) {
            buildTheHtmlOutput += '<div class="cellTrans middle ">$' + (dataValue.actual - dataValue.budgeted).toFixed(2) + '</div>';
        }
        //continously adding the values together for actual and  budgeted
        if (dataValue.type === 'expense') {
            budgetDifferenceTotal += parseFloat(dataValue.budgeted) - parseFloat(dataValue.actual);
            budgetBudgetTotal = budgetBudgetTotal - parseFloat(dataValue.budgeted);
            budgetActualTotal = budgetActualTotal - parseFloat(dataValue.actual);
        } else {
            budgetDifferenceTotal += parseFloat(dataValue.actual) - parseFloat(dataValue.budgeted);
            budgetBudgetTotal = budgetBudgetTotal + parseFloat(dataValue.budgeted);
            budgetActualTotal = budgetActualTotal + parseFloat(dataValue.actual);
        }
        //        console.log(budgetDifferenceTotal);
        buildTheHtmlOutput += '<a class="tableTriggerBudgetButton" href=""><i class="fas fa-pen-square tableIcons"></i></a>';
        buildTheHtmlOutput += '<a class="jsDeleteBudgetButton" href=""><i class="fas fa-trash-alt tableIcons"></i></a>';
        buildTheHtmlOutput += '</div>';

        buildTheHtmlOutput += '</div>';
    });
    buildTheHtmlOutput += '<div class="row budgetTotalContainer" id="budgetTotal">';
    buildTheHtmlOutput += '<div class="cellTrans">Totals</div>';
    buildTheHtmlOutput += '<div class="cellTrans"> </div>';
    buildTheHtmlOutput += '<div class="cellTrans">-(' + budgetBudgetTotal.toFixed(2) + ')</div>';
    buildTheHtmlOutput += '<div class="cellTrans">' + budgetActualTotal.toFixed(2) + ' </div>';
    if (budgetDifferenceTotal < 0) {
        buildTheHtmlOutput += '<div class="cellTrans negative" id="goalTotal">$' + budgetDifferenceTotal.toFixed(2) + '</div>';
    } else if (budgetDifferenceTotal >= 0) {
        buildTheHtmlOutput += '<div class="cellTrans positive" id="goalTotal">$' + budgetDifferenceTotal.toFixed(2) + '</div>';
    }
    buildTheHtmlOutput += '<div class="cellTrans"> </div>';
    buildTheHtmlOutput += '</div>';


    $(".table").html(buildTheHtmlOutput);
};

//edited budget output
function displayEditedBudgetForm(dataOutput) {
    var buildTheHtmlOutput = "";

    buildTheHtmlOutput += '<form class="optionsForm" method="POST">';
    buildTheHtmlOutput += '<h2 class="loginTitle"><i class="fas fa-balance-scale logos"></i> Edit Budget</h2>';

    $.each(dataOutput, function (dataKey, dataValue) {
        //        console.log(dataValue);
        //        console.log(dataValue.description);

        buildTheHtmlOutput += '<input class="loggedInUser" id="modifyBudgetId" type="hidden" value="' + dataValue[0]._id + '"><br>';

        buildTheHtmlOutput += '<div class="demoContainer">';
        buildTheHtmlOutput += '<div class="formGroup">';
        buildTheHtmlOutput += '<label class="label" for="description">Description</label>';
        buildTheHtmlOutput += '<input class="formControl" id="editBudgetDescription" type="text"  name="description" value="' + dataValue[0].description + '" required>';
        buildTheHtmlOutput += '</div>';

        buildTheHtmlOutput += '<div class="formGroup">';
        buildTheHtmlOutput += '<label class="label" for="date">Date</label>';
        buildTheHtmlOutput += '<input class="formControl" id="editBudgetDate" type="string"  name="date" value="' + dataValue[0].date + '" required>';
        buildTheHtmlOutput += '</div>';

        buildTheHtmlOutput += '<div class="formGroup">';
        buildTheHtmlOutput += '<label class="label" for="budgeted">Budgeted($)</label>';
        buildTheHtmlOutput += '<input class="formControl" id="editBudgetBudgeted" type="string"  name="budgeted" min="0.00" max="100,000.00" step="1.00" value="' + dataValue[0].budgeted + '" required>';
        buildTheHtmlOutput += '</div>';

        buildTheHtmlOutput += '<div class="formGroup">';
        buildTheHtmlOutput += '<label class="label" for="actual">Actual($)</label>';
        buildTheHtmlOutput += '<input class="formControl" id="editBudgetActual" type="string"  name="actual" min="0.00" max="100,000.00" step="1.00" value="' + dataValue[0].actual + '" required>';
        buildTheHtmlOutput += '</div>';

        buildTheHtmlOutput += '<div class="formGroup">';
        buildTheHtmlOutput += '<label class="label" for="type">Type</label>';
        buildTheHtmlOutput += '<select id="editBudgetType" type="string" name="type" value="' + dataValue[0].type + '">';
        if (dataValue[0].type == "expense") {
            buildTheHtmlOutput += '<option value="expense" selected>Expense</option>';
            buildTheHtmlOutput += '<option value="income">Income</option>';
        } else {
            buildTheHtmlOutput += '<option value="expense">Expense</option>';
            buildTheHtmlOutput += '<option value="income" selected>Income</option>';
        }
        buildTheHtmlOutput += '</select>';
        buildTheHtmlOutput += '</div>';
    });

    buildTheHtmlOutput += '<div class="formButtonsContainer">';
    buildTheHtmlOutput += '<button class="formButton" id="editSaveBudgetForm" type="submit">Save</button>';
    buildTheHtmlOutput += '<button class="formButton" id="editCancelBudgetForm" type="submit">Cancel</button>';
    buildTheHtmlOutput += '</div>';
    buildTheHtmlOutput += '</div>';
    buildTheHtmlOutput += '</form>';


    $(".editBudgetForms").html(buildTheHtmlOutput);
};


$(document).ready(function () {
    //    console.log(currentMonth, currentYear);
    $(".introScreen").show();
    $(".quickView").show();
    $(".loginScreen").hide();
    $(".registerScreen").hide();
    $(".homeScreen").hide();
    $(".homeScreenBudget").hide();
    $(".homeScreenGoals").hide();
    $(".editHomeScreenBudget").hide();
    $(".editHomeScreenGoals").hide();
    $(".navList").hide();
});

//LOGIN button
$(document).on("click", ".jsLoginButton", function (event) {
    event.preventDefault();
    $(".introScreen").hide();
    $(".quickView").hide();
    $(".loginScreen").show();
    $(".registerScreen").hide();
    $(".homeScreen").hide();
    $(".homeScreenBudget").hide();
    $(".homeScreenGoals").hide();
    $(".editHomeScreenBudget").hide();
    $(".editHomeScreenGoals").hide();
});

//LOGIN link button
$(document).on("click", ".loginLink", function (event) {
    event.preventDefault();
    $(".introScreen").hide();
    $(".quickView").hide();
    $(".loginScreen").show();
    $(".registerScreen").hide();
    $(".homeScreen").hide();
    $(".homeScreenBudget").hide();
    $(".homeScreenGoals").hide();
    $(".editHomeScreenBudget").hide();
    $(".editHomeScreenGoals").hide();
});

//REGISTER button
$(document).on("click", ".jsRegisterButton", function (event) {
    event.preventDefault();
    $(".introScreen").hide();
    $(".quickView").hide();
    $(".loginScreen").hide();
    $(".registerScreen").show();
    $(".homeScreen").hide();
    $(".homeScreenBudget").hide();
    $(".homeScreenGoals").hide();
    $(".editHomeScreenBudget").hide();
    $(".editHomeScreenGoals").hide();
});

//user LOGGING IN API
$(document).on("click", ".jsSubmitloginButton", function (event) {
    event.preventDefault();
    //get input from the user//
    let name = $('#loginFirstName').val();
    let password = $('#loginPassword').val();
    let userId = $('.loginUserId').val();
    //validate the input//
    if (name.length == 0) {
        alert('Please add name!');
    } else if (password.length == 0) {
        alert('Please add password!');
    } else {
        //if input is valid; sign in the user//
        const loginUserObject = {
            name: name,
            password: password,
            userId: loginUserId
        };
        //        console.log(loginUserObject);
        // create ajax call to sign in the user//
        $.ajax({
                type: 'POST',
            url: 'https://budget-buddy-react-capstone.herokuapp.com/users/signin',
                dataType: 'json',
                data: JSON.stringify(loginUserObject),
                contentType: 'application/json'
            })
            //if sign in is successful
            .done(function (result) {
                $(".navList").show();
                loginUserName = result.name;
                loginUserId = result._id;
                displayBudgets(loginUserId);
                displayGoals(loginUserId);
                $(".resultTitle span").text(titleCase(result.name) + "'s ");
                $(".loginUserId").val(loginUserId);
                $(".loginUserName").val(loginUserName);
                prePopulateDateDropDown(currentYear + "-" + currentMonth);
                //prepopulate the budget table with the current month values for the loggedin user
                displayBudgetByMonth(loginUserId, currentYear + "-" + currentMonth)
                $(".introScreen").hide();
                $(".quickView").hide();
                $(".loginScreen").hide();
                $(".registerScreen").hide();
                $(".homeScreen").show();
                $(".homeScreenBudget").hide();
                $(".homeScreenGoals").hide();
                $(".editHomeScreenBudget").hide();
                $(".editHomeScreenGoals").hide();
            })
            //if sign in fails
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };

});

//user REGISTERING API
$(document).on("click", ".jsSubmitRegisterButton", function (event) {
    event.preventDefault();
    //get input from the user//
    let name = $('#registerName').val();
    let password = $('#registerPassword').val();
    let confirmPassword = $('#registerConfirmPassword').val();
    //validate the input//
    if (name.length == 0) {
        alert('Please add name!');
    } else if (password.length == 0) {
        alert('Please add password!');
    } else if (password !== confirmPassword) {
        alert('Passwords must match!');
    } else {
        //check if user is duplicated
        $.ajax({
                type: "GET",
            url: 'https://budget-buddy-react-capstone.herokuapp.com/check-registration-name/' + name,
                dataType: 'json',
            })
            .done(function (dataOutput) {
                //displays the external api json object in the console
                //                console.log(dataOutput);
                if (dataOutput.users.length > 0) {
                    alert('Duplicated first name, try a different name');
                } else {
                    //if input is valid; register the user//
                    const newUserObject = {
                        name: name,
                        password: password
                    };
                    //                    console.log(newUserObject);
                    // create ajax call to register the user//
                    $.ajax({
                            type: 'POST',
                        url: 'https://budget-buddy-react-capstone.herokuapp.com/users/create',
                            dataType: 'json',
                            data: JSON.stringify(newUserObject),
                            contentType: 'application/json'
                        })
                        //if registation is successful
                        .done(function (result) {
                            loginUserId = result._id;
                            $(".loginUserId").val(loginUserId);
                            alert('Thanks for registering! You may now login with your username and password.');
                            $(".introScreen").hide();
                            $(".quickView").hide();
                            $(".loginScreen").show();
                            $(".registerScreen").hide();
                            $(".homeScreen").hide();
                            $(".homeScreenBudget").hide();
                            $(".homeScreenGoals").hide();
                            $(".editHomeScreenBudget").hide();
                            $(".editHomeScreenGoals").hide();
                        })
                        //if registration fails
                        .fail(function (jqXHR, error, errorThrown) {
                            console.log(jqXHR);
                            console.log(error);
                            console.log(errorThrown);
                        });
                }
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });

    };
});

//NAV item (HOME)
$(document).on("click", ".jsHomeNav", function (event) {
    event.preventDefault();
    $(".introScreen").hide();
    $(".quickView").hide();
    $(".loginScreen").hide();
    $(".registerScreen").hide();
    $(".homeScreen").show();
    $(".homeScreenBudget").hide();
    $(".homeScreenGoals").hide();
    $(".editHomeScreenBudget").hide();
    $(".editHomeScreenGoals").hide();
});

//NAV item (BUDGET)
$(document).on("click", ".jsBudgetNav", function (event) {
    event.preventDefault();
    $(".introScreen").hide();
    $(".quickView").hide();
    $(".loginScreen").hide();
    $(".registerScreen").hide();
    $(".homeScreen").hide();
    $(".homeScreenBudget").show();
    $(".homeScreenGoals").hide();
    $(".editHomeScreenBudget").hide();
    $(".editHomeScreenGoals").hide();
});

//NAV item (GOAL)
$(document).on("click", ".jsGoalNav", function (event) {
    event.preventDefault();
    $(".introScreen").hide();
    $(".quickView").hide();
    $(".loginScreen").hide();
    $(".registerScreen").hide();
    $(".homeScreen").hide();
    $(".homeScreenBudget").hide();
    $(".homeScreenGoals").show();
    $(".editHomeScreenBudget").hide();
    $(".editHomeScreenGoals").hide();
});

//NAV item (LOGOUT)
$(document).on("click", ".jsLogoutNav", function (event) {
    event.preventDefault();
    location.reload();
});

//EDIT GOAL ICON button API
$(document).on("click", ".tableTriggerGoalButton", function (event) {
    event.preventDefault();

    let selectedGoal = $(this).parent().parent().find("#modifyGoalId").val();

    //    console.log(selectedGoal);
    $.ajax({
            type: "GET",
        url: 'https://budget-buddy-react-capstone.herokuapp.com/goal/' + selectedGoal,
            dataType: 'json',
        })
        .done(function (results) {
            //            console.log(results);
            displayEditedGoalForm(results);
            $(".introScreen").hide();
            $(".quickView").hide();
            $(".loginScreen").hide();
            $(".registerScreen").hide();
            $(".homeScreen").hide();
            $(".homeScreenBudget").hide();
            $(".homeScreenGoals").hide();
            $(".editHomeScreenBudget").hide();
            $(".editHomeScreenGoals").show();

        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

});

//DELETE GOAL ICON button
$(document).on("click", ".jsDeleteGoalButton", function (event) {
    event.preventDefault();
    $(".introScreen").hide();
    $(".quickView").hide();
    $(".loginScreen").hide();
    $(".registerScreen").hide();
    $(".homeScreen").show();
    $(".homeScreenBudget").hide();
    $(".homeScreenGoals").hide();
    $(".editHomeScreenBudget").hide();
    $(".editHomeScreenGoals").hide();
});

//EDIT BUDGET ICON button API
$(document).on("click", ".tableTriggerBudgetButton", function (event) {
    event.preventDefault();

    let selectedBudget = $(this).parent().find("#modifyBudgetId").val();
    //    console.log(selectedBudget);
    $.ajax({
            type: "GET",
        url: 'https://budget-buddy-react-capstone.herokuapp.com/budget/' + selectedBudget,
            dataType: 'json',
        })
        .done(function (results) {
            //            console.log(results);
            displayEditedBudgetForm(results);
            $(".introScreen").hide();
            $(".quickView").hide();
            $(".loginScreen").hide();
            $(".registerScreen").hide();
            $(".homeScreen").hide();
            $(".homeScreenBudget").hide();
            $(".homeScreenGoals").hide();
            $(".editHomeScreenBudget").show();
            $(".editHomeScreenGoals").hide();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

});

//DELETE BUDGET ICON button
$(document).on("click", ".jsDeleteBudgetButton", function (event) {
    event.preventDefault();
    $(".introScreen").hide();
    $(".quickView").hide();
    $(".loginScreen").hide();
    $(".registerScreen").hide();
    $(".homeScreen").show();
    $(".homeScreenBudget").hide();
    $(".homeScreenGoals").hide();
    $(".editHomeScreenBudget").hide();
    $(".editHomeScreenGoals").hide();
});

//ADD BUDGET transaction FORM button
$(document).on("click", "#addBudgetFormButton", function (event) {
    event.preventDefault();
    $(".introScreen").hide();
    $(".quickView").hide();
    $(".loginScreen").hide();
    $(".registerScreen").hide();
    $(".homeScreen").hide();
    $(".homeScreenBudget").show();
    $(".homeScreenGoals").hide();
    $(".editHomeScreenBudget").hide();
    $(".editHomeScreenGoals").hide();
});

//ADD GOAL FORM button
$(document).on("click", "#addGoalFormButton", function (event) {
    event.preventDefault();
    $(".introScreen").hide();
    $(".quickView").hide();
    $(".loginScreen").hide();
    $(".registerScreen").hide();
    $(".homeScreen").hide();
    $(".homeScreenBudget").hide();
    $(".homeScreenGoals").show();
    $(".editHomeScreenBudget").hide();
    $(".editHomeScreenGoals").hide();
});

//CREATE BUDGETS for user API
$(document).on("click", "#saveBudgetForm", function (event) {
    event.preventDefault();
    //get input from the user//
    let description = $('#budgetDescription').val();
    let date = $('#budgetDate').val();
    let budgeted = $('#budgetBudgeted').val();
    let actual = $('#budgetActual').val();
    let type = $('#budgetType').val();
    let userIdHidden = $('.loginUserId').val();
    //validate the input//
    if (description.length == 0) {
        alert('Please add a description!');
    } else if (date.length == 0) {
        alert('Please add a date!');
    } else if (isValidDate(date) == false) {
        alert('Please add a valid date (format YYYY-MM-DD)!');
    } else if (budgeted.length == 0) {
        alert('Please add a budget amount!');
    } else if (actual.length == 0) {
        alert('Please add an actual amount!');
    } else if (type.length == 0) {
        alert('Please add a type!');
    } else {
        //if input is valid; create the new recipe//
        const newBudgetObject = {
            description: description,
            date: date,
            budgeted: budgeted,
            actual: actual,
            type: type,
            userId: userIdHidden
        };
        // create ajax call to create the new recipe//
        $.ajax({
                type: 'POST',
            url: 'https://budget-buddy-react-capstone.herokuapp.com/budget/create',
                dataType: 'json',
                data: JSON.stringify(newBudgetObject),
                contentType: 'application/json'
            })
            //if budget creation is successful
            .done(function (result) {
                displayBudgetByMonth(loginUserId, currentYear + "-" + currentMonth);
                prePopulateDateDropDown(currentYear + "-" + currentMonth);
                //                console.log(result);
                $(".introScreen").hide();
                $(".quickView").hide();
                $(".loginScreen").hide();
                $(".registerScreen").hide();
                $(".homeScreen").show();
                $(".homeScreenBudget").hide();
                $(".homeScreenGoals").hide();
                $(".editHomeScreenBudget").hide();
                $(".editHomeScreenGoals").hide();
                $('#myBudgetForm')[0].reset();
            })
            //if recipe creation fails
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

//EDIT BUDGET API
$(document).on("click", "#editSaveBudgetForm", function (event) {
    event.preventDefault();
    let modifyBudgetId = $(this).parent().parent().parent().find('#modifyBudgetId').val();
    let modifyBudgetDescription = $('#editBudgetDescription').val();
    let modifyBudgetDate = $('#editBudgetDate').val();
    let modifyBudgetBudgeted = $('#editBudgetBudgeted').val();
    let modifyBudgetActual = $('#editBudgetActual').val();
    let modifyBudgetType = $('#editBudgetType').val();

    const modifyBudgetObject = {
        description: modifyBudgetDescription,
        date: modifyBudgetDate,
        budgeted: modifyBudgetBudgeted,
        actual: modifyBudgetActual,
        type: modifyBudgetType,
        budgetId: modifyBudgetId
    };
    //    console.log(modifyBudgetObject);
    // create ajax call to save the recipe//
    $.ajax({
            type: 'PUT',
        url: 'https://budget-buddy-react-capstone.herokuapp.com/budget/' + modifyBudgetId,
            dataType: 'json',
            data: JSON.stringify(modifyBudgetObject),
            contentType: 'application/json'
        })
        //if save is successful
        .done(function (result) {
            //            console.log(result);
            displayBudgetByMonth(loginUserId, currentYear + "-" + currentMonth);
            prePopulateDateDropDown(currentYear + "-" + currentMonth);
            alert('Budget has been saved');
            $(".introScreen").hide();
            $(".quickView").hide();
            $(".loginScreen").hide();
            $(".registerScreen").hide();
            $(".homeScreen").show();
            $(".homeScreenBudget").hide();
            $(".homeScreenGoals").hide();
            $(".editHomeScreenBudget").hide();
            $(".editHomeScreenGoals").hide();

        })
        //if save fails
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

//CANCEL button when ADDING BUDGET item
$(document).on("click", "#cancelBudgetForm", function (event) {
    event.preventDefault();
    $(".introScreen").hide();
    $(".quickView").hide();
    $(".loginScreen").hide();
    $(".registerScreen").hide();
    $(".homeScreen").show();
    $(".homeScreenBudget").hide();
    $(".homeScreenGoals").hide();
    $(".editHomeScreenBudget").hide();
    $(".editHomeScreenGoals").hide();
    displayBudgetByMonth;
});

//CANCEL button when ADDING BUDGET item from edited form
$(document).on("click", "#editCancelBudgetForm", function (event) {
    event.preventDefault();
    $(".introScreen").hide();
    $(".quickView").hide();
    $(".loginScreen").hide();
    $(".registerScreen").hide();
    $(".homeScreen").show();
    $(".homeScreenBudget").hide();
    $(".homeScreenGoals").hide();
    $(".editHomeScreenBudget").hide();
    $(".editHomeScreenGoals").hide();
    displayBudgetByMonth;
});

//DELETE BUDGET API
$(document).on("click", ".jsDeleteBudgetButton", function (event) {
    event.preventDefault();
    let modifyBudgetId = $(this).parent().find('#modifyBudgetId').val();
    //    console.log(modifyBudgetId);
    $.ajax({
            type: 'DELETE',
        url: 'https://budget-buddy-react-capstone.herokuapp.com/budgets/' + modifyBudgetId,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            displayBudgetByMonth(loginUserId, currentYear + "-" + currentMonth);
            alert('entry has been deleted');
            $(".introScreen").hide();
            $(".quickView").hide();
            $(".loginScreen").hide();
            $(".registerScreen").hide();
            $(".homeScreen").show();
            $(".homeScreenBudget").hide();
            $(".homeScreenGoals").hide();
            $(".editHomeScreenBudget").hide();
            $(".editHomeScreenGoals").hide();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

//CREATE GOALS for user API
$(document).on("click", "#saveGoalForm", function (event) {
    event.preventDefault();
    //get input from the user//
    let description = $('#goalDescription').val();
    let date = $("#goalDate").val();
    let budgeted = $('#budgetedGoal').val();
    let actual = $('#actualGoal').val();
    let userIdHidden = $('.loginUserId').val();
    //validate the input//
    if (description.length == 0) {
        alert('Please add a description!');
    } else if (date.length == 0) {
        alert('Please add a date!');
    } else if (isValidDate(date) == false) {
        alert('Please add a valid date (format YYYY-MM-DD)!');
    } else if (budgeted.length == 0) {
        alert('Please add a budget amount!');
    } else if (actual.length == 0) {
        alert('Please add an actual amount!');
    } else {
        //if input is valid; create the new recipe//
        const newGoalObject = {
            description: description,
            date: date,
            budgeted: budgeted,
            actual: actual,
            userId: userIdHidden
        };
        // create ajax call to create the new recipe//
        $.ajax({
                type: 'POST',
            url: 'https://budget-buddy-react-capstone.herokuapp.com/goal/create',
                dataType: 'json',
                data: JSON.stringify(newGoalObject),
                contentType: 'application/json'
            })
            //if budget creation is successful
            .done(function (result) {
                displayGoals(userIdHidden);
                $(".introScreen").hide();
                $(".quickView").hide();
                $(".loginScreen").hide();
                $(".registerScreen").hide();
                $(".homeScreen").show();
                $(".homeScreenBudget").hide();
                $(".homeScreenGoals").hide();
                $(".editHomeScreenBudget").hide();
                $(".editHomeScreenGoals").hide();
                $('#myGoalForm')[0].reset();
            })
            //if recipe creation fails
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

//EDIT GOALS API
$(document).on("click", "#editSaveGoalForm", function (event) {
    event.preventDefault();
    let modifyGoalId = $(this).parent().parent().parent().find("#modifyGoalId").val();
    let modifyGoalDescription = $('#editGoalDescription').val();
    let modifyGoalDate = $('#editGoalDate').val();
    let modifyGoalBudgeted = $('#editBudgetedGoal').val();
    let modifyGoalActual = $('#editActualGoal').val();

    const modifyGoalObject = {
        description: modifyGoalDescription,
        date: modifyGoalDate,
        budgeted: modifyGoalBudgeted,
        actual: modifyGoalActual,
        goalId: modifyGoalId
    };
    //    console.log(modifyGoalObject);
    // create ajax call to save the recipe//
    $.ajax({
            type: 'PUT',
        url: 'https://budget-buddy-react-capstone.herokuapp.com/goal/' + modifyGoalId,
            dataType: 'json',
            data: JSON.stringify(modifyGoalObject),
            contentType: 'application/json'
        })
        //if save is successful
        .done(function (result) {
            displayGoals(loginUserId);
            alert('goal has been saved');
            $(".introScreen").hide();
            $(".quickView").hide();
            $(".loginScreen").hide();
            $(".registerScreen").hide();
            $(".homeScreen").show();
            $(".homeScreenBudget").hide();
            $(".homeScreenGoals").hide();
            $(".editHomeScreenBudget").hide();
            $(".editHomeScreenGoals").hide();

        })
        //if save fails
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

//CANCEL button when ADDING GOAL item
$(document).on("click", "#cancelGoalForm", function (event) {
    event.preventDefault();
    $(".introScreen").hide();
    $(".quickView").hide();
    $(".loginScreen").hide();
    $(".registerScreen").hide();
    $(".homeScreen").show();
    $(".homeScreenBudget").hide();
    $(".homeScreenGoals").hide();
    $(".editHomeScreenBudget").hide();
    $(".editHomeScreenGoals").hide();
    displayBudgetByMonth;
});

//CANCEL button when ADDING GOAL item from edited form
$(document).on("click", "#editCancelGoalForm", function (event) {
    event.preventDefault();
    $(".introScreen").hide();
    $(".quickView").hide();
    $(".loginScreen").hide();
    $(".registerScreen").hide();
    $(".homeScreen").show();
    $(".homeScreenBudget").hide();
    $(".homeScreenGoals").hide();
    $(".editHomeScreenBudget").hide();
    $(".editHomeScreenGoals").hide();
    displayBudgetByMonth;
});

//DELETE GOAL API
$(document).on("click", ".jsDeleteGoalButton", function (event) {
    event.preventDefault();
    let modifyGoalId = $(this).parent().parent().parent().find('#modifyGoalId').val();
    //    console.log(modifyGoalId);
    $.ajax({
            type: 'DELETE',
        url: 'https://budget-buddy-react-capstone.herokuapp.com/goals/' + modifyGoalId,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            displayGoals(loginUserId);
            alert('entry has been deleted');
            $(".introScreen").hide();
            $(".quickView").hide();
            $(".loginScreen").hide();
            $(".registerScreen").hide();
            $(".homeScreen").show();
            $(".homeScreenBudget").hide();
            $(".homeScreenGoals").hide();
            $(".editHomeScreenBudget").hide();
            $(".editHomeScreenGoals").hide();
        })

        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

//show UNDER, OVER, EVEN condiotnal for specific months budget
//$(document).on("change", ".jsSelectMonth", function (event) {
//    event.preventDefault();
//    let budgetDifferenceTotal = $(this).parent().find('.jsSelectMonth option:selected').val();;
//    console.log(budgetDifferenceTotal);
//    if (budgetDifferenceTotal > 0) {
//        $("#budgetConditionalTitle").show();
//        $(".budgetConditionalOptionsPositive").show();
//        $(".budgetConditionalOptionsNegative").hide();
//        $(".budgetConditionalOptionsEven").hide();
//    } else if (budgetDifferenceTotal < 0) {
//        $("#budgetConditionalTitle").show();
//        $(".budgetConditionalOptionsPositive").hide();
//        $(".budgetConditionalOptionsNegative").show();
//        $(".budgetConditionalOptionsEven").hide();
//    } else {
//        $("#budgetConditionalTitle").show();
//        $(".budgetConditionalOptionsPositive").hide();
//        $(".budgetConditionalOptionsNegative").hide();
//        $(".budgetConditionalOptionsEven").show();
//    }
//
//});
