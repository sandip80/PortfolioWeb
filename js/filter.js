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
				}
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
                title: "Squares",
                code: ["Java"],
                image: "./img/dummy.jpg",
                description: "A 2D game designed in java. The project mainly demonstrates the design of the game engine " +
				"and the management of the resources when they are imported into the program.",
                link: "https://github.com/sandip80/squares"
            },
            {
                title: "Rubik's cube solver",
                code: ["C++"],
                image: "./img/dummy.jpg",
                description: "A C++ group project that uses macro operators to solve Rubik's cube. The project is an " +
				"application of the thesis, “Learning to Solve Problems by Searching for Macro-Operators” written by " +
				"Richard E. Korf. My responsibilities in the project included building a GUI framework for the Rubik's " +
				"cube and a test 15 puzzle game.",
                link: "https://github.com/sandip80/MO"
            },
            {
                title: "CampusMap Navigator",
                code: ["Java"],
                image: "./img/dummy.jpg",
                description: "The project involved creating a Java swing app to navigate between two buildings in the " +
				"UW campus. The app uses Dijkstra's algorithm to find the shortest path between two nodes in a graph " +
				"where the nodes are the campus buildings.",
                link: "http://sandips.xyz/assets/CampusMapNavigator.zip"
            },
            {
                title: "333 Web search engine",
                code: ["C", "C++"],
                image: "./img/dummy.jpg",
                description: "The project was about implementing a web search engine using both C and C++. It uses " +
				"inverted index structure to process the query.",
                link: "http://333gle.ngrok.io/"
            },
			{
                title: "Oracle",
                code: ["Javascript", "Python"],
                image: "./img/dummy.jpg",
                description: "This project is a chat bot that assist clients with the up to date information about the " +
				"stock market. The bot is developed on a node server with a python program running on the backend. The python " +
				"program analyzes the data extracted from NASDAQ api and uses Sentiment Analysis of IBM Watson api to make " +
				"a quick prediction of stock.",
                link: "https://github.com/sandip80/Oracle"
			},
            {
                title: "VRifyData",
                code: ["VR"],
                image: "./img/dummy.jpg",
                description: "This project is a VR application that creates a new way to experience, analyze, and " +
				"represent data through virtual reality.",
                link: "https://github.com/Keydex/VRifyData"
            }
        ];
        var curAttributes = [];
        var k = 0;
        var createNewProjectNode = function (k, i) {
			return(<ProjectNode key={i + 1} title={projects[i].title} image={projects[i].image}
							 description={projects[i].description} link={projects[i].link} wait={0}/>);
        }
		for (var i = 0; i < projects.length; i++) {
			if(this.state.activeFilter["All"]) {
                curAttributes[k++] = createNewProjectNode(k, i);
			} else {
                var code = projects[i].code;
                for (var j = 0; j < code.length; j++) {
                    if (this.state.activeFilter[code[j]]) {
                        curAttributes[k++] = createNewProjectNode(k, i);
                        break;
                    }
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
