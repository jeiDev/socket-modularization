document.addEventListener("DOMContentLoaded", function() {
    const socket = io('');
    
    socket.on(`getMessage:${FROM.id}`, function(data){
        let parse = JSON.parse(data);
        let to = AccountsArray.find(account => (account.id === parse.userId));

        createMessage({message: parse.message, to}, chatBox);
    });

    socket.on(`getWriteMessage:${FROM.id}`, function(data){
        let status = JSON.parse(data).status || false;
        let beforeBubble = document.getElementById("activeBubble");
        
        if(beforeBubble) beforeBubble.remove();

        if(status){
            createBubble(chatBox);
        }
    })

    let timeoutWrite;

    inputMessage.addEventListener("keyup", (e) => {
        clearTimeout(timeoutWrite);
        let code = e.keyCode;

        //send message
        if(code === 13){
            let message = inputMessage.value.trim();
            if(message.length < 1) return inputMessage.value = "";
            inputMessage.value = "";
            inputMessage.focus();

            createMessage({position: "right", img: false, FROM, message}, chatBox);
            emitWriteMessage(false)
            socket.emit(`sendMessage`, JSON.stringify({userId: TO.id, message}));
        }
        
        emitWriteMessage(inputMessage.value.length > 0);

        timeoutWrite = setTimeout(() => {
            emitWriteMessage(false)
        },10000);
    })


    function emitWriteMessage(status){
        socket.emit(`sendWriteMessage`, JSON.stringify({userId: TO.id, status}));
    }

    function createBubble(parent){
        let bubble = document.createElement("div");

            bubble.setAttribute("class", "chat-bubble-left");
            bubble.setAttribute("id", "activeBubble");

            bubble.innerHTML = `
                <div class="typing">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            `;

            parent.appendChild(bubble);
    }

    function createMessage({position = "left", img = true, to, message = ""}, parent){
        let messageTo = document.createElement("div");
        messageTo.setAttribute("class", `${position}-msg`);
        messageTo.innerHTML = `
           ${message}
           ${img ? `<div class="img-${position}"><img class="theimg" src="${to.picture}" alt=""></div>` : ""}
        `

        parent.appendChild(messageTo);
    }

})

{/* <div class="chat-bubble-left">
                    <div class="typing">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>

                <div class="left-msg first-msg">
                    Welcome to my chatfolio. Let's have a chat!
                    <div class="img-left">
                        <img class="theimg" src="https://tynmedia.com/tynmag/wp-content/uploads/sites/3/2020/07/elon-e1594227445597.jpg " alt="">
                    </div>
                </div> */ }