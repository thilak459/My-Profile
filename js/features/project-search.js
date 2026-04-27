document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("project-search");

    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();

        const filteredProjects = projectsData.filter((project) => {
            return (
                project.name.toLowerCase().includes(searchTerm) ||
                project.category.toLowerCase().includes(searchTerm)
            );
        });

        renderProject(filteredProjects);
    });
}); 