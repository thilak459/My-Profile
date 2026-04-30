function initThemeToggle(){
    const toggleBtn =document.getElementById("theme-toggle");
    const body = document.body;

    const saveTheme = localStorage.getItem("portfolio-theme");

    if(saveTheme === "dark"){
        body.classList.add("dark-mode");
    }
    toggleBtn.addEventListener("click",function(){
        body.classList.toggle("dark-mode");
        if(body.classList.contains("dark-mode")){
            localStorage.setItem("portfolio-theme","dark");
            console.log("Dark mode enabled");
        }
        else{
            localStorage.setItem("portfolio-theme","light");
            console.log("Light mode enabled");
        }
    });
}
const toggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  // Swap the icon character
  if (document.body.classList.contains('dark')) {
    themeIcon.textContent = '🌙';
  } else {
    themeIcon.textContent = '☀️';
  }
});
