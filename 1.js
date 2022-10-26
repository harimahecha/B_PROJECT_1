displaynotes();

let addBtn=document.getElementById('AddBtn');
addBtn.addEventListener('click', function(e){
    let addTxt = document.getElementById('AddTxt');
    let addTitle = document.getElementById('AddTitle');
    let notes = localStorage.getItem("notes");
    if (notes==null) 
    {
        notesObject=[];
    }
    else
    {
        //console.log(notes);
        notesObject=JSON.parse(notes)
        //console.log(notesObject);
    }
    // console.log(notesObject);
    if(addTxt.value==""||addTitle.value=="")
    {
        alert("Enter a valid note with title");
    }
    else
    {
        let note_obj={
            Title : addTitle.value,
            Note : addTxt.value
        }
        notesObject.push(note_obj);
        localStorage.setItem("notes",JSON.stringify(notesObject));
    }
    addTxt.value="";
    addTitle.value="";
    displaynotes();
});

function displaynotes()
{
    let notes = localStorage.getItem("notes");
    if (notes==null) 
    {
        notesObject=[];
    }
    else
    {
        notesObject=JSON.parse(notes);
        // //console.log(notesObject)
    }
    let htmldisplay="";
    // console.log(notesObject)
    notesObject.forEach(function(element,index){
        htmldisplay=htmldisplay+`
        <div class="SavedNotes card my-2 mx-3" style="width: 24rem;">
            <div class="card-body">
                ${index + 1}.<br>
                <h5 class="card-title searchTitle">${element.Title}</h5>
                <p class="card-text">${element.Note}</p>
                <button id="${index}" onclick="deleteNote(this.id)" href="#" class="btn btn-primary">Delete</button>  
            </div>
        </div>
        `;
    });
    let notesElm=document.getElementById("showNotes")
    if(notesObject.length!=0)
    {
        notesElm.innerHTML=htmldisplay;
    }
    else
    {
        notesElm.innerHTML=`<div class="alert alert-primary" role="alert">
        No Notes To Display
      </div>`
    }
}

function deleteNote(index)
{
    let notes = localStorage.getItem("notes");
    if (notes==null) 
    {
        notesObject=[];
    }
    else
    {
        notesObject=JSON.parse(notes);
        // //console.log(notesObject)
    }

    // splice will delete the element starting from index to count 1 means one element
    notesObject.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObject));

    // console.log("note", (index+1),"deleted")
    displaynotes();
}


let search =document.getElementById('searchTxt');
search.addEventListener("input", function()
{
    let sValue=search.value.toLowerCase();
    // console.log(sValue)
    let sNotes= document.getElementsByClassName("SavedNotes");
    // console.log(sNotes)
    Array.from(sNotes).forEach(function(element,index){
        let titleTxt = document.getElementsByClassName("searchTitle")[index].innerText.toLowerCase();
        console.log(titleTxt)
        if(titleTxt.includes(sValue))
        {
            element.style.display="block";
        }
        else
        {
            element.style.display="none";
        }
    })
})