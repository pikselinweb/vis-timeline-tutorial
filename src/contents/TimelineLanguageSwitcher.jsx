import { memo } from "react";
import PropTypes from "prop-types";
// MATERIAL UI
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// LOVS
import { languageList } from "../lovs/languageList";

const TimelineLanguageSwitcher = ({ language, onChange }) => {
  const handleChangeLanguage = (event) => {
    onChange(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={language}
          label="Language"
          onChange={handleChangeLanguage}
        >
          {Array.isArray(languageList) &&
            languageList.map((lang, index) => (
              <MenuItem
                key={`lang-${lang?.value}-${index}`}
                value={lang?.value}
              >
                {lang?.text}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};
const MemorizedComponent = memo(TimelineLanguageSwitcher);
TimelineLanguageSwitcher.propTypes = {
  language: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MemorizedComponent;
