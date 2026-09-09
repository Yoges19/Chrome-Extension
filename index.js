let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

//After refershing the page our leads should be persistance so we can get that from localstorage and store it on myLeads and then render it
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
//after refershing it will be vanished
//in order to solve this we can use localstorage as a persistance memory
//But localStorage only contains string then how do we add our array in localStorage
//Using these two methods JSON.stringfy() JSON.parse() we can convert the  array(our data) into string and string to array
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})



function render(leads) {
    let listItems = ""

    if(leads != null){
        for (let i = 0; i < leads.length; i++) {
            listItems += `
                <li>
                    <a target='_blank' href='${leads[i]}'>
                        ${leads[i]}
                    </a>
                </li>
            `
        }

        ulEl.innerHTML = listItems  
    }

    
}
