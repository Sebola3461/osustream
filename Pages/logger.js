module.exports = function(type, content) { 
    const notification_container = document.getElementById("notifications-container")
    let element = document.createElement("div")
    element.innerHTML = `
    <p class="title">${type}</p>
    <div class="content">
        ${content}
    </div>`
    element.className = "notification";
    element.setAttribute("type", type)
    notification_container.appendChild(element)
    setTimeout(function() {
        element.style.animationName = "hideNotification",
        setTimeout(function() { element.remove()},498)
    },5000)
}