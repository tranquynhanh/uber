const ARRAY_UBER_X_cost = [8000, 12000, 10000]
const ARRAY_UBER_X_wait_cost = 2000;

const ARRAY_UBER_SUV_cost = [9000, 14000, 12000]
const ARRAY_UBER_SUV_wait_cost = 3000;

const ARRAY_UBER_BLACK_cost = [10000, 16000, 14000]
const ARRAY_UBER_BLACK_wait_cost = 4000;

function checkTypeofCar() {
    var uberX = document.getElementById("uberX")
    var uberSUV = document.getElementById("uberSUV")
    var uberBlack = document.getElementById("uberBlack")

    if (uberX.checked) {
        return "uberX";
    } else if (uberSUV.checked) {
        return "uberSUV";
    } else {
        return "uberBlack";
    }
}

function waitTimeCal(waitTime, waitCost) {
    var waitCostTotal = 0;
    if (waitTime >= 3) {
        waitCostTotal = Math.round(waitTime/3.0) * waitCost;
        console.log(waitCost)
        console.log(waitTime)
    }
    return waitCostTotal;
}

function costCal(distance, waitTime, ArrayPrice, waitCost) {
    var waitTotal = waitTimeCal(waitTime, waitCost);
    if (distance <= 1) {
        return ArrayPrice[0];
    } else if (distance > 1 && distance <= 20) {
        return ArrayPrice[0] + (distance - 1) * ArrayPrice[1] + waitTotal;
    } else if (distance > 20) {
        return ArrayPrice[0] + 19 * ArrayPrice[1]  + ( distance - 20) * ArrayPrice[2] + waitTotal; 
    }
}
var waitTime = document.getElementById("waitTime").value

function Cost() {
    var distance = document.getElementById("distance").value;
    var waitTime = document.getElementById("waitTime").value;

    distance = parseFloat(distance);
    waitTime = parseFloat(waitTime);
    var totalCost = 0;
    var typeOfCar = checkTypeofCar();
    switch (typeOfCar) {
        case "uberX":
            totalCost = costCal(distance, waitTime, ARRAY_UBER_X_cost, ARRAY_UBER_X_wait_cost);
            break;
        case "uberSUV":
            totalCost = costCal(distance, waitTime, ARRAY_UBER_SUV_cost, ARRAY_UBER_SUV_wait_cost);
            break;
        case "uberBlack": 
            totalCost = costCal(distance, waitTime, ARRAY_UBER_BLACK_cost, ARRAY_UBER_BLACK_wait_cost);
            break;  
        default:
            return ("Vui lòng chọn loại xe!!!!!!");  
    }
    return totalCost;
}

document.getElementById("btnTinhTien").onclick = function() {
    var cost = Cost();
    if(isNaN(cost)) {
        alert("Vui lòng chọn loại xe và quãng đường bạn muốn đi!!!");
    } else {
        document.getElementById("divThanhTien").style.display = "block";
        document.getElementById("xuatTien").innerHTML = cost;
    }
};

function renderRowDistanceDetails(carType, arrayDistance, arrayPrice, tblBody) {
    for (var i = 0; i < arrayDistance.length; i++) {
        var tr = document.createElement("tr");
        var tdCarType = document.createElement("td");
        var tdTime = document.createElement("td");
        var tdPriceEach = document.createElement("td");
        var tdAmount = document.createElement("td");

        tdCarType.innerHTML = carType;
        tdTime.innerHTML = arrayDistance[i] + " km";
        tdPriceEach.innerHTML = arrayPrice[i] + " vnd";
        tdAmount.innerHTML = arrayDistance[i] * arrayPrice[i] + " vnđ";
        console.log(tdAmount)
        tr.appendChild(tdCarType)
        tr.appendChild(tdTime)
        tr.appendChild(tdPriceEach)
        tr.appendChild(tdAmount)

        tblBody.appendChild(tr);
    }
}

function renderRowWaitTime(waitTime, waitCost,tblBody) {
    var waitCost = waitTimeCal(waitTime, waitCost);
    var trWaitTime = document.createElement("tr")

    var tdMinuteTitle = document.createElement("td")
    var tdMinute = document.createElement("td")
    var tdPriceEach = document.createElement("td")
    var tdAmount = document.createElement("td")

    tdMinuteTitle.innerHTML = "Thời gian chờ";
    tdMinute.innerHTML = waitTime + " phút";
    tdPriceEach.innerHTML = waitCost + " vnd";
    tdAmount.innerHTML = Math.round(waitTime/3.0) * waitCost + " vnđ";

    trWaitTime.appendChild(tdMinuteTitle)
    trWaitTime.appendChild(tdMinute)
    trWaitTime.appendChild(tdPriceEach)
    trWaitTime.appendChild(tdAmount)

    tblBody.appendChild(trWaitTime)
}

function renderRowTotal(total, tblBody) {
    var trTotal = document.createElement("tr")
    trTotal.className = "alert alert-success"

    var tdTotalTitle = document.createElement("td")
    tdTotalTitle.setAttribute("colspan", 3)
    var tdTotal = document.createElement("td")
    tdTotalTitle.innerHTML = "Tổng tiền";
    tdTotal.innerHTML = total + " vnđ";

    trTotal.appendChild(tdTotalTitle)
    trTotal.appendChild(tdTotal)

    tblBody.appendChild(trTotal)
}

function printBill(carType, distance, waitTime, waitCost, arrayPrice, total) {
    var tblBody = document.getElementById("tblBody");
    tblBody.innerHTML = ""

    if (distance <= 1) {
        renderRowDistanceDetails(carType, [1], arrayPrice,tblBody)
    } else if (distance > 1 && distance <= 20) {
        renderRowDistanceDetails(carType, [1, distance - 1], arrayPrice, tblBody)
    } else if (distance > 20) {
        renderRowDistanceDetails(carType, [1, 19, distance -20], arrayPrice, tblBody)
    }

    if (waitTime > 2) {
        renderRowWaitTime(waitTime, waitCost, tblBody);
    }
    renderRowTotal(total, tblBody);
}

document.getElementById("btnInHD").onclick = function() {
    var distance = document.getElementById("distance").value;
    var waitTime = document.getElementById("waitTime").value;
    var carType =  checkTypeofCar()
    var total = Cost();

    switch (carType) {
        case "uberX":
            printBill(carType, distance, waitTime, ARRAY_UBER_X_wait_cost, ARRAY_UBER_X_cost , total);
            break;
        case "uberSUV":
            printBill(carType, distance, waitTime, ARRAY_UBER_SUV_wait_cost, ARRAY_UBER_SUV_cost, total);
            break;
        case "uberBlack": 
            printBill(carType, distance, waitTime, ARRAY_UBER_BLACK_wait_cost, ARRAY_UBER_BLACK_cost, total);
            break;  
        default:
            return ("Vui lòng chọn loại xe!!!!!!");  
    }

}