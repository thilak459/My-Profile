document.addEventListener("DOMContentLoaded", () => {
    const sortSelect = document.getElementById("project-sort");

    if (!sortSelect) return;

    sortSelect.addEventListener("change", (e) => {
        const sortBy = e.target.value;

        let sortedProjects = [...projectsData];

        if (sortBy === "az") {
            sortedProjects.sort((a, b) => a.name.localeCompare(b.name));
        } 
        else if (sortBy === "za") {
            sortedProjects.sort((a, b) => b.name.localeCompare(a.name));
        }
        renderProject(sortedProjects);
    });
});