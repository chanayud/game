

document.getElementById("send").onclick = function () {

    let userName= document.getElementById("userName").value;
    console.log(userName);
    // let ifExistUser= document.getElementsByTagName("userNameRadio");
    let ifExistUser = document.getElementById("ifExist");
    if(ifExistUser.value == "קיים"){
    // if(document.getElementById("1").checked()){
        check_if_exist(userName, 0);
    }
    //else if(document.getElementById("2").checked()){
    else if(ifExistUser.value == "חדש"){
        check_if_exist(userName, 1);
    }
}


async function check_if_exist(userName, num){
    let res = await axios.get('/api/get-user-name', userName);
    console.log(res.data);
    if(res == "exist"){
        if(num == 1){
            alert("שם המשתמש קיים כבר. נא בחר שם אחר");
        }
        else {
            get_high_score(userName);
            var para = new URLSearchParams();
            para.append("userName", userName);
            location.href = "theGame.html?" + para.toString();//קישור לדף המשחק
        
        }   
    }
    else{
        if(num == 1){
            add_new_user_name(userName);
            var para = new URLSearchParams();
            para.append("userName", userName);
            location.href = "theGame.html?" + para.toString();//קישור לדף המשחק
        
        }
        else{
            alert("שם המשתמש אינו נמצא במערכת. נא הכנס את שם המשתמש איתו נכנסת")
        }
    }
}

async function add_new_user_name(userName){
    let obj = {
        name: userName,
        highScore: 0
    }
    let res = await axios.post('/api/update-new-user', obj);
    console.log(res);
}

async function get_high_score(userName){
    let res = await axios.get('/api/get-high-score', userName);
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode("השיא שצברת עד כה הוא:" + res.data);
    newDiv.appendChild(newContent);



}
