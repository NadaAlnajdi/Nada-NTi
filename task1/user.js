
    const readfile = (key= "users", dataType="array") => {
    let data
    try{
        data = JSON.parse(localStorage.getItem(key)) || []
        if(!Array.isArray(data) && dataType=="array") throw new Error ("Invalid")
    }
    catch(e){
        data = []
    }
    return data
}

const writefile = (data, key="users") => {
    localStorage.setItem(key, JSON.stringify(data))
}

const userData = document.querySelector("#userData")    
const Form = document.querySelector("#Form")
const EditForm = document.querySelector("#EditForm")
const ShowUser = document.querySelector("#ShowUser")


const header = ["name", "age"];
const Data = (Form, status = true) => {
    let user = { 
        id: Date.now(),
        Status: status? Form.elements.status.value : "Fasle"
    };
    
    header.forEach(ele => {
        user[ele]= Form.elements[ele].value
        });
    return user 
}


if (Form) {
    Form.addEventListener("submit", function(e){
        e.preventDefault();
        const user = Data(this);
        const users = readfile();
        users.push(user);
        writefile(users);
        window.location.href="index.html";
    })
}

const create= (child, parent, content, style) =>{
    const newChild = document.createElement(child);
    parent.appendChild(newChild);
    if (content) {
     newChild.innerText= content;
    }
    if (style) {
     newChild.classList = style;
    }
    return newChild;
}

const dataset = (users) => {
    userData.innerHTML="";
    if (users.length==0) {
        let tr = create("tr", userData, "", "alert alert-danger");
        let td = create("td", tr, "no data found", "text-center");
        td.setAttribute("colspan", "5");
    }
    users.forEach((user, i)=>{
        let tr = create("tr", userData);
        create("td", tr, user.id);
        create("td", tr, user.name);
        create("td", tr, user.age);
        create("td", tr, user.Status);

        let td = create("td", tr);
        
        let ShowData = create("button", td, "Show", "btn btn-dark mx-2");
        ShowData.addEventListener("click", () => Show(user , i));

        let EditData = create("button", td, "Edit", "btn btn-success mx-2");
        EditData.addEventListener("click", () => Edit(user));
        
        let DeleteData = create("button", td, "Delete", "btn btn-danger mx-2");
        DeleteData.addEventListener("click", () => Delete(users, i));
    })
}



const Edit = (user) => {
    writefile(user, "user");
    window.location.href = "edit.html";
}

const FE = (e, id) => {
    e.preventDefault();
    let user = Data(EditForm, id);
        let users = readfile("users");
        users[users.findIndex((user) => user.id == id)] = user;
        writefile(users, "users");
        window.location.href = './index.html';
}

if (EditForm) {
    let user = readfile("user", "object");
    header.forEach(ele => {
        EditForm.elements[ele].value = user[ele]
    })
    EditForm.elements["status"].value = user["status"];
    EditForm.addEventListener("submit", (e) => FE(e, user.id));
}


const Delete = (users, i)=>{
    users.splice(i,1);
    writefile(users);
    dataset(users);
}


const Show = (user, i)=>{
    writefile(user, "user");
    writefile(i, "userindex");
    console.log(user)
    window.location.href="show.html";
    
}


if (ShowUser) {
    let userSelect = readfile("user", "Object");
    header.forEach(ele => {
        ShowUser.elements[ele].value = userSelect[ele]
    })
    ShowUser.elements["status"].value = userSelect["Status"];
}


if (userData) {
    const users = readfile();
    dataset(users);
}








 
 
 



 