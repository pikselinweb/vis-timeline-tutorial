import { useEffect, useMemo, useRef } from "react";
// TIMELINE
import { Timeline, DataSet } from "vis-timeline/standalone";
import './App.css'
const DAY = 24 * 60 * 60 * 1000;

function App() {
  // REFS
  const timelineRef = useRef(null);
  const timelineElementRef = useRef();
  // ITEMS
const timelineItems = useMemo(()=>{
  return new DataSet([
    { id: 1, content: "item 1", start: new Date(Date.now() - DAY) },
    { id: 2, content: "item 2", start: new Date(Date.now() + 2 * DAY) },
  ])
},[])
// OPTIONS
const timelineOptions = useMemo(()=>{
  return {
    showCurrentTime: true,
    height:"100%",
  }
},[])
  useEffect(() => {
    if (timelineElementRef.current && !timelineRef.current) {
      timelineRef.current = new Timeline(
        timelineElementRef.current,
       timelineItems,
        timelineOptions
      );
    }
  
    return () => {
      timelineRef.current = null;
      timelineElementRef.current = null;
    }
  }, [timelineItems, timelineOptions])
  

  return (
    <div ref={timelineElementRef} id="timeline-container">

    </div>
  )
}

export default App
