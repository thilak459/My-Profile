// js/features/skills-filter.js
document.addEventListener("DOMContentLoaded", () => {
    const filterContainer = document.getElementById("skills-filters");
    const categories = ["All", "Frontend", "Backend"];

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.className = "px-6 py-2 rounded-full border border-green-900 text-green-900 font-bold hover:bg-green-900 hover:text-white transition-all duration-300 cursor-pointer";
        
        // Set "All" as default active style
        if(cat === "All") btn.classList.add("bg-green-900", "text-white");

        btn.addEventListener("click", () => {
            // Remove active styles from siblings
            filterContainer.querySelectorAll("button").forEach(b => {
                b.classList.remove("bg-green-900", "text-white");
            });

            btn.classList.add("bg-green-900", "text-white");

            const filtered = cat === "All" 
                ? skillsData 
                : skillsData.filter(s => s.category === cat);
            
            renderSkills(filtered);
        });

        filterContainer.appendChild(btn);
    });
});