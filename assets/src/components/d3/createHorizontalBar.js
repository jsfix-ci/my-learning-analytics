import * as d3 from 'd3'
import { adjustViewport } from '../../util/chart'
import { siteTheme } from '../../globals'

function createHorizontalBar ({ data, width, height, domElement, tip }) {
  const margin = { top: 0, bottom: 0, left: 0, right: 0 }
  const gradedColor = siteTheme.palette.secondary.main
  const ungradedColor = siteTheme.palette.info.main
  const unsubmittedColor = siteTheme.palette.negative.main
  const [aWidth, aHeight] = adjustViewport(width, height, margin)

  const x = d3.scaleLinear()
    .domain([0, 100]).nice()
    .range([margin.left, aWidth - margin.right])

  const y = d3.scaleBand()
    .domain(data.map(d => d.label))
    .range([aHeight - margin.bottom, margin.top])
    .padding(0.1)

  const svg = d3.select(domElement).append('svg')
    .attr('width', aWidth)
    .attr('height', aHeight)

  const bar = svg.selectAll('g')
    .data(data).enter()
    .append('g')

  bar.append('rect')
    .attr('x', d => {
      x(0)
    })
    .attr('width', d => d.data === 0
      ? 4
      : (x(d.data) - x(0)) + 4)
    .attr('y', d => {
      y(d.label)
    })
    .attr('height', y.bandwidth())
    .attr('fill', d => d.graded ? gradedColor : d.submitted ? ungradedColor : unsubmittedColor)

  // appending text end of the bar with some padding
  bar.append('text')
    .attr('x', d => x(d.data) - x(0) + 6)
    .attr('y', d => y(d.label) + 12)
    .text(d => `${d.data}%`)

  if (tip) {
    tip.direction('e')
    svg.call(tip)
    /* TODO: JSFIX could not patch the breaking change:
    Remove d3.event and changed the interface for the listeners parsed to .on() methods 
    Suggested fix: 
    This is only breaking if the second argument to .on() is being parsed the “index” (i) and “elements” (e) as arguments. 
    The signature of the listeners have been changed to now only take the event object and the “datum” (d) (which it already did).
    To get the existing “index” and “elements” functionality you can inside the listener use
        const selection = event.selection;
        const e = selection.nodes();
        const i = e.indexOf(this);
    For further details see the official migration guide here: https://observablehq.com/@d3/d3v6-migration-guide#events. 
     */
    /* TODO: JSFIX could not patch the breaking change:
    Remove d3.event and changed the interface for the listeners parsed to .on() methods 
    Suggested fix: 
    This is only breaking if the second argument to .on() is being parsed the “index” (i) and “elements” (e) as arguments. 
    The signature of the listeners have been changed to now only take the event object and the “datum” (d) (which it already did).
    To get the existing “index” and “elements” functionality you can inside the listener use
        const selection = event.selection;
        const e = selection.nodes();
        const i = e.indexOf(this);
    For further details see the official migration guide here: https://observablehq.com/@d3/d3v6-migration-guide#events. 
     */
    bar
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
  }
}

export default createHorizontalBar
