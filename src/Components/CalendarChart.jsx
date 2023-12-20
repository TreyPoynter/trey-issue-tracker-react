/*eslint-disable */
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { timeParse } from 'd3-time-format';


export default function CalendarChart({ setNotViewing, userId }) {
    const svgRef = useRef(null);
    const [data, setData] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'))._id
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/edits/${userId}`, { withCredentials: true })
            .then(
                res => {
                    console.log(res)
                    setData(res.data.tests);
                }
            ).catch(error => { console.log(error) });
    }, [])

    useEffect(() => {
        // Filter data for the current month
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const filteredData = data.filter((d) => {
            const date = new Date(d.dateEdited);
            return date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear;
        });
        console.log(filteredData[0]?.dateEdited)

        const svg = d3.select(svgRef.current);

        // Set up dimensions
        // Set up dimensions based on container size
        const containerWidth = svgRef.current.clientWidth;
        const containerHeight = svgRef.current.clientHeight;

        const margin = { top: 10, right: 10, bottom: 20, left: 30 };
        const width = containerWidth - margin.left - margin.right;
        const height = containerHeight - margin.top - margin.bottom;

        // Group for the heatmap
        const heatmap = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        // Get unique users and dates
        const days = Array.from({ length: new Date(currentYear, currentMonth, 0).getDate() }, (_, i) => i + 1);
        const dates = days.map((day) => `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);

        // Create color scale
        const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([0, d3.max(filteredData, (d) => d.count)]);

        // Create rectangles for the heatmap
        heatmap
            .selectAll('rect')
            .data(dates)
            .enter()
            .append('rect')
            .attr('x', (d) => dates.indexOf(d) % 7 * (width / 7) + 2)
            .attr('y', (d) => Math.floor(dates.indexOf(d) / 7) * (height / Math.ceil(dates.length / 7)) + 2)
            .attr('width', (width / 7) - 4)
            .attr('height', (height / Math.ceil(dates.length / 7)) - 4)
            .style('fill', (d) => {
                const dataForDate = filteredData.find((item) => item.dateEdited === d);
                return dataForDate ? colorScale(dataForDate.count) : 'white';
            })
            .style('stroke', 'black')
            .style('stroke-width', 1);
        // Create color legend
        const legendWidth = 200;
        const legendHeight = 20;
        const legendMargin = { top: 10, right: 10, bottom: 25, left: 10 };
        const legend = svg.append('g')
            .attr('transform', `translate(${containerWidth - legendWidth - legendMargin.right},${containerHeight - legendHeight - legendMargin.bottom})`);
        const numColorSquares = 5;
        const colorSquareWidth = legendWidth / numColorSquares;
        const defs = svg.append('defs');

        // Add gradient to the legend
        const gradient = defs.append('linearGradient')
            .attr('id', 'legendGradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%');

        gradient.append('stop')
            .attr('offset', '0%')
            .style('stop-color', colorScale(0)); // White

        gradient.append('stop')
            .attr('offset', '100%')
            .style('stop-color', colorScale(1)); // Darkest shade

        legend.append('rect')
            .attr('width', legendWidth)
            .attr('height', legendHeight)
            .style('fill', 'url(#legendGradient)');

        // Add color squares in the legend (reverse color scale)
        for (let i = 0; i < numColorSquares; i++) {
            legend.append('rect')
                .attr('x', i * colorSquareWidth)
                .attr('y', 0)
                .attr('width', colorSquareWidth)
                .attr('height', legendHeight)
                .style('fill', colorScale(i / (numColorSquares))); // Adjusted scale
        }

        // Make the farthest square as dark as the darkest color in the chart
        legend.select('rect:last-child')
            .style('fill', colorScale(8)); // Use the maximum color value

        // Add "less" and "more" labels
        legend.append('text')
            .attr('x', 0)
            .attr('y', legendHeight + 15)
            .text('Less');

        legend.append('text')
            .attr('x', legendWidth)
            .attr('y', legendHeight + 15)
            .style('text-anchor', 'end')
            .text('More');

        // Cleanup function
        return () => {
            svg.selectAll('*').remove();
            d3.select(".tooltip").remove();
        };
    }, [data]);

    return (
        <>
            <div className='position-absolute productivity'>
                <div className='d-flex justify-content-between'>
                    <i onClick={() => setNotViewing()} className="fa-solid fa-x fs-3 clickable"></i>
                    <h3 className='text-center'>This Month's Edits</h3>
                    <h3 className='text-center'></h3>
                </div>
                <svg ref={svgRef} width={600} height={400}></svg>
            </div>
        </>
    );
}