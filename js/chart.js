(function () {
    var $ = require('jquery');
    var d3 = require('d3');

    var skillDataset = [
        { label:'Java', percent:'29.42', count:'20000'},
        { label:'Javascript', percent:'22.06', count:'15000'},
        { label:'C++', percent:'16.18', count:'11000'},
        { label:'C', percent:'11.76', count:'8000'},
        { label: 'ML', percent:'6.62', count: '4500'},
        { label:'Ruby', percent:'5.14', count:'3500'},
        { label:'Racket', percent:'5.14', count:'3500'},
        { label:'Python', percent:'3.68', count:'2500'}
    ];

    var langaugeDataset = [
        { label:'English', percent:'31.25', level:'3'},
        { label:'Odia', percent:'31.25', level:'4'},
        { label:'Hindi', percent:'22.44', level:'2'},
        { label:'Japanese', percent:'15.06', level:'1'}
    ];

    var width = 300;
    var height = 300;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 50;

    var color1 = d3.scaleOrdinal(d3.schemeCategory20);
    var color2 = d3.scaleOrdinal(d3.schemeCategory10);

    var tooltip1 = d3.select('#skill-chart')
        .append('div')
        .attr('class', 'charttip');

    tooltip1.append('div')
        .attr('class', 'lab');

    tooltip1.append('div')
        .attr('class', 'count');

    var tooltip2 = d3.select('#language-chart')
        .append('div')
        .attr('class', 'charttip');

    tooltip2.append('div')
        .attr('class', 'lab');

    tooltip2.append('div')
        .attr('class', 'level');

    var svg1 = d3.select('#skill-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var svg2 = d3.select('#language-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);

    var pie = d3.pie()
        .value(function(d) { return d.percent; })
        .sort(null);

    var legendRectSize = 18;
    var legendSpacing = 4;

    var path1 = svg1.selectAll('path')
        .data(pie(skillDataset))
        .enter()
        .append('path');


    var path2 = svg2.selectAll('path')
        .data(pie(langaugeDataset))
        .enter()
        .append('path');

    function elementInViewport(el) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while(el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top >= window.pageYOffset &&
            left >= window.pageXOffset &&
            (top + height) <= (window.pageYOffset + window.innerHeight) &&
            (left + width) <= (window.pageXOffset + window.innerWidth)
        );
    }

    var $loaded1 = false;
    var $loaded2 = false;

    function loadChart1() {
        path1.attr('fill', function(d, i) {
            return color1(d.data.label);
        })
            .transition().delay(function(d, i) { return i * 500; }).duration(500)
            .attrTween('d', function(d) {
                var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                return function(t) {
                    d.endAngle = i(t);
                    return arc(d);
                }
            });

        path1.on('mouseover', function(d) {
            tooltip1.select('.lab').html('<b>Language:</b> ' + d.data.label);
            tooltip1.select('.count').html('<b>SLOC:</b> ' + d.data.count);
            tooltip1.style('display', 'block');
        });

        path1.on('mouseout', function(d) {
            tooltip1.style('display', 'none');
        });

        var legend1 = svg1.selectAll('.legend')
            .data(color1.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
                var height = legendRectSize + legendSpacing;
                var offset = height * color1.domain().length / 2;
                var horz = -2 * legendRectSize;
                var vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
            });

        legend1.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color1)
            .style('fill', color1);

        legend1.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });

        $loaded1 = true;
    }

    function loadChart2() {
        path2.attr('fill', function(d, i) {
            return color2(d.data.label);
        })
            .transition().delay(function(d, i) { return i * 500; }).duration(500)
            .attrTween('d', function(d) {
                var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                return function(t) {
                    d.endAngle = i(t);
                    return arc(d);
                }
            });

        var proficiency = ['Elementary proficiency',
            'Intermediate proficiency',
            'Professional proficiency',
            'Full professional proficiency',
            'Native proficiency'];

        path2.on('mouseover', function(d) {
            tooltip2.select('.lab').html('<b>Language:</b> ' + d.data.label);
            tooltip2.select('.level').html('<b>Proficiency:</b> ' + proficiency[d.data.level]);
            tooltip2.style('display', 'block');
        });

        path2.on('mouseout', function(d) {
            tooltip2.style('display', 'none');
        });

        var legend2 = svg2.selectAll('.legend')
            .data(color2.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
                var height = legendRectSize + legendSpacing;
                var offset = height * color2.domain().length / 2;
                var horz = -2 * legendRectSize;
                var vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
            });

        legend2.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color2)
            .style('fill', color2);

        legend2.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });

        $loaded2 = true;
    }

    $(window).on('load', function() {
        if (elementInViewport($("#skill-chart")[0]) && !$loaded1) {
            loadChart1();
        }
        if (elementInViewport($("#language-chart")[0]) && !$loaded2) {
            loadChart2();
        }
    });

    $(window).scroll(function() {
        if (elementInViewport($("#skill-chart")[0]) && !$loaded1) {
            loadChart1();
        }
        if (elementInViewport($("#language-chart")[0]) && !$loaded2) {
            loadChart2();
        }
    });

    $('.slider').click(function() {
        if (!$loaded1 && !$loaded2) {
            loadChart1();
            loadChart2();
        }
    });

    $('#mbutton1').click(function() {
        if (!$loaded1 && !$loaded2) {
            loadChart1();
            loadChart2();
        }
    });
})();
