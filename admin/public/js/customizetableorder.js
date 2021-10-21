var table = document.getElementById('POITable');

/*DELETES ROW*/

function deleteRow(row) {
    var i = row.parentNode.parentNode.rowIndex;
    var len = table.rows.length;
    if (len == 3) {
        alert('Cannot Delete');
        return;
    }
    table.deleteRow(i);
    for (a = i; a < table.rows.length; a++) {
        table.rows[a].cells[1];
    }
}

/*DELETES COLUMN*/

function deleteCol(col) {
    var i = col.cellIndex;
    var len = table.rows.length;
    var length = table.rows[0].cells.length;
    if (length == 3) {
        alert('Cannot Delete');
        return;
    }
    for (var a = 0; a < len; a++) {
        table.rows[a].deleteCell(i);
    }
}

/*INSERTS ROWS*/

function insRow() {

    var new_row = table.rows[2].cloneNode(true);
    var len = table.rows.length;
    new_row.cells[1].innerHTML = `<input class='customizHeading' size=25 type="text">`;
    var inp1 = new_row.cells[2].getElementsByTagName('input')[0];
    inp1.id += len;
    inp1.value = "";
    table.appendChild(new_row);
}

/*INSERTS COLUMNS*/

function insCol() {
    var table = document.getElementById('POITable');
    var rows = document.getElementsByTagName('tr');
    i = 0;
    while (r = rows[i++]) {
        var c = r.getElementsByTagName('td');
        var clone = c[2].cloneNode(true);
        c[0].parentNode.appendChild(clone);
    }
}


async function addfoodCustomiz() {
    const customizHeading = document.querySelectorAll(".customizHeading")
    const customizOptions = document.querySelectorAll(".customizOptions")
    const rowData = document.querySelectorAll(".rowData")
    const rowDatalength = rowData[0].cells.length
    const optionsLength = rowDatalength - 2
    const headings = [], options = []
    for (var i = 0; i < customizHeading.length; i++) {
        headings.push(customizHeading[i].value)
    }
    for (var i = 0; i < customizOptions.length; i++) {
        options.push(customizOptions[i].value)
    }
    const myoptions = []
    var sliceElement = 0
    for (var i = 0; i < options.length; i++) {
        if ((i + 1) % optionsLength == 0) {
            myoptions.push(options.slice(sliceElement, (i + 1)));
            sliceElement = i + 1
        }
    }
    var customizDataz = []
    for (var i = 0; i < headings.length; i++) {
        customizDataz.push(
            {
                headings: headings[i],
                options: myoptions[i]
            }
        )
    }
    for (var i = 0; i < customizDataz.length; i++) {
        var data = {
            customizationdata: customizDataz[i],
            foodid: localStorage.getItem("foodid")
        }
        console.log(data)
        var customizdata = await axios.post("http://localhost:4001/customization/", data).then((res) => { return res.data })
        if (customizdata != undefined) {
            window.location.reload()
        }
    }



}

onload = async () => {
    const customizedata = await axios.get("http://localhost:4001/customization/").then((res) => { return res.data })
    for (var i = 0; i < customizedata.length; i++) {
        if (customizedata[i].foodid == localStorage.getItem("foodid")) {
            for (var j = 0; j < customizedata[i].customizationdata.length; j++) {
                document.getElementById("customizedata").innerHTML += `
                <div class="set">
                   <h4>${customizedata[i].customizationdata[j].headings}</h4>
                   <div id="optiontag${customizedata[i]._id}">
                  </div>
              </div>
              <button class="btn btn-danger m-2 btn-xs" id="${customizedata[i].customizationid}" onclick="deletebtn(this)">Remove</button>
      `
                for (var k = 0; k < customizedata[i].customizationdata[j].options.length; k++) {
                    document.getElementById(`optiontag${customizedata[i]._id}`).innerHTML += `
                    <input type="checkbox" id="${customizedata[i].customizationdata[j].options[k]}" name="${customizedata[i].customizationdata[j].options[k]}" value="${customizedata[i].customizationdata[j].options[k]}">
                    <label for="${customizedata[i].customizationdata[j].options[k]}" id="optionvalue">${customizedata[i].customizationdata[j].options[k]}</label><br>
                `
                }
            }
        }
    }

}

deletebtn = async (e) => {

    var deletecustomization = await axios.delete(`http://localhost:4001/customization/${e.id}`).then((res) => { return res.data })
    if (deletecustomization.deletedCount == 1) {
        window.location.reload()
    }
}