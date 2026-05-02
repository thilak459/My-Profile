function renderEducation(){
    const educationContainer = document.getElementById("educationContainer")
    if(!educationContainer){
        console.log("Education not found")
    }
    educationContainer.innerHTML="";
    educationData.forEach(function(education){
        const card = document.createElement("div");
        card.className = "group relative overflow-hidden bg-gradient-to-br from-blue-500 via-sky-200 to-indigo-2 ,.m00 backdrop-blur-lg rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/30 hover:bg-gradient-to-br hover:from-indigo-100 hover:via-purple-100 hover:to-pink-100 ";

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