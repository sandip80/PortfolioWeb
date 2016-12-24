import React from "react";
import ReactDom from "react-dom";

var Form = React.createClass({
    render: function() {
        return(<div>Hello World</div>);
    }
});

class Contacts extends React.Component {
    render() {
        return(
            <Form />
        );
    };
}

var contact = document.getElementById("contact");
ReactDom.render(<Contacts />, contact);

// $(document).ready(function() {
//     $('#contact-form').validate();
//
//     $('#contact-form').on('submit', function (e) {
//         if (!e.isDefaultPrevented()) {
//             var url = "contact.php";
//
//             $.ajax({
//                 type: "POST",
//                 url: url,
//                 data: $(this).serialize(),
//                 success: function (data)
//                 {
//                     var messageAlert = 'alert-' + data.type;
//                     var messageText = data.message;
//
//                     var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
//                     if (messageAlert && messageText) {
//                         $('#contact-form').find('.messages').html(alertBox);
//                         $('#contact-form')[0].reset();
//                     }
//                 }
//             });
//             return false;
//         }
//     })
// });