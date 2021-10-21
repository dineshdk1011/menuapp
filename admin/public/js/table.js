async function addtable() {
    var tablename = document.getElementById("tablename").value
    var tabledetails = {
        tablename: tablename
    }
    var tabledata = await axios.post("http://localhost:4001/table/", tabledetails).then((res) => { return res.data })
    if (tabledata != undefined) {
        window.location.reload()
    }
}

onload = async () => {
    var tabledata = await axios.get("http://localhost:4001/table/").then((res) => { return res.data })
    for (var i = 0; i < tabledata.length; i++) {
        document.getElementById('tabledata').innerHTML += `
        <tr>
        <td> ${tabledata[i].tablename}</td>
        <td><a href="${tabledata[i].qrcode}" download=${tabledata[i].tablename} target="_blank"><img style="height: 20%;
        width: 20%;" src="${tabledata[i].qrcode}"></a></td>
        <td> <button class="btn btn-danger btn-xs" id="${tabledata[i].tableid}" onclick="deletebtn(this)">Delete</button>
        </td>
        </tr>
        `
    }
}

async function deletebtn(e) {
    var deletetable = await axios.delete(`http://localhost:4001/table/${e.id}`).then((res) => { return res.data })
    if (deletetable.deletedCount == 1) {
        window.location.reload()
    }
}