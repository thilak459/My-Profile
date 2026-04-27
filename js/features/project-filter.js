document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("bg-blue-600", "text-white");
                btn.classList.add("bg-gray-200");
            });

            button.classList.remove("bg-gray-200");
            button.classList.add("bg-blue-600", "text-white");

            const selectedCategory = button.getAttribute("data-category");

            if (selectedCategory === "All") {
                renderProject(projectsData);
            } else {
                const filtered = projectsData.filter(project => 
                    project.category === selectedCategory
                );
                renderProject(filtered);
            }
        });
    });
});