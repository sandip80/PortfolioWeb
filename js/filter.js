import React from "react";
import ReactDom from "react-dom";
import { Parallax, Background } from 'react-parallax';

var ProjectNode = React.createClass({
	getInitialState: function() {
		return { hidden: "hidden", showText: false };
	},

	onMouseEnter: function() {
		this.setState({ hidden: "", showText: true });
	},

	onMouseLeave: function() {
		this.setState({ hidden: "", showText: false});
	},

	componentWillMount : function() {
		var that = this;
		setTimeout(function() {
			that.show();
		}, that.props.wait);
	},

	show: function() {
		this.setState({ hidden: "", showText: false });
	},

    render: function() {
        return (
			<div className={this.state.hidden + " animated fadeIn project-tab"}
				 onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
				<a className="phone-link" href={this.props.link}>
					<img className="img img-responsive project-image" src={this.props.image} />
				</a>
				<img className="img img-responsive project-image project-normal-image" src={this.props.image} />
				{
					this.state.showText ?
					<div className="project-text text-center">
						<h4>{this.props.title}</h4>
						<hr className="project-hr"/>
						<p className="project-description">{this.props.description}</p>
						<a className="btn btn-primary sharp outline project-link" href={this.props.link}>Learn More</a>
					</div>
					: null
				}
				<div className="phone-text text-center">
					<h4>{this.props.title}</h4>
				</div>
			</div>
        );
    }
});

class ProjectViewer extends React.Component {
	render() {
		var programmingLanguages = ["All", "Java", "C++", "C", "Javascript"];
        var projects = [
            {
                title: "Project1",
                code: ["Java", "C++"],
                image: "../img/dummy.jpg",
                description: "This is a dummy project 1",
                link: "http://www.google.com"
            },
            {
                title: "Project2",
                code: ["C++"],
                image: "../img/dummy.jpg",
                description: "This is a dummy project 2",
                link: "http://www.yahoo.com"
            },
            {
                title: "Project3",
                code: ["C", "C++"],
                image: "../img/dummy.jpg",
                description: "This is a dummy project 3",
                link: "http://www.amazon.com"
            }
        ];
        var curAttributes = [];
		for (var i = 0; i < projects.length; i++) {
			curAttributes[i] = <ProjectNode title={projects[i].title} image={projects[i].image}
											description={projects[i].description} link={projects[i].link} wait={(i + 1) * 100}/>
		}
		return (
			<div className="project-viewer">
				<Parallax strength={400}>
					<Background>
						<img src="../img/projectviewerb.jpg"/>
					</Background>
					<div className="project-filter-options">
					</div>
					<div className="list-inline">
						{curAttributes}
					</div>
				</Parallax>
			</div>
		);
	}
}

class Filter extends React.Component {
	render() {
		return(
			<div className="project-filter">
				<ProjectViewer />
			</div>
		);
	}
}

const app = document.getElementById("app");
ReactDom.render(<Filter />, app);
