async function login() {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var admindata = await axios.get("http://localhost:4001/admin/").then((res) => { return res.data })
    if (admindata[0].email == email) {
        if (admindata[0].password == password) {
            alert("Welcome to Admin Panel")
            setTimeout(() => {
                window.location.replace("/")
            })
        } else {
            alert("Please Provide Correct Password..")
        }
    } else {
        alert("Please Provide Correct Email..")
    }
}