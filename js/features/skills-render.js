function renderSkills(dataToRender = skillsData) {
    const skillsContainer = document.getElementById("skills-container");

    if (!skillsContainer) {
        console.log("Skills container not found");
        return;
    }
    skillsContainer.innerHTML = "";
    dataToRender.forEach(function (skill) {
        //to create outer card
        const card = document.createElement("div");
        card.className = "p-8 text-center bg-white rounded-3xl shadow-lg";

        //create icon
        const iconBox = document.createElement("div");
        iconBox.className = "w-20 h-20 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow";

        //create icon text
        const iconImg = document.createElement("img");
        iconImg.src = skill.image;
        iconImg.alt = skill.name;
        iconImg.className = "w-12 h-12 object-contain transition-transform duration-300 hover:scale-110";

        iconBox.appendChild(iconImg);

        //create skill name
        const skillName = document.createElement("h3");
        skillName.className = "text-xl font-bold mb-2";
        skillName.textContent = skill.name;

        //create skill description 
        const skillDescription = document.createElement("p");
        skillDescription.className = "text-sm";
        skillDescription.textContent = skill.description;

        //Append all child elements to card
        card.appendChild(iconBox);
        card.appendChild(skillName);
        card.appendChild(skillDescription);

        //Append card to skills container
        skillsContainer.appendChild(card);
    });
    console.log("Skills rendered successfully");
}   