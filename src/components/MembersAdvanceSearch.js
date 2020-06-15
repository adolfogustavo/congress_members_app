import React from 'react';
import Select from 'react-select';

const mainSelectorOptions = [
  { value: 'any', label: 'Any' },
  { value: 'party', label: 'Party' },
  { value: 'state', label: 'State' },
  { value: 'gender', label: 'Gender' },
];

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female'}
];

const partyOptions = [
  { value: 'Democratic', label: 'Democratic' },
  { value: 'Republican', label: 'Republican'},
  { value: 'Independent', label: 'Independent'}
]

const stateOptions = [
  { value: 'Alabama', label: 'Alabama' },
  { value: 'Alaska', label: 'Alaska'},
  { value: 'Arizona', label: 'Arizona'},
  { value: 'Arkansas', label: 'Arkansas'},
  { value: 'California', label: 'California'},
  { value: 'Colorado', label: 'Colorado'},
  { value: 'Connecticut', label: 'Connecticut'},
  { value: 'Delaware', label: 'Delaware'},
  { value: 'Florida', label: 'Florida'},
  { value: 'Georgia', label: 'Georgia'},
  { value: 'Hawaii', label: 'Hawaii'},
  { value: 'Idaho', label: 'Idaho'},
  { value: 'Illinois', label: 'Illinois'},
  { value: 'Indiana', label: 'Indiana'},
  { value: 'Iowa', label: 'Iowa'},
  { value: 'Kansas', label: 'Kansas'},
  { value: 'Kentucky', label: 'Kentucky'},
  { value: 'Louisiana', label: 'Louisiana'},
  { value: 'Maine', label: 'Maine'},
  { value: 'Maryland', label: 'Maryland'},
  { value: 'Massachusetts', label: 'Massachusetts'},
  { value: 'Michigan', label: 'Michigan'},
  { value: 'Minnesota', label: 'Minnesota'},
  { value: 'Mississippi', label: 'Mississippi'},
  { value: 'Missouri', label: 'Missouri'},
  { value: 'Montana', label: 'Montana'},
  { value: 'Nebraska', label: 'Nebraska'},
  { value: 'Nevada', label: 'Nevada'},
  { value: 'New Hampshire', label: 'New Hampshire'},
  { value: 'New Jersey', label: 'New Jersey'},
  { value: 'New Mexico', label: 'New Mexico'},
  { value: 'New York', label: 'New York'},
  { value: 'North Carolina', label: 'North Carolina'},
  { value: 'North Dakota', label: 'North Dakota'},
  { value: 'Ohio', label: 'Ohio'},
  { value: 'Oklahoma', label: 'Oklahoma'},
  { value: 'Oregon', label: 'Oregon'},
  { value: 'Pennsylvania', label: 'Pennsylvania'},
  { value: 'Rhode Island', label: 'Rhode Island'},
  { value: 'South Carolina', label: 'South Carolina'},
  { value: 'South Dakota', label: 'South Dakota'},
  { value: 'Tennesse', label: 'Tennesse'},
  { value: 'Texas', label: 'Texas'},
  { value: 'Utah', label: 'Utah'},
  { value: 'Vermont', label: 'Vermont'},
  { value: 'Virginia', label: 'Virginia'},
  { value: 'Washigton', label: 'Washigton'},
  { value: 'West Virginia', label: 'West Virginia'},
  { value: 'Wisconsin', label: 'Wisconsin'},
  { value: 'Wyoming', label: 'Wyoming'},
]



const MembersAdvanceSearch = ({ option, optionAdvanceSelector, handleAdvanceSearch, handleOptionsChange }) => {
  return (
    <div className="flex">
      <Select 
        value={option}
        options={mainSelectorOptions}
        onChange={value => handleOptionsChange(value)}
        selected={option}
        placeholder="Select Option"
        className="w4 mt1 mr2"
        id="input"
      />
      { option.value === 'gender' && 
        <Select 
          value={optionAdvanceSelector}
          options={genderOptions}
          onChange={value => handleAdvanceSearch(value)}
          selected={optionAdvanceSelector}
          placeholder="Select gender"
          className="w5 mt1"
        />
      }
      { option.value === 'party' && 
        <Select 
          value={optionAdvanceSelector}
          options={partyOptions}
          onChange={value => handleAdvanceSearch(value)}
          selected={optionAdvanceSelector}
          placeholder="Select party"
          className="w5 mt1"
        />
      }
      { option.value === 'state' && 
        <Select 
          value={optionAdvanceSelector}
          options={stateOptions}
          onChange={value => handleAdvanceSearch(value)}
          selected={optionAdvanceSelector}
          placeholder="Select state"
          className="w5 mt1"
        />
      }
    </div>
  );
};

export default MembersAdvanceSearch;