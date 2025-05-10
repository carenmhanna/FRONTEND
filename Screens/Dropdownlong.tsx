import React from 'react';
import { View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

interface DropdownProps {
  placeholder?: string;
  options: { key: string; value: string }[];
  setSelected: React.Dispatch<React.SetStateAction<string>>; // This is used to set the selected value
}

const Dropdownlong: React.FC<DropdownProps> = ({ placeholder = "Select an option", options, setSelected }) => {
  return (
    <View style={{ width: 200, position: 'relative', zIndex: 1 }}>
      <SelectList
        setSelected={setSelected} // Pass setSelected to handle selection
        data={options}
        placeholder={placeholder}
        boxStyles={{
          borderColor: '#6B2A88',
          width: '100%',
          height: 50,
          backgroundColor: '#EABAFF',
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        inputStyles={{
          color: 'black',
          fontSize: 16,
          paddingLeft: 10,
        }}
      />
    </View>
  );
};

export default Dropdownlong;
