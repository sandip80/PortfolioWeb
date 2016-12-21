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
			<div className={this.state.hidden + " animated bounceIn project-tab"}
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

var ProjectViewer = React.createClass({
	getInitialState: function () {
		return(
			{
				activeFilter: {
					"All": true,
					"Java": false,
					"C++": false,
					"C": false,
					"Javascript": false,
					"VR": false
				},
				inViewPort: false
			}
		);
    },

	handleClick: function(value) {
		this.setState(state => {
			if (value != "All") {
                state.activeFilter["All"] = false;
			} else {
				state.activeFilter["Java"] = false;
                state.activeFilter["C++"] = false;
                state.activeFilter["C"] = false;
                state.activeFilter["Javascript"] = false;
                state.activeFilter["VR"] = false;
			}
			state.activeFilter[value] = !state.activeFilter[value];
			var totalB = false;
			for (var key in state.activeFilter) {
				totalB = totalB || state.activeFilter[key];
			}
			if (!totalB) {
                state.activeFilter["All"] = true;
			}
			return state;
		});
    },

	render : function() {
		const programmingLanguages = ["All", "Java", "C++", "C", "Javascript", "VR"];
		var filters = [];
		var clickFunctions = [
            ()=> this.handleClick("All"),
            ()=> this.handleClick("Java"),
            ()=> this.handleClick("C++"),
            ()=> this.handleClick("C"),
            ()=> this.handleClick("Javascript"),
            ()=> this.handleClick("VR"),
		];
		for (i = 0; i < programmingLanguages.length; i++) {
			filters[i] = (<li key={i + 1} className={this.state.activeFilter[programmingLanguages[i]] ? "filter-active" : null}>
							<a href='#null' onClick={clickFunctions[i]}>
								{programmingLanguages[i]}
							</a>
						</li>);
		}
        const projects = [
            {
                title: "Project1",
                code: ["Java", "C++"],
                image: "./img/dummy.jpg",
                description: "This is a dummy project 1",
                link: "http://www.google.com"
            },
            {
                title: "Project2",
                code: ["C++"],
                image: "./img/dummy.jpg",
                description: "This is a dummy project 2",
                link: "http://www.yahoo.com"
            },
            {
                title: "Project3",
                code: ["C", "C++"],
                image: "./img/dummy.jpg",
                description: "This is a dummy project 3",
                link: "http://www.amazon.com"
            }
        ];
        var curAttributes = [];
        var k = 0;
        var createNewProjectNode = function (k, i) {
			return(<ProjectNode key={i + 1} title={projects[i].title} image={projects[i].image}
							 description={projects[i].description} link={projects[i].link} wait={(k + 1) * 100}/>);
        }
		for (var i = 0; i < projects.length; i++) {
			if(this.state.activeFilter["All"]) {
                curAttributes[k++] = createNewProjectNode(k, i);
			} else {
                var code = projects[i].code;
                for (var j = 0; j < code.length; j++) {
                    if (this.state.activeFilter[code[j]]) {
                        curAttributes[k++] = createNewProjectNode(k, i);
                    }
                    break;
                }
			}
		}
		return (
			<div className="project-viewer">
				<Parallax strength={400}>
					<Background>
						<img src="./img/projectviewerb.jpg"/>
					</Background>
					<h2>Projects</h2>
					<hr />
					<div className="project-filter-options">
						<ul className="filters list-inline">
							{filters}
						</ul>
					</div>
					<div className="list-inline">
						{curAttributes}
					</div>
				</Parallax>
			</div>
		);
	}
});

class Filter extends React.Component {
	render() {
		return(
			<div className="project-filter">
				<ProjectViewer />
			</div>
		);
	}
}

const app = document.getElementById("filter");
ReactDom.render(<Filter />, app);
