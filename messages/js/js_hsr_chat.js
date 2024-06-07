
    /* anti xss*/
    function displaySanitizedInput(inputSelector) { 
        var sanitizedInput = $('<div>').text(inputSelector).html();
        return sanitizedInput;
    }
    /* start load datalist and load it to input */
    $('#edit_chatbox_name').on('input', function() {
        var inputValue = $(this).val(); 
        var selectedOption = $('#characters option').filter(function() {
            return $(this).val() === inputValue;
        }); 
        if (selectedOption.length > 0) { 
            var avatarUrl = selectedOption.data('avt'); 
            if (Cookies.get('lang')){var status = selectedOption.data('status-en');}
            else{var status = selectedOption.data('status-vi');}
            

            if (avatarUrl) {
                $('#edit_chatbox_status').val(status); 
            } 
        }
    });
    

    function recall (item){
        var $parent = item.closest('.mess'); 
        var $messCont = $parent.find('.mess-cont');
        var $photo = $parent.find('.photo');
        var $sticker = $parent.find('.sticker');
        if (Cookies.get('lang') == "en"){var $recallCont = $parent.find('.recall-cont-en'); }
        else{var $recallCont = $parent.find('.recall-cont-vi'); }
        
        if ($recallCont.is(':visible')) {
            $photo.show();
            $sticker.show();
            $messCont.first().show();
            $recallCont.hide();
        } else {
            $messCont.hide();
            $recallCont.hide();
            $sticker.hide();
            $recallCont.show();
        }
    }
    $(document).on('click', '.recall', function() {  
        recall( $(this));
    });


    $("#chatbox_btn").click(function(){ 
        name = displaySanitizedInput($("#edit_chatbox_name").val())
        status = displaySanitizedInput($("#edit_chatbox_status").val())
        $("#chatbox_name").html(name);  
        $("#chatbox_status").html(status);  
    });  

    function scroll_custom(){ 
        $("#scroll-custom").animate({ scrollTop: $('#scroll-custom')[0].scrollHeight }, 500);
    } 
    /* toggle multi rec user*/ 
    $('#multi-rec').hide();   
    $('#show-multi-rec').click(function() {
        $('#multi-rec').toggle({ duration: 500, easing: 'swing' });
    });
    /* scroll chat or not */
    $('#toggleScroll-custom').click(function() {
        $("#scroll-custom").toggleClass("scroll-custom");
    });
    /* del chat */
    $(document).on('click', '.del', function() { 
        $(this).closest('.mess').fadeOut(500, function() {
            $(this).remove();
        }); 
    });
    /* del all chat */
    $('#del_allchat').click(function() {
        $('.mess:not(.skip)').each(function() {
            $(this).fadeOut(function() {
                $(this).remove();
            });
        });
    });
    

    /* start checkbox upload img */
    $("#edit-char-rec-img").change(function() {
    if ($(this).is(':checked')) { $("#edit-char-rec-chat").attr("placeholder", "Paste Image URL here..."); } 
    else { $("#edit-char-rec-chat").attr("placeholder", "Type message here..."); }
    });
    $("#edit-char-rec-img-2").change(function() {
    if ($(this).is(':checked')) { $("#edit-char-rec-chat-2").attr("placeholder", "Paste Image URL here..."); } 
    else { $("#edit-char-rec-chat-2").attr("placeholder", "Type message here...");  }
    });
    $("#edit-char-rec-img-3").change(function() {
    if ($(this).is(':checked')) {  $("#edit-char-rec-chat-3").attr("placeholder", "Paste Image URL here..."); } 
    else {  $("#edit-char-rec-chat-3").attr("placeholder", "Type message here..."); }
    });
    $("#edit-char-send-img").change(function() {
    if ($(this).is(':checked')) { $("#edit-char-send-chat").attr("placeholder", "Paste Image URL here..."); } 
    else { $("#edit-char-send-chat").attr("placeholder", "Type message here..."); }
    }); 
    
    // type user = rec, send, system
    // type mess = text, photo, sticker
    // recall = true, false
    function addNewMessage(name, avt, chat, type_user, type_mess, recall_status) {
        n_name = displaySanitizedInput(name);
        n_avt = displaySanitizedInput(avt);
        n_chat = displaySanitizedInput(chat);

        
        if(type_user == "rec"){
            if(type_mess == "text"){
                var newMessage = `
                    <div class="mess mess-rec position-relative msg plr-3-5">  
                        <div class="del">✖</div> 
                        <div class="recall"><i class="fas fa-undo"></i></div>
                        <div class="mb-4 d-flex justify-content-start">
                            <div class="icon rounded-circle me-3 bg-icon">
                                <img class="rounded-circle icon-img" src="` +n_avt+ `">
                            </div>
                            <div class="d-flex flex-column">
                                <div class="username text-grey mb-1">` +n_name+ `</div>
                                <div class="loading mt-3">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="mess-cont chatbox-friend py-2 px-3" style="display: none">` +n_chat+ `</div>  
                                <div class="mess-cont chatbox-friend py-2 px-3 recall-cont-en" style="display: none;">Message recalled</div> 
                                <div class="mess-cont chatbox-friend py-2 px-3 recall-cont-vi" style="display: none;">Tin nhắn đã được thu hồi</div> 
                            </div>
                        </div> 
                    </div>`;  
            } else if(type_mess == "photo"){
                var newMessage = `
                    <div class="mess mess-rec position-relative msg plr-3-5">  
                        <div class="del">✖</div> 
                        <div class="recall"><i class="fas fa-undo"></i></div>
                        <div class="mb-4 d-flex justify-content-start">
                            <div class="icon rounded-circle me-3 bg-icon">
                                <img class="rounded-circle icon-img" src="` +n_avt+ `">
                            </div>
                            <div class="d-flex flex-column">
                                <div class="username text-grey mb-1">` +n_name+ `</div>
                                <div class="loading mt-3">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="py-2 px-3">
                                    <img alt="Photo" class="photo mess-cont mess-cont-img" style="display: none" src="` +n_chat+ `">
                                </div> 
                                <div class="mess-cont chatbox-friend py-2 px-3 recall-cont-en" style="display: none;">Message recalled</div> 
                                <div class="mess-cont chatbox-friend py-2 px-3 recall-cont-vi" style="display: none;">Tin nhắn đã được thu hồi</div> 
                            </div>
                        </div> 
                    </div>`;  
            } else if(type_mess == "sticker"){
                var newMessage = `
                    <div class="mess mess-rec position-relative msg plr-3-5">  
                        <div class="del">✖</div> 
                        <div class="recall"><i class="fas fa-undo"></i></div>
                        <div class="mb-4 d-flex justify-content-start">
                            <div class="icon rounded-circle me-3 bg-icon">
                                <img class="rounded-circle icon-img" src="` +n_avt+ `">
                            </div>
                            <div class="d-flex flex-column">
                                <div class="username text-grey mb-1">` +n_name+ `</div>
                                <div class="loading mt-3">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="py-2 px-3">
                                    <img alt="Sticker" class="sticker mess-cont mess-cont-img" style="display: none" src="` +n_chat+ `">
                                </div>
                                <div class="mess-cont chatbox-friend py-2 px-3 recall-cont-en" style="display: none;">Message recalled</div> 
                                <div class="mess-cont chatbox-friend py-2 px-3 recall-cont-vi" style="display: none;">Tin nhắn đã được thu hồi</div> 
                            </div>
                        </div> 
                    </div>`;  
            } else { console.log("Error:");  }
        } else if(type_user == "send"){
            if(type_mess == "text"){ 
                var newMessage = `
                    <div class="mess mess-send position-relative msg plr-3-5"> 
                        <div class="del">✖</div> 
                        <div class="recall"><i class="fas fa-undo"></i></div> 
                        <div class="mb-4 d-flex justify-content-end">
                            <div class="d-flex flex-column align-items-end">
                                <div class="username text-grey mb-1">` +n_name+ `</div> 
                                <div class="loading mt-3">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="mess-cont chatbox-user py-2 px-3" style="display: none" >` +n_chat+ `</div> 
                                <div class="mess-cont chatbox-user py-2 px-3 recall-cont-en" style="display: none;">Message recalled</div> 
                                <div class="mess-cont chatbox-user py-2 px-3 recall-cont-vi" style="display: none;">Tin nhắn đã được thu hồi</div> 
                            </div>
                            <div class="icon rounded-circle ms-3 bg-icon ml-1">
                                <img class="rounded-circle icon-img" src="` +n_avt+ `">
                            </div>
                        </div> 
                    </div>  `;  
            } else if(type_mess == "photo"){ 
                var newMessage = `
                    <div class="mess mess-send position-relative msg plr-3-5"> 
                        <div class="del">✖</div> 
                        <div class="recall"><i class="fas fa-undo"></i></div> 
                        <div class="mb-4 d-flex justify-content-end">
                            <div class="d-flex flex-column align-items-end">
                                <div class="username text-grey mb-1">` +n_name+ `</div>
                                <div class="loading mt-3">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="py-2 px-3">
                                    <img alt="Photo" class="photo mess-cont mess-cont-img" style="display: none" src="` +n_chat+ `">
                                </div>
                                <div class="mess-cont chatbox-user py-2 px-3 recall-cont-en" style="display: none;">Message recalled</div> 
                                <div class="mess-cont chatbox-user py-2 px-3 recall-cont-vi" style="display: none;">Tin nhắn đã được thu hồi</div> 
                            </div>
                            <div class="icon rounded-circle ms-3 bg-icon ml-1">
                                <img class="rounded-circle icon-img" src="` +n_avt+ `">
                            </div>
                        </div> 
                    </div>  `;  
            } else if(type_mess == "sticker"){ 
                var newMessage = `
                    <div class="mess mess-send position-relative msg plr-3-5"> 
                        <div class="del">✖</div> 
                        <div class="recall"><i class="fas fa-undo"></i></div> 
                        <div class="mb-4 d-flex justify-content-end">
                            <div class="d-flex flex-column align-items-end">
                                <div class="username text-grey mb-1">` +n_name+ `</div>
                                <div class="loading mt-3">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="py-2 px-3">
                                    <img alt="Sticker" class="sticker mess-cont mess-cont-img" style="display: none" src="` +n_chat+ `">
                                </div>
                                <div class="mess-cont chatbox-user py-2 px-3 recall-cont-en" style="display: none;">Message recalled</div> 
                                <div class="mess-cont chatbox-user py-2 px-3 recall-cont-vi" style="display: none;">Tin nhắn đã được thu hồi</div> 
                            </div>
                            <div class="icon rounded-circle ms-3 bg-icon ml-1">
                                <img class="rounded-circle icon-img" src="` +n_avt+ `">
                            </div>
                        </div> 
                    </div>  `;  
            } else { console.log("Error:"); }
        } else if(type_user == "system"){
            var newMessage = `
                <div class="mess mess-system position-relative msg plr-3-5 system">
                    <div class="del">✖</div>  
                    <div class="mess-cont action-text text-center mb-4"><img src="https://slimetan.3ktan.com/images/hsr/icon-system-warning.png" class="symbol"> `+n_chat+`
                    </div>
                </div> `;
        } else {console.log("error");}
        
        $(newMessage).appendTo('#scroll-custom');
        scroll_custom();
        var $newMess = $(".mess").last(); 
        if(type_user != "system"){
            // function doSomethingAfterTimeout(callback) {
                setTimeout(() => {
                    $newMess.find(".loading").hide();
                    $newMess.find(".mess-cont").first().fadeIn('slow');
                    scroll_custom(); 
                    // callback();  
                }, 1000);
            // }
             
            // doSomethingAfterTimeout(() => {
                    setTimeout(() => {
                    if(recall_status){  
                        recall($newMess); 
                    }
                    
                }, 2100); 
            // });

            // setTimeout(() => {
            //     $newMess.find(".loading").hide();
            //     $newMess.find(".mess-cont").first().fadeIn('slow');
            //     scroll_custom(); 
            // }, 1000); 
            // setTimeout(() => {
            //     if(recall_status){  
            //         recall($newMess);
            //         example();
            //     }
                
            // }, 3000); 

            // Thực hiện setTimeout
            // setTimeout(() => {
            //     $newMess.find(".loading").hide();
            //     $newMess.find(".mess-cont").first().fadeIn('slow');
            //     scroll_custom(); 
            //     if (recall_status) {
            //         recall($newMess);
            //     }  
            // }, 1000);
        }  
         
 
    }   
    
    /* start mẫu tin nhận */ 
    $("#rec_btn").click(function(){ 
        var name = $("#edit-char-rec").val();
        var avt = $("#edit-char-rec-avt").val();
        var chat = $("#edit-char-rec-chat").val();
        $("#edit-char-rec-chat").val("");
        var isImg = $('#edit-char-rec-img').prop('checked');
        if(isImg){addNewMessage(name, avt, chat, "rec", "photo")}
        else {addNewMessage(name, avt, chat, "rec", "text");}
    }); 
    $("#rec_btn_2").click(function(){ 
        var name = $("#edit-char-rec-2").val();
        var avt = $("#edit-char-rec-avt-2").val();
        var chat = $("#edit-char-rec-chat-2").val();
        $("#edit-char-rec-chat-2").val("");
        var isImg = $('#edit-char-rec-img-2').prop('checked');
        if(isImg){addNewMessage(name, avt, chat, "rec", "photo")}
        else {addNewMessage(name, avt, chat, "rec", "text");}
    }); 
    $("#rec_btn_3").click(function(){ 
        var name = $("#edit-char-rec-3").val();
        var avt = $("#edit-char-rec-avt-3").val();
        var chat = $("#edit-char-rec-chat-3").val();
        $("#edit-char-rec-chat-3").val("");
        var isImg = $('#edit-char-rec-img-3').prop('checked');
        if(isImg){addNewMessage(name, avt, chat, "rec", "photo")}
        else {addNewMessage(name, avt, chat, "rec", "text");}
    });  
    /* start mẫu tin gửi */ 
    $("#send_btn").click(function(){ 
        var name = $("#edit-char-send").val();
        var avt = $("#edit-char-send-avt").val();
        var chat = $("#edit-char-send-chat").val();
        $("#edit-char-send-chat").val("");
        var isImg = $('#edit-char-send-img').prop('checked');
        if(isImg){addNewMessage(name, avt, chat, "send", "photo")}
        else {addNewMessage(name, avt, chat, "send", "text");}
    });  
    /* start mẫu tin hệ thống */ 
    $("#sys_btn").click(function(){  
        var chat = $("#edit-system-chat").val();
        $("#edit-system-chat").val("");
        addNewMessage("n", "n", chat, "system", "n");
        scroll_custom();
    });  
    
    
    
    $(document).ready(function(){ 
        scroll_custom(); 
        /* start load datalist and load it to input */ 
    
        $('#edit-char-rec').on('input', function() {
            var inputValue = $(this).val(); 
            var selectedOption = $('#characters option').filter(function() {
                return $(this).val() === inputValue;
            }); 
            if (selectedOption.length > 0) { 
                var avatarUrl = selectedOption.data('avt');
                if (avatarUrl) {
                    $('#edit-char-rec-avt').val(avatarUrl);
                    $('#edit-icon-rec').attr('src', avatarUrl); 
                } 
            }
        });
        $('#edit-char-rec-avt').on('input', function() {
            $('#edit-icon-rec').attr('src', $(this).val());
        }); 
        $('#edit-char-rec-2').on('input', function() {
            var inputValue = $(this).val(); 
            var selectedOption = $('#characters option').filter(function() {
                return $(this).val() === inputValue;
            }); 
            if (selectedOption.length > 0) { 
                var avatarUrl = selectedOption.data('avt');
                if (avatarUrl) {
                    $('#edit-char-rec-avt-2').val(avatarUrl);
                    $('#edit-icon-rec-2').attr('src', avatarUrl); 
                } 
            }
        });
        $('#edit-char-rec-avt-2').on('input', function() {
            $('#edit-icon-rec-2').attr('src', $(this).val());
        }); 
        $('#edit-char-rec-3').on('input', function() {
            var inputValue = $(this).val(); 
            var selectedOption = $('#characters option').filter(function() {
                return $(this).val() === inputValue;
            }); 
            if (selectedOption.length > 0) { 
                var avatarUrl = selectedOption.data('avt');
                if (avatarUrl) {
                    $('#edit-char-rec-avt-3').val(avatarUrl);
                    $('#edit-icon-rec-3').attr('src', avatarUrl); 
                } 
            }
        });
        $('#edit-char-rec-avt-3').on('input', function() {
            $('#edit-icon-rec-3').attr('src', $(this).val());
        }); 
    
    
        $('#edit-char-send').on('input', function() {
            var inputValue = $(this).val(); 
            var selectedOption = $('#characters option').filter(function() {
                return $(this).val() === inputValue;
            }); 
            if (selectedOption.length > 0) { 
                var avatarUrl = selectedOption.data('avt');
                if (avatarUrl) {
                    $('#edit-char-send-avt').val(avatarUrl);
                    $('#edit-icon-send').attr('src', avatarUrl); 
                } 
            }
        });
        $('#edit-char-send-avt').on('input', function() {
            $('#edit-icon-send').attr('src', $(this).val());
        }); 
        /* end load datalist and load it to input */ 
    });
    

    

    /* start run chat*/
    $('#run_chat').click(function() {  
        let messInfo = []; 
        document.querySelectorAll('.mess:not(.skip)').forEach(mess => { 
            let messData = {}; 
            if (mess.classList.contains('mess-system')) {
                messData.type = 'system';
            } else if (mess.classList.contains('mess-rec')) {
                messData.type = 'rec';
            } else if (mess.classList.contains('mess-send')) {
                messData.type = 'send';
            } else {
                messData.type = 'none';
            } 
            let username = mess.querySelector('.username');
            if (username) {
                messData.name = username.textContent.trim();
            } else {
                let chatTitle = mess.querySelector('#chat-title');
                if (chatTitle) {
                    messData.name = chatTitle.textContent.trim();
                } else {
                    messData.name = 'none';
                }
            }
        
            let iconImg = mess.querySelector('.icon-img');
            messData.url = iconImg ? iconImg.src : 'none';
        
            let messCont = mess.querySelector('.mess-cont');
            let messContImg = mess.querySelector('.mess-cont-img');

            messData.recall = false;
            if (messContImg) {
                messData.content = messContImg.src;
                messData.type_img = messContImg.classList.contains('photo') ? 'photo' : (messContImg.classList.contains('sticker') ? 'sticker' : 'none'); 
                if($(messContImg).css('display') === 'none'){messData.recall = true;}
            } else if (messCont) {
                messData.content = messCont.textContent.trim();
                messData.type_img = 'none';
                if($(messCont).css('display') === 'none'){messData.recall = true;}
            } else {
                messData.content = 'none';
                messData.type_img = 'none';
            } 
            messInfo.push(messData);
        }); 
        // console.log(JSON.stringify(messInfo, null, 2)); 

        document.querySelectorAll('.mess:not(.skip)').forEach(mess => {
            mess.remove();
        });
 
            messInfo.forEach((message, index) => { 
                    setTimeout(() => { 
                        switch (message.type) {
                            case 'rec':
                                if (message.type_img === 'none') {
                                    addNewMessage(message.name, message.url, message.content, "rec", "text", message.recall);
                                } else if(message.type_img === 'photo'){
                                    addNewMessage(message.name, message.url, message.content, "rec", "photo", message.recall);
                                } else {
                                    addNewMessage(message.name, message.url, message.content, "rec", "sticker", message.recall);
                                } 
                                scroll_custom();
                                break;
                            case 'send':
                                if (message.type_img === 'none') {
                                    addNewMessage(message.name, message.url, message.content, "send", "text", message.recall);
                                } else if(message.type_img === 'photo'){
                                    addNewMessage(message.name, message.url, message.content, "send", "photo", message.recall);
                                } else {
                                    addNewMessage(message.name, message.url, message.content, "send", "sticker", message.recall);
                                } 
                                scroll_custom();
                                break;
                            case 'system':
                                addNewMessage("n", "n", message.content, "system", "n", false);
                                scroll_custom();
                                break;
                            default:
                                console.error('Unknown message type:', message);
                                scroll_custom();
                                break;
                        }
                    }, index * 2500);     
            }); 
        
        
    }); 




    $("#edit-sticker-rec").click(function(){ 
        var name = $("#edit-char-rec").val();
        var avt = $("#edit-char-rec-avt").val();
        $("#sticker-user-name").val(name);
        $("#sticker-user-avt").val(avt);
        $("#sticker-user-type").val("rec"); 
    }); 
    $("#edit-sticker-rec-2").click(function(){ 
        var name = $("#edit-char-rec-2").val();
        var avt = $("#edit-char-rec-avt-2").val();
        $("#sticker-user-name").val(name);
        $("#sticker-user-avt").val(avt);
        $("#sticker-user-type").val("rec"); 
    }); 
    $("#edit-sticker-rec-3").click(function(){ 
        var name = $("#edit-char-rec-3").val();
        var avt = $("#edit-char-rec-avt-3").val();
        $("#sticker-user-name").val(name);
        $("#sticker-user-avt").val(avt);
        $("#sticker-user-type").val("rec"); 
    }); 
    $("#edit-sticker-send").click(function(){ 
        var name = $("#edit-char-send").val();
        var avt = $("#edit-char-send-avt").val();
        $("#sticker-user-name").val(name);
        $("#sticker-user-avt").val(avt);
        $("#sticker-user-type").val("send"); 
    }); 
    $(".sticker-listed").click(function(){ 
        var name = $("#sticker-user-name").val();
        var avt = $("#sticker-user-avt").val();
        var type = $("#sticker-user-type").val(); 
        var sticker = $(this).attr('src'); 
        addNewMessage(name, avt, sticker, type, "sticker", false) 
    }); 