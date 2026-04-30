function renderProject(dataToRender = projectsData) {
    const projectContainer = document.getElementById("projects-container");

    if (!projectContainer) {
        console.log("Projects not found");
        return;
    }

    projectContainer.innerHTML = "";

    dataToRender.forEach(function (project) {

        // ===== CARD =====
        const card = document.createElement("div");
        card.className =
            "bg-gradient-to-br from-slate-50 via-white to-indigo-50  rounded-2xl shadow-md p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200 hover:bg-white";

        // ===== LIKE BUTTON =====
        const likeBtn = document.createElement("button");
        likeBtn.className = "flex items-center gap-1 text-gray-400 hover:text-red-500 mb-2 transition";

        const heart = document.createElement("span");
        heart.textContent = "❤️";

        const countSpan = document.createElement("span");
        countSpan.textContent = "0";

        likeBtn.appendChild(heart);
        likeBtn.appendChild(countSpan);

        // ===== PROJECT NAME =====
        const projectName = document.createElement("h3");
        projectName.className = "text-xl font-semibold text-center text-gray-800";
        projectName.textContent = project.name;

        // ===== CATEGORY =====
        const projectCategory = document.createElement("p");
        projectCategory.className = "text-xs text-center text-blue-600 font-medium mb-2";
        projectCategory.textContent = project.category;

        // ===== TECHNOLOGIES =====
        const projectTechnologies = document.createElement("p");
        projectTechnologies.className = "text-xs text-center text-gray-500 mb-2";
        projectTechnologies.textContent = project.technologies;

        // ===== DESCRIPTION (HIDDEN INITIALLY) =====
        const projectDescription = document.createElement("p");
        projectDescription.className =
            "text-sm text-gray-600 mt-3 max-h-0 overflow-hidden transition-all duration-500";
        projectDescription.textContent = project.description;

        // ===== BUTTONS =====
        const btnContainer = document.createElement("div");
        btnContainer.className = "flex justify-center gap-4 mt-4";

        const projectDemo = document.createElement("a");
        projectDemo.href = project.demo || "#";
        projectDemo.target = "_blank";
        projectDemo.className =
            "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition";
        projectDemo.textContent = "Live Demo";

        const projectGit = document.createElement("a");
        projectGit.href = project.github || "#";
        projectGit.target = "_blank";
        projectGit.className =
            "border bg-blue-300 border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm transition";
        projectGit.textContent = "GitHub";

        btnContainer.appendChild(projectDemo);
        btnContainer.appendChild(projectGit);

        // ===== APPEND ELEMENTS =====
        card.appendChild(likeBtn);
        card.appendChild(projectName);
        card.appendChild(projectCategory);
        card.appendChild(projectTechnologies);
        card.appendChild(projectDescription);
        card.appendChild(btnContainer);

        projectContainer.appendChild(card);

        // ===== CLICK TO TOGGLE DESCRIPTION =====
        card.addEventListener("click", function () {
            if (projectDescription.style.maxHeight) {
                projectDescription.style.maxHeight = null;
            } else {
                projectDescription.style.maxHeight =
                    projectDescription.scrollHeight + "px";
            }
        });

        // ===== LIKE BUTTON LOGIC =====
        likeBtn.addEventListener("click", function (e) {
            e.stopPropagation();

            const count = parseInt(countSpan.textContent);

            if (count < 1) {
                countSpan.textContent = count + 1;
            } else {
                alert("You already liked this project");
            }
        });

    });

    console.log("Projects rendered successfully");
}