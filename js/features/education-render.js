function renderEducation(){
    const educationContainer = document.getElementById("educationContainer")
    if(!educationContainer){
        console.log("Education not found")
    }
    educationContainer.innerHTML="";
    educationData.forEach(function(education){
        const card = document.createElement("div");
        card.className = "flex gap-10 bg-blue-400 hover:bg-green-100 shadow-lg hover:shadow-2xl rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3 overflow-hidden ";

        const edBoard = document.createElement("div");
        edBoard.classList = "w-16 h-16 bg-emarald-600 rounded flex items-center justify-center shadow-2xl text-white font-bold"
        edBoard.textContent = education.board;

        const edDetails = document.createElement("div");
        edDetails.classList = "font-semibold text-2xl";
        edDetails.textContent = education.details;

        const edName = document.createElement("p");
        edName.classList = "text-md font-semibold";
        edName.textContent = education.clgName;

        const edCgpa = document.createElement("p");
        edCgpa.classList = "text-md font-semibold text-right";
        edCgpa.textContent = education.cgpa;

        card.appendChild(edBoard);
        card.appendChild(edDetails);
        card.appendChild(edName);
        card.appendChild(edCgpa);

        educationContainer.appendChild(card);
    })
}