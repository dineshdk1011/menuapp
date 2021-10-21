async function addfood() {
    var category = document.getElementById("category").value
    var foodtype = document.getElementById("foodtype").value
    var foodname = document.getElementById("foodname").value
    var foodimage = document.getElementById("foodimage").value
    var description = document.getElementById("description").value
    var price = document.getElementById("price").value
    var offerprice = document.getElementById("offerprice").value
    var customize = document.getElementsByName("custome")

    var iscustomize = false
    for (var i = 0; i < customize.length; i++) {
        if (customize[i].checked) {
            if (customize[i].value == "yes") {
                iscustomize = true
            }
        }
    }

    var fooddetails = {
        category: category,
        foodtype: foodtype,
        foodname: foodname,
        foodimage: "https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_1376.jpg",
        description: description,
        price: price,
        offerprice: offerprice,
        iscustomize: iscustomize
    }
    var fooddata = await axios.post("http://localhost:4001/food/", fooddetails).then((res) => { return res.data })
    if (fooddata != undefined) {
        window.location.reload()
    }
}


onload = async () => {
    var fooddata = await axios.get("http://localhost:4001/food/").then((res) => { return res.data })
    for (var i = 0; i < fooddata.length; i++) {
        document.getElementById('fooddata').innerHTML += `
        <tr>
        <td><img src="${fooddata[i].foodimage[0]}" style="width: 100px;height: 100px;border-radius: 50%;"></td>
        <td> ${fooddata[i].foodname}</td>
        <td> ${fooddata[i].category[0]}</td>
        <td> ${fooddata[i].foodtype}</td>
        <td> ${fooddata[i].price}</td>
        <td>${fooddata[i].iscustomize == true ? `<button class="btn btn-info btn-xs" id="${fooddata[i].foodid}" onclick="customizebtn(this)">Customize</button>` : `<button class="btn btn-info btn-xs" disabled >Customize</button>`}</td>
        <td><button class="btn btn-primary m-1 btn-xs" data-toggle="modal"
        data-target="#editfood" id="${fooddata[i].foodid}" onclick="editbtn(this)">Edit</button><button class="btn btn-danger m-1 btn-xs" id="${fooddata[i].foodid}" onclick="deletebtn(this)">Delete</button></td>
        </tr>
        `
    }
}
async function deletebtn(e) {
    var deletefood = await axios.delete(`http://localhost:4001/food/${e.id}`).then((res) => { return res.data })
    if (deletefood.deletedCount == 1) {
        window.location.reload()
    }
}

async function editbtn(e) {
    localStorage.setItem("foodidedit", e.id)
    var fooddata = await axios.get(`http://localhost:4001/food/${e.id}`).then((res) => { return res.data })
    document.getElementById("foodnamee").value = fooddata[0].foodname
    document.getElementById("descriptione").value = fooddata[0].description
    document.getElementById("pricee").value = fooddata[0].price
    document.getElementById("offerpricee").value = fooddata[0].offerprice
}

async function editfood() {
    var foodname = document.getElementById("foodnamee").value
    var description = document.getElementById("descriptione").value
    var price = document.getElementById("pricee").value
    var offerprice = document.getElementById("offerpricee").value
    var customize = document.getElementsByName("custome")
    var iscustomize = false
    for (var i = 0; i < customize.length; i++) {
        if (customize[i].checked) {
            if (customize[i].value == "yes") {
                iscustomize = true
            }
        }
    }
    var fooddetails = {
        foodname: foodname,
        description: description,
        price: price,
        offerprice: offerprice,
        iscustomize: iscustomize
    }
    console.log(fooddetails)
    var foodidedit = localStorage.getItem("foodidedit")
    var fooddata = await axios.put(`http://localhost:4001/food/${foodidedit}`, fooddetails).then((res) => { return res.data })
    if (fooddata != undefined) {
        window.location.reload()
    }
}


function customizebtn(e) {
    console.log(e.id)
    localStorage.setItem("foodid", e.id)
    window.location.replace("/customizefood")
}