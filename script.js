// ===== SETTINGS =====
const DISCORD_INVITE = "https://discord.gg/RVRbFmguNb";

document.getElementById("discordBtn").href = DISCORD_INVITE;

// ===== MODS DATA =====
const MODS = [
  { name: "Anvil Restoration", url: "https://www.curseforge.com/minecraft/mc-mods/anvil-restoration", desc: "Restore damaged anvils instead of replacing them—cuts early-game iron drain." },
  { name: "Areas", url: "https://www.curseforge.com/minecraft/mc-mods/areas", desc: "Define regions/claims with rules for towns, bases, and protected spawns." },
  { name: "Biomes O’ Plenty", url: "https://www.curseforge.com/minecraft/mc-mods/biomes-o-plenty", desc: "Huge biome expansion with new blocks, plants, and world variety." },
  { name: "Clumps", url: "https://www.curseforge.com/minecraft/mc-mods/clumps", desc: "Merges XP orbs to reduce lag and speed up collection." },
  { name: "Crafting Tweaks", url: "https://www.curseforge.com/minecraft/mc-mods/crafting-tweaks", desc: "Rotate, balance, or clear crafting grids with handy buttons." },
  { name: "Durability Tooltip", url: "https://www.curseforge.com/minecraft/mc-mods/durability-tooltip", desc: "Shows exact durability in item tooltips to manage gear." },
  { name: "Explorify", url: "https://www.curseforge.com/minecraft/mc-mods/explorify", desc: "Better structures and worldgen for richer exploration loops." },
  { name: "Hand Over Your Items", url: "https://www.curseforge.com/minecraft/mc-mods/hand-over-your-items", desc: "Directly hand items to players—no chests or drop spam." },
  { name: "Health Indicator (TXF)", url: "https://www.curseforge.com/minecraft/mc-mods/health-indicator-txf", desc: "HP bars for mobs/players—know when to push or pull back." },
  { name: "Inventory Totem", url: "https://www.curseforge.com/minecraft/mc-mods/inventory-totem", desc: "Totem of Undying works from inventory—frees your offhand." },
  { name: "Dynamite", url: "https://www.curseforge.com/minecraft/mc-mods/dynamite", desc: "Throwable explosives for mining or combat. Handle with care." },
  { name: "LY Life Steal Enchantment", url: "https://www.curseforge.com/minecraft/mc-mods/ly-life-steal-enchantment", desc: "Adds lifesteal—convert damage dealt into health." },
  { name: "Macaw's Bridges", url: "https://www.curseforge.com/minecraft/mc-mods/macaws-bridges", desc: "Stylish bridge blocks to span rivers and canyons." },
  { name: "Morning Glory", url: "https://www.curseforge.com/minecraft/mc-mods/morning-glory", desc: "Atmosphere & decorations that make mornings cozy." },
  { name: "Mouse Tweaks", url: "https://www.curseforge.com/minecraft/mc-mods/mouse-tweaks", desc: "Drag-to-craft and smart clicks—inventory bliss." },
  { name: "Only Scythe", url: "https://www.curseforge.com/minecraft/mc-mods/only-scythe", desc: "Scythes for fast crop/grass clearing—efficient farming." },
  { name: "Trade Cycling", url: "https://www.curseforge.com/minecraft/mc-mods/trade-cycling", desc: "Proper villager trade rerolls without messy workarounds." },
  { name: "Useful Hats", url: "https://www.curseforge.com/minecraft/mc-mods/useful-hats", desc: "Hats with perks—reach, night vision, and more." },
  { name: "Xaero's Minimap", url: "https://www.curseforge.com/minecraft/mc-mods/xaeros-minimap", desc: "Clean minimap, waypoints, death markers, cave mode." },
  { name: "Xaero's World Map", url: "https://www.curseforge.com/minecraft/mc-mods/xaeros-world-map", desc: "Fullscreen world map that pairs with the minimap." },
  { name: "Waystones", url: "https://www.curseforge.com/minecraft/mc-mods/waystones", desc: "Teleport between discovered waystones—balanced fast travel." }
];

// ===== RENDER MODS =====
const grid = document.getElementById("modsGrid");
function render(mods){
  grid.innerHTML = mods.map((m,i)=>`
    <article class="mod" data-animate style="--delay:${0.02*i}s">
      <h3>${m.name}</h3>
      <p>${m.desc}</p>
      <div class="mod-actions">
        <a class="btn secondary" href="${m.url}" target="_blank" rel="noopener">Open on CurseForge</a>
        <span class="chip">Forge 1.21.10</span>
      </div>
    </article>
  `).join("");
}
render(MODS);

// ===== SEARCH =====
const search = document.getElementById("search");
const reset = document.getElementById("reset");
search.addEventListener("input", ()=>{
  const q = search.value.trim().toLowerCase();
  if(!q){ render(MODS); return; }
  const f = MODS.filter(m => m.name.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q));
  render(f);
});
reset.addEventListener("click", ()=>{ search.value=""; render(MODS); search.focus(); });

// ===== COPY IP =====
document.getElementById("copyIp").addEventListener("click", async ()=>{
  const ip = document.getElementById("ip").value;
  try{
    await navigator.clipboard.writeText(ip);
    toast(`IP copied: ${ip}`);
  }catch{
    toast("Copy failed. Select & Ctrl+C");
  }
});

// ===== CURSOR GLOW =====
const pulse = document.getElementById("pulse");
window.addEventListener("pointermove", (e)=>{
  pulse.style.setProperty("--mx", e.clientX + "px");
  pulse.style.setProperty("--my", e.clientY + "px");
});

// ===== TOAST =====
function toast(message){
  const el = document.createElement("div");
  el.textContent = message;
  el.style.cssText = `
    position:fixed;left:50%;top:22px;transform:translateX(-50%);
    background:rgba(0,0,0,.78);color:#fff;padding:10px 14px;border-radius:12px;
    border:1px solid rgba(255,255,255,.15);box-shadow:var(--shadow);z-index:10000;font-weight:700;
  `;
  document.body.appendChild(el);
  setTimeout(()=>{ el.style.transition="opacity .4s ease, transform .4s ease"; el.style.opacity="0"; el.style.transform="translateX(-50%) translateY(-6px)"; },1200);
  setTimeout(()=> el.remove(), 2000);
}
