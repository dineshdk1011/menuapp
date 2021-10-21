onload = async () => {
    const orderdata = await allOrders()
    if (orderdata.length !== 0) {
        for (var i = 0; i < orderdata.length; i++) {
            document.getElementById("allorders").innerHTML +=
                `
            <tr>
            <td>${orderdata[i].table}</td>
            <td>${orderdata[i].foodname}</td>
            <td>${orderdata[i].costomize.length == 0 ? "<span class='text-center'>-</span>" : `<a href='javascript:void(0)' id='${orderdata[i].orderid}' data-toggle="modal"
            data-target="#customeFood" onclick='costomizeFood(this)' > Costomize </a></td>`}
            <td>${orderdata[i].quantity}</td>
            <td>₹ ${orderdata[i].amount}</td>
            <td><button class='btn btn-success btn-xs' id='${orderdata[i].orderid}' onclick='removeFood(this)' >Complete</button></td>
            </tr>

            `
        }
    }
}

async function allOrders() {
    var allOrders = await axios.get("http://localhost:4001/order/").then((res) => { return res.data })
    return allOrders
}

costomizeFood = async (e) => {
    const allOrder = await allOrders()
    const orderid = e.id
    const customeFood = await allOrder.filter((order) => order.orderid == orderid)
    if (customeFood.length !== 0) {
        const { costomize, foodname } = customeFood[0]
        document.getElementById("customeFoodname").innerHTML = foodname
        document.getElementById("customeFoodli").innerHTML = ""
        costomize.forEach((custom) => {
            document.getElementById("customeFoodli").innerHTML += `<li class="list-group-item">${custom}</li>`
        })
    }
}

removeFood = async (e) => {
    const orderid = e.id
    const confirm = window.confirm("Are You Sure!...")
    if (!confirm) return
    var deleteOrder = await axios.delete(`http://localhost:4001/order/${orderid}`).then((res) => { return res.data })
    console.log(deleteOrder);
    alert("Order Deleted")
    window.location.reload()
}