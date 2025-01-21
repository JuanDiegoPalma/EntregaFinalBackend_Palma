const socket = io()

socket.emit("addProducts", ({products}))