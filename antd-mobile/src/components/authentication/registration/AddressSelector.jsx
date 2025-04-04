import React, { useState, useEffect } from 'react';
import { Form, Picker, Button, Toast } from 'antd-mobile';
import { Country, State, City } from 'country-state-city';

const AddressSelector = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState({
    country: false,
    state: false,
    district: false,
    tehsil: false
  });

  // Get all countries and find India
  const allCountries = Country.getAllCountries();
  const defaultCountry = allCountries.find(c => c.name === 'India') || allCountries[0];

  // State data
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);

  // Initialize form with default country
  useEffect(() => {
    form.setFieldsValue({ 
      country: defaultCountry.isoCode,
      countryName: defaultCountry.name
    });
    loadStates(defaultCountry.isoCode);
  }, []);

  // Load states when country changes
  const loadStates = (countryCode) => {
    const countryStates = State.getStatesOfCountry(countryCode);
    setStates(countryStates);
    form.setFieldsValue({ state: null, district: null, tehsil: null });
  };

  // Load districts when state changes
  const loadDistricts = (countryCode, stateCode) => {
    
    const stateCities = City.getCitiesOfState(countryCode, stateCode);
    setDistricts(stateCities);
    form.setFieldsValue({ district: null, tehsil: null });
  };

  // Load tehsils when district changes (using same cities list as tehsils)
  const loadTehsils = (district) => {
    // In many cases, tehsils aren't available in the library
    // So we'll just use the district name as a placeholder
    setTehsils([{ name: `${district.name} Tehsil` }]);
    form.setFieldsValue({ tehsil: null });
  };

  // Handler for picker confirmations
  const handleConfirm = (type, value) => {
    switch (type) {
      case 'country':
        const country = allCountries.find(c => c.isoCode === value[0]);
        form.setFieldsValue({ 
          country: country.isoCode,
          countryName: country.name,
          state: null,
          district: null,
          tehsil: null
        });
        loadStates(country.isoCode);
        break;
      case 'state':
        const state = states.find(s => s.isoCode === value[0]);
        form.setFieldsValue({ 
          state: state.isoCode,
          stateName: state.name,
          district: null,
          tehsil: null
        });
        loadDistricts(form.getFieldValue('country'), state.isoCode);
        break;
      case 'district':
        const district = districts.find(d => d.name === value[0]);
        form.setFieldsValue({ 
          district: district.name,
          tehsil: null
        });
        loadTehsils(district);
        break;
      case 'tehsil':
        form.setFieldsValue({ tehsil: value[0] });
        break;
    }
    setVisible({ ...visible, [type]: false });
  };

  return (
    <Form form={form}>
      {/* Country Selector */}
      <Form.Item name="countryName" label="Country">
        <div 
          onClick={() => setVisible({ ...visible, country: true })}
          style={{ padding: '6px 0', cursor: 'pointer' }}
        >
          {form.getFieldValue('countryName') || 'Select Country'}
        </div>
        <Picker
          columns={[allCountries.map(c => ({ label: c.name, value: c.isoCode }))]}
          visible={visible.country}
          onClose={() => setVisible({ ...visible, country: false })}
          onConfirm={(v) => handleConfirm('country', v)}
          defaultValue={[defaultCountry.isoCode]}
        />
      </Form.Item>

      {/* State Selector (only shown when country is selected) */}
      {form.getFieldValue('country') && (
        <Form.Item name="stateName" label="State">
          <div 
            onClick={() => states.length > 0 && setVisible({ ...visible, state: true })}
            style={{ padding: '6px 0', cursor: states.length > 0 ? 'pointer' : 'not-allowed' }}
          >
            {form.getFieldValue('stateName') || 'Select State'}
          </div>
          <Picker
            columns={[states.map(s => ({ label: s.name, value: s.isoCode }))]}
            visible={visible.state}
            onClose={() => setVisible({ ...visible, state: false })}
            onConfirm={(v) => handleConfirm('state', v)}
          />
        </Form.Item>
      )}

      {/* District Selector (only shown when state is selected) */}
      {form.getFieldValue('state') && (
        <Form.Item name="district" label="District">
          <div 
            onClick={() => districts.length > 0 && setVisible({ ...visible, district: true })}
            style={{ padding: '6px 0', cursor: districts.length > 0 ? 'pointer' : 'not-allowed' }}
          >
            {form.getFieldValue('district') || 'Select District'}
          </div>
          <Picker
            columns={[districts.map(d => ({ label: d.name, value: d.name }))]}
            visible={visible.district}
            onClose={() => setVisible({ ...visible, district: false })}
            onConfirm={(v) => handleConfirm('district', v)}
          />
        </Form.Item>
      )}

      {/* Tehsil Selector (only shown when district is selected) */}
      {form.getFieldValue('district') && (
        <Form.Item name="tehsil" label="Tehsil">
          <div 
            onClick={() => tehsils.length > 0 && setVisible({ ...visible, tehsil: true })}
            style={{ padding: '6px 0', cursor: tehsils.length > 0 ? 'pointer' : 'not-allowed' }}
          >
            {form.getFieldValue('tehsil') || 'Select Tehsil'}
          </div>
          <Picker
            columns={[tehsils.map(t => ({ label: t.name, value: t.name }))]}
            visible={visible.tehsil}
            onClose={() => setVisible({ ...visible, tehsil: false })}
            onConfirm={(v) => handleConfirm('tehsil', v)}
          />
        </Form.Item>
      )}

      
    </Form>
  );
};

export default AddressSelector;

