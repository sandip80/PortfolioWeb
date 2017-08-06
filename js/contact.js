import React from "react";
import ReactDom from "react-dom";
import $ from "jquery";

var FormHeader = React.createClass({
    render: function() {
        return(
            <div className="contact-header">
                <h2>Contact Me</h2>
                <hr/>
                <ul className="text-center list-inline">
                    <li><i className="fa fa-home" aria-hidden="true"></i>5000 25th Ave NE 5103-D Seattle, WA, United States 98105</li>
                    <li><i className="fa fa-envelope" aria-hidden="true"></i>xenosis@sandips.xyz</li>
                    <li><i className="fa fa-phone" aria-hidden="true"></i>(971) 801-0173</li>
                </ul>
            </div>
        );
    }
});

var CheckMark = React.createClass({
    render: function() {
        return((this.props.value !== "" ? <i className={"fa "+ (this.props.valid ? "fa-check" : "fa-times") + " check-mark"} aria-hidden="true"></i> : null));
    }
});

var Form = React.createClass({
    getInitialState: function() {
        return({first:"", last:"", email:"", phone:"", message:""});
    },

    handleSubmit: function(e) {
        $('#c-form').validate();
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $('#c-form').serialize(),
                always: function (data)
                {
                    $('#after-form-submit').css({"visibility" : "visible"});
                }
            });
            return false;
        }
    },

    isValidFirst: function() {
        return this.state.first.match(/^([A-Z]*[a-z]*)*$/g);
    },

    isValidLast: function() {
        return this.state.last.match(/^([A-Z]*[a-z]*)*$/g);
    },

    isValidEmail: function() {
        return this.state.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g);
    },

    isValidPhone: function() {
        return this.state.phone.match(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/g);
    },

    isValidMessage: function() {
        return this.state.message.match(/.+/g);
    },

    handleFirst: function(event) {
        this.setState({first: event.target.value});
    },

    handleLast: function(event) {
        this.setState({last: event.target.value});
    },

    handleEmail: function(event) {
        this.setState({email: event.target.value});
    },

    handlePhone: function(event) {
        this.setState({phone: event.target.value});
    },

    handleMessage: function(event) {
        this.setState({message: event.target.value});
    },

    render: function() {
        return(
            <form className="contact-form" id="c-form" method="POST" action="contact.php" role="form" onSubmit={this.handleSubmit}>
                <div className="messages"></div>
                <div className="row">
                    <div className="col-md-12 form-group">
                        <label className="form-control-label">First Name*</label>
                        <CheckMark valid={this.isValidFirst()} value={this.state.first}/>
                        <input name="name" type="text" placeholder="Please enter your first name*" className="form-control"
                               required="required" value={this.state.first} onChange={this.handleFirst}/>
                    </div>
                    <div className="col-md-12 form-group">
                        <label className="form-control-label">Last Name*</label>
                        <CheckMark valid={this.isValidLast()} value={this.state.last}/>
                        <input name="surname" type="text" placeholder="Please enter your last name*" className="form-control"
                               required="required" value={this.state.last} onChange={this.handleLast}/>
                    </div>
                    <div className="col-md-12 form-group">
                        <label className="form-control-label">Email*</label>
                        <CheckMark valid={this.isValidEmail()} value={this.state.email}/>
                        <input name="email" type="email" placeholder="Please enter your email*" className="form-control"
                               required="required" value={this.state.email} onChange={this.handleEmail}/>
                    </div>
                    <div className="col-md-12 form-group">
                        <label className="form-control-label">Phone</label>
                        <CheckMark valid={this.isValidPhone()} value={this.state.phone}/>
                        <input name="phone" type="tel" placeholder="Please enter your phone number" className="form-control"
                               value={this.state.phone} onChange={this.handlePhone}/>
                    </div>
                    <div className="col-md-12 form-group">
                        <label className="form-control-label">Message*</label>
                        <CheckMark valid={this.isValidMessage()} value={this.state.message}/>
                        <textarea name="message" placeholder="Please enter your message*" className="form-control"
                                  required="required" value={this.state.message} onChange={this.handleMessage}></textarea>
                    </div>
                    <div className="col-xs-12 form-group">
                        <button className="btn btn-primary sharp outline" type="submit">Send Message</button>
                    </div>
                    <div className="col-xs-6" id="after-form-submit"><i className="fa fa-check-circle"></i>Message sent successfully</div>
                    <div className="col-xs-12">
                        <strong>*</strong> These fields are required.
                    </div>
                </div>
            </form>
        );
    }
});

var MapHolder = React.createClass({render: function() {return(<div id="map"></div>);}});

var FormFooter = React.createClass({
    render:function() {
        return(
            <div className="contact-footer">
            <ul className="list-inline">
            <li><a target="_blank" href="https://www.facebook.com/sandip.samantaray.121" className="img img-circle" title="Facebook"><i className="fa fa-facebook"></i></a></li>
            <li><a target="_blank" href="https://twitter.com/SandipSamantray" className="img img-circle" title="Twitter"><i className="fa fa-twitter"></i></a></li>
            <li><a target="_blank" href="https://github.com/sandip80" className="img img-circle" title="GitHub"><i className="fa fa-github"></i></a></li>
            <li><a target="_blank" href="https://plus.google.com/+SandipSamantaray/" className="img img-circle" title="Google +"><i className="fa fa-google-plus"></i></a></li>
            <li><a target="_blank" href="https://www.linkedin.com/in/sandip80" className="img img-circle" title="Linkedin"><i className="fa fa-linkedin"></i></a></li>
            </ul>
            <div id="copyright">Copyright © 2017 Sandip Samantaray</div>
            </div>
        );
    }
});

class Contacts extends React.Component {
    render() {
        return(
            <div>
                <FormHeader/>
                <Form/>
                <MapHolder/>
                <FormFooter/>
            </div>
        );
    };
}

var contact = document.getElementById("contact");
ReactDom.render(<Contacts />, contact);