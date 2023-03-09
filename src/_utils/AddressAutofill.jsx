import { AddressAutofill } from '@mapbox/search-js-react';
import { TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../config/ConfigContextProvider';

const Autofill = ({ placeholder, setValue, value }) => {
  const { mapBoxAccessToken } = useContext(ConfigContext)
  const [textValue, setTextValue] = useState(value);
  useEffect(()=>{
    setTextValue(value)
  },[value])
  const onValueChange = e => {
    setTextValue(e.target.value)
  }
  const onRetrieve = e => {
    if (e.features.length === 1) {
      const { geometry, properties } = e.features[0];
      setValue(properties.full_address, geometry.coordinates);
    }
  }
  return (
    <form>
      <AddressAutofill accessToken={mapBoxAccessToken} onRetrieve={onRetrieve}>
        <TextField
          autoComplete="shipping address-line1"
          value={textValue}
          onChange={onValueChange}
          placeholder={placeholder}
        />
      </AddressAutofill>
    </form>
  );
}

export default Autofill