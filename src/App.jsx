import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// TIMELINE
import { Timeline, DataSet } from "vis-timeline/standalone";
// MATERIAL UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
// CONTENTS
import TimelineLanguageSwitcher from "./contents/TimelineLanguageSwitcher";

const DAY = 24 * 60 * 60 * 1000;

function App() {
  // REFS
  const timelineRef = useRef(null);
  const timelineElementRef = useRef();
  // STATE
  const [selectedLang, setSelectedLang] = useState("en");
  // CHANGE LANGUAGE
  const changeSelectedLanguage = useCallback((langVal) => {
    setSelectedLang(langVal);
    timelineRef.current?.setOptions({
      locale: langVal,
    });
  }, []);
  // ITEMS
  const timelineItems = useMemo(() => {
    return new DataSet([
      { id: 1, content: "item 1", start: new Date(Date.now() - DAY) },
      { id: 2, content: "item 2", start: new Date(Date.now() + 2 * DAY) },
    ]);
  }, []);
  // OPTIONS
  const timelineOptions = useMemo(() => {
    return {
      showCurrentTime: true,
      height: "100%",
      locale: selectedLang,
    };
  }, [selectedLang]);
  
  useEffect(() => {
    
    if (timelineElementRef.current && !timelineRef.current) {
      timelineRef.current = new Timeline(
        timelineElementRef.current,
        timelineItems,
        timelineOptions
      );
    }

    return () => {
      timelineElementRef.current = null;
    };
  }, [timelineItems, timelineOptions]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        px: 3,
        py: 1,
        gap: 2,
      }}
    >
      <AppBar position="relative" elevation={0} color="default">
        <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Box component="span">Vis Timeline</Box>
          <TimelineLanguageSwitcher
            language={selectedLang}
            onChange={changeSelectedLanguage}
          />
        </Toolbar>
      </AppBar>
      <Paper
        sx={{ flexGrow: 1, position: "relative" }}
        ref={timelineElementRef}
      ></Paper>
    </Box>
  );
}

export default App;
