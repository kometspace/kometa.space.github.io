/**
 * app.js — общая логика навигации и (псевдо)активации ключа.
 * IMPORTANT: GitHub Pages — статичный хостинг, он НЕ умеет создавать файлы на сервере.
 * Поэтому тут:
 *  - "активация" сохраняет ключ в localStorage (на этом устройстве),
 *  - и показывает пример, как подключить Firebase/Backend позже.
 */

function setActiveNav(){
  const page = (document.body.dataset.page || "").trim();
  document.querySelectorAll(".nav-item").forEach(a=>{
    if(a.dataset.page === page) a.classList.add("active");
    else a.classList.remove("active");
  });
}

function toast(msg, ok=true){
  const t = document.createElement("div");
  t.style.position="fixed";
  t.style.left="50%";
  t.style.bottom="86px";
  t.style.transform="translateX(-50%)";
  t.style.zIndex="999";
  t.style.padding="12px 14px";
  t.style.borderRadius="16px";
  t.style.maxWidth="92vw";
  t.style.border = ok ? "1px solid rgba(31,107,255,.55)" : "1px solid rgba(255,90,90,.55)";
  t.style.background = ok ? "rgba(31,107,255,.12)" : "rgba(255,90,90,.12)";
  t.style.backdropFilter="blur(12px)";
  t.style.color="rgba(232,237,245,.95)";
  t.style.boxShadow="0 12px 28px rgba(0,0,0,.35)";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), 2400);
}

function normalizeKey(s){
  return (s||"").trim();
}

function isKeyValid(key){
  // Правило: минимум 5 символов и содержит "_" (пример ny_2026)
  if(!key) return false;
  if(key.length < 5) return false;
  if(!key.includes("_")) return false;
  return true;
}

function activateKeyLocal(key){
  // Сохраняем как "ключи" на устройстве
  const list = JSON.parse(localStorage.getItem("plspace_keys") || "[]");
  if(list.includes(key)) return {ok:false, msg:"Этот ключ уже активирован на этом устройстве."};
  list.push(key);
  localStorage.setItem("plspace_keys", JSON.stringify(list));
  localStorage.setItem("plspace_last_key", key);
  return {ok:true, msg:"Ключ активирован (локально)."};
}

function renderMyKeys(){
  const box = document.getElementById("myKeys");
  if(!box) return;
  const list = JSON.parse(localStorage.getItem("plspace_keys") || "[]");
  if(list.length === 0){
    box.innerHTML = `<div class="notice"><strong>Пока пусто.</strong><br>Активируй ключ — и он появится здесь (на этом устройстве).</div>`;
    return;
  }
  const items = list.slice().reverse().map(k=>`<div class="badge"><i class="fa-solid fa-key"></i><span>${escapeHtml(k)}</span></div>`).join(" ");
  box.innerHTML = `<div style="display:flex; flex-wrap:wrap; gap:10px;">${items}</div>`;
}

function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

document.addEventListener("DOMContentLoaded", ()=>{
  setActiveNav();

  // Кнопка бургер — просто демо
  const burger = document.getElementById("burger");
  if(burger){
    burger.addEventListener("click", ()=> toast("Меню будет позже 🙂"));
  }

  // Активатор ключа
  const keyInput = document.getElementById("keyInput");
  const btn = document.getElementById("activateBtn");
  if(btn && keyInput){
    btn.addEventListener("click", ()=>{
      const key = normalizeKey(keyInput.value);
      if(!isKeyValid(key)){
        toast("Неверный формат ключа. Пример: ny_2026", false);
        return;
      }
      const res = activateKeyLocal(key);
      toast(res.msg, res.ok);
      if(res.ok){
        keyInput.value = "";
        renderMyKeys();
      }
    });
  }

  renderMyKeys();
});
