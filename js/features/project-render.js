function renderProject(dataToRender = projectsData) {
    const projectContainer = document.getElementById("projects-container");

    if (!projectContainer) {
        console.log("Projects not found");
        return;
    }
    projectContainer.innerHTML = "";
    dataToRender.forEach(function (project) {
        const card = document.createElement("div");
        card.className = "hover:bg-green-100 shadow-lg hover:shadow-2xl rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3 overflow-hidden border ";

        const projectName = document.createElement("h3");
        projectName.className = "text-2xl font-bold group-hover: text-slate-600 flex justify-center";
        projectName.textContent = project.name;

        const projectCategory = document.createElement("p");
        projectCategory.className = "text-lg font-semibold flex justify-center";
        projectCategory.textContent = project.category;

        const projectDescription = document.createElement("p");
        projectDescription.classList = "text-sm ";
        projectDescription.textContent = project.description;

        const projectTechnologies = document.createElement("p");
        projectTechnologies.classList = "text-sm font-semibold";
        projectTechnologies.textContent = project.technologies;

        const projectStatus = document.createElement("span");
        projectStatus.classList = "text-xs font-bold text-red-600 uppercase";
        projectStatus.textContent = project.status;

        const btnContainer = document.createElement("div");
        btnContainer.classList = "flex mb-3 gap-4 pt-6";

        const projectDemo = document.createElement("div");
        projectDemo.classList = "bg-gray-700 hover:bg-black text-white hover:shadow-lg rounded transition-all duration-300 px-8 py-3";
        projectDemo.textContent = "Live Demo";

        const projectGit = document.createElement("div");
        projectGit.classList = "bg-gray-700 hover:bg-black text-white hover:shadow-lg rounded transition-all duration-300 px-8 py-3";
        projectGit.textContent = "Github";

        const likeBtn = document.createElement("button");
        likeBtn.classList = "flex"
        likeBtn.textContent = "❤️"

        const span = document.createElement("span");
        span.textContent = "0"

        card.appendChild(projectStatus);
        card.appendChild(likeBtn);
        likeBtn.appendChild(span);
        card.appendChild(projectName);
        card.appendChild(projectCategory);
        card.appendChild(projectDescription);
        card.appendChild(projectTechnologies);

        card.appendChild(btnContainer);
        btnContainer.appendChild(projectDemo);
        btnContainer.appendChild(projectGit);

        projectContainer.appendChild(card);

        likeBtn.addEventListener("click", function () {

            const count = parseInt(span.textContent);
            if (count < 1) {
                span.textContent = count + 1;
            }
            else {
                alert("You already liked that project");
            }
        });
    });

}
