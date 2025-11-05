import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

export default function ChooseInternetWebsite({
  chosenWebsite,
  setChosenWebsite,
  packets,
  setPackets,
}) {
  const handleWebsiteChange = (event) => {
    setChosenWebsite(event.target.value);
  };

  const handlePacketsChange = (event) => {
    setPackets(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="choose-website-label">Choose Website</InputLabel>
        <Select
          labelId="choose-website-label"
          id="choose-website"
          value={chosenWebsite}
          label="Choose Website"
          onChange={handleWebsiteChange}
        >
          <MenuItem value="google.com">Google</MenuItem>
          <MenuItem value="facebook.com">Facebook</MenuItem>
          <MenuItem value="x.com">Twitter</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ width: 300 }}>
        <Slider
          defaultValue={1}
          aria-label="Default"
          valueLabelDisplay="auto"
          max={4}
          min={1}
          onChange={handlePacketsChange}
        />
      </Box>
    </div>
  );
}
