const $ = (id) => document.getElementById(id);

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

async function loadStatus() {
  $("appStatus").textContent = "Checking...";
  try {
    const response = await fetch("/api/status");
    if (!response.ok) throw new Error(`API returned ${response.status}`);
    const data = await response.json();

    $("appStatus").textContent = "Healthy";
    $("statusDot").className = "dot good";
    $("lastChecked").textContent = `Last checked: ${new Date(data.checkedAt).toLocaleTimeString()}`;
    $("uptime").textContent = formatUptime(data.uptimeSeconds);
    $("memory").textContent = `${data.memory.usedPercent}%`;
    $("memoryBar").style.width = `${data.memory.usedPercent}%`;
    $("service").textContent = data.service;
    $("hostname").textContent = data.hostname;
    $("platform").textContent = data.platform;
    $("nodeVersion").textContent = data.nodeVersion;
  } catch (error) {
    $("appStatus").textContent = "Unavailable";
    $("statusDot").className = "dot bad";
    $("lastChecked").textContent = error.message;
  }
}

async function loadPipeline() {
  try {
    const response = await fetch("/api/pipeline");
    const data = await response.json();
    $("pipelineStages").innerHTML = data.stages.map((stage, index) => `
      <div class="stage">
        <span class="stage-icon">${index + 1}</span>
        <div><b>${stage.name} <small>· ${stage.status}</small></b><p>${stage.detail}</p></div>
      </div>`).join("");
  } catch {
    $("pipelineStages").textContent = "Could not load pipeline information.";
  }
}

$("refreshBtn").addEventListener("click", () => {
  loadStatus();
  loadPipeline();
});

loadStatus();
loadPipeline();
setInterval(loadStatus, 10000);
