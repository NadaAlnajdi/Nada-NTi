const readfile = (key="users", dataType="array") => {
    let data
    try{
        data = JSON.parse(localStorage.getItem(key)) || []
        if(!Array.isArray(data) && dataType=="array") throw new Error("No Data")
    }
    catch(e){
        data = []
    }
    return data
}

const writefile = (data, key="users") => {
    localStorage.setItem(key, JSON.stringify(data))
}

const AllUsers = document.querySelector("#AllUsers")    
const Form = document.querySelector("#Form")
const addval = document.querySelector("#addval");
const Balance = document.querySelector("#Balance")


const heads = ["name", "intial balance"];
const createUserObject = (Form) =>{
    let user = { id: Date.now(), "remaining balance": Form.elements["intial balance"].value };
    heads.forEach(head => user[head]= Form.elements[head].value)
    return user 
}

if(Form){
    Form.addEventListener("submit", function(e){
        e.preventDefault()
        const user = createUserObject(this)
        const users = readfile()
        users.push(user)
        writefile(users)
        window.location.href="index.html"
    })
}

const createMyElem = (elem, parent, txt, classes) =>{
    const myElem = document.createElement(elem);
    parent.appendChild(myElem);    
    if(txt) myElem.innerText= txt
    if(classes)  myElem.classList = classes
    
    return myElem
}


const DataSet = (users) => {
    AllUsers.innerHTML=""
    if(users.length==0){
        let tr = createMyElem("tr", AllUsers, "", "alert alert-danger")
        let td = createMyElem("td", tr, "no data found", "text-center")
        td.setAttribute("colspan", "5")
    }
    users.forEach((user, i)=>{
        let tr = createMyElem("tr", AllUsers)
        createMyElem("td", tr, user.id)
        createMyElem("td", tr, user.name)
        createMyElem("td", tr, user["intial balance"])
        createMyElem("td", tr, user["remaining balance"])
        let td = createMyElem("td", tr)

        let Balance = createMyElem("button", td, "Add Balance", "btn btn-dark mx-2")
        Balance.addEventListener("click", () => showUser(users[i], "Add"))

        let withDraw = createMyElem("button", td, "Withdraw", "btn btn-success mx-2")
        withDraw.addEventListener("click", () =>{ 
        showUser(users[i], "Withdraw")})

        let dele = createMyElem("button", td, "Delete", "btn btn-danger mx-2")
        dele.addEventListener("click", () => deleteUser(users, i));
    })
}


const deleteUser = (users, i)=>{
    users.splice(i,1)
    writefile(users)
    DataSet(users)
}

const showUser = (user, operText)=>{
    writefile({ ...user,  oper: operText} , "user")
    window.location.href = "operation.html"
}


const funOper = (user) => {
    let value = Number(addval.value);
        user["remaining balance"] = user.oper === "Add" ? String(+user["remaining balance"] + value) : String(+user["remaining balance"] - value);
        let users = readfile("users");
        let index = users.findIndex((u => u.id === user.id));
        users[index] = user;
        writefile(users, "users");
        window.location.href = './index.html';
}


if(AllUsers) {
    const users = readfile()
    DataSet(users)
}

if (Balance) {
    let user = readfile("user", "object");
    let button = createMyElem("button", Balance, user.oper);
    button.addEventListener("click", (e)=> funOper(user));
}



