let infos = [
    { title: "Novidade 1", image: "https://via.placeholder.com/500x300/FF0000/FFFFFF?text=Novidade+1", text: "Texto explicativo sobre a novidade 1.", active: true },
    { title: "Novidade 2", image: "https://via.placeholder.com/500x300/00FF00/FFFFFF?text=Novidade+2", text: "Texto explicativo sobre a novidade 2.", active: true },
    { title: "Novidade 3", image: "https://via.placeholder.com/500x300/0000FF/FFFFFF?text=Novidade+3", text: "Texto explicativo sobre a novidade 3.", active: true },
    { title: "Novidade 4", image: "https://via.placeholder.com/500x300/FFFF00/FFFFFF?text=Novidade+4", text: "Texto explicativo sobre a novidade 4.", active: true },
    { title: "Novidade 5", image: "https://via.placeholder.com/500x300/FF00FF/FFFFFF?text=Novidade+5", text: "Texto explicativo sobre a novidade 5.", active: true },
];

let currentIndex = 0;
let intervalId;

function updateInfo() {
    const activeInfos = infos.filter(info => info.active);
    const container = document.getElementById("info-container");

    container.innerHTML = ""; // Limpa o conteúdo anterior
    if (activeInfos.length > 0) {
        const { title, image, text } = activeInfos[currentIndex % activeInfos.length];
        container.innerHTML = `
            <div>
                <div id="info-title-header">FIQUE ATENTO ÀS NOVIDADES!</div>
                <h3 style="font-size: 24px; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${title}</h3>
                <img src="${image}" style="width: 500px; height: 300px;">
                <p style="font-size: 16px; font-weight: bold;">${text}</p>
                <p>Para mais informações procure o RH ou o seu gestor 😊</p>
            </div>
        `;
    }

    currentIndex = (currentIndex + 1) % activeInfos.length;
}

function nextInfo() {
    updateInfo();
}

function startAutoUpdate() {
    intervalId = setInterval(updateInfo, 10000); // Alterna a cada 10 segundos
}

function stopAutoUpdate() {
    clearInterval(intervalId);
}

function openAdminPanel() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("admin-panel").style.display = "block";
    renderAdminControls();
    stopAutoUpdate(); // Pausa a alternância automática durante a edição
}

function closeAdminPanel() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("admin-panel").style.display = "none";
    startAutoUpdate(); // Retoma a alternância automática após fechar o painel
}

function renderAdminControls() {
    const adminContainer = document.getElementById("admin-controls");
    adminContainer.innerHTML = infos.map((info, index) => `
        <div>
            <h3>Editar Novidade ${index + 1}</h3>
            <label>Título (máx 40 caracteres):</label>
            <input type="text" value="${info.title}" onchange="updateInfoField(${index}, 'title', this.value)" maxlength="40">
            <label>Imagem URL:</label>
            <input type="text" value="${info.image}" onchange="updateInfoField(${index}, 'image', this.value)">
            <label>Texto (máx 300 caracteres):</label>
            <textarea onchange="updateInfoField(${index}, 'text', this.value)" maxlength="300">${info.text}</textarea>
            <label>
                <input type="checkbox" ${info.active ? "checked" : ""} onchange="updateInfoField(${index}, 'active', this.checked)"> Ativo
            </label>
        </div>
    `).join('');
}

function updateInfoField(index, field, value) {
    infos[index][field] = value;
    if (field === "active") infos[index][field] = value === "true" || value === true;
    updateInfo();
}

window.onload = () => {
    updateInfo();
    startAutoUpdate(); // Inicia a alternância automática ao carregar a página
};
