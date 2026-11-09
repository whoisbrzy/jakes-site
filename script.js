const panel=document.getElementById("menuPanel");
const backdrop=document.getElementById("menuBackdrop");
const toggle=document.getElementById("menuToggle");
const close=document.getElementById("closeMenu");
function openMenu(){panel.classList.add("open");backdrop.hidden=false;panel.setAttribute("aria-hidden","false");toggle.setAttribute("aria-expanded","true");document.body.classList.add("menu-open");close.focus()}
function closeMenu(){panel.classList.remove("open");backdrop.hidden=true;panel.setAttribute("aria-hidden","true");toggle.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open");toggle.focus()}
toggle.addEventListener("click",openMenu);
close.addEventListener("click",closeMenu);
backdrop.addEventListener("click",closeMenu);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&panel.classList.contains("open"))closeMenu()});
panel.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener("click",()=>{closeMenu();panel.querySelectorAll(".menu-item").forEach(item=>item.classList.remove("active"));link.classList.add("active")}));
document.getElementById("year").textContent=new Date().getFullYear();
