import React, { Component, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MembersAPI from './MembersAPI';
import MembersHeader from './Common/MembersHeader';
import MembersList from './MembersList';
import MembersFooter from './Common/MembersFooter';
import MembersAdvanceSearch from './MembersAdvanceSearch';
import MembersSearch from './MembersSearch';
import MembersPagination from './MembersPagination';


class MembersContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: [],
      members: [],
      filtered: [],
      searchString: "",
      optionSelector: { value: 'any', label: 'Any' },
      optionAdvanceSelector: {},
      currentPage: 1,
      membersPerPage: 25,
      membersType: 'house'
    }
    this.handleInputSearchChange = this.handleInputSearchChange.bind(this);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleAdvanceSearch = this.handleAdvanceSearch.bind(this);
  }

  componentDidMount = async () => {
    let { membersType } = this.state;
    const members = await MembersAPI.getMembers(membersType);
    this.setState({ data: members, filtered: members, members, isLoading: false })
  }

  handleInputSearchChange(e) {
    let value = e.target.value;
    this.setState({
      searchString: value,
      filtered: this.state.data.filter(e =>
        Object.values(e)
          .join(" ")
          .toLowerCase()
          .match(value.toLowerCase())
      ),
      currentPage: 1,
    });
  }

  handleOptionsChange(value) {
    let { members } = this.state;
    this.setState({ optionSelector: value, data: members, filtered: members })
  }

  async handleAdvanceSearch(value) {    
    let selectedOption = this.state.optionSelector.value;
    let { members } = this.state;
    await this.setState({ data: members })

    switch(selectedOption) {
      case 'gender':
       return this.setState({ 
         filtered: this.state.data.filter(item => item.gender === value.value), 
         data: this.state.data.filter(item => item.gender === value.value) 
        })
      case 'party':
       return this.setState({ 
         filtered: this.state.data.filter(item => item.party === value.value), 
         data: this.state.data.filter(item => item.party === value.value) 
        })
      case 'state':
       return this.setState({ 
         filtered: this.state.data.filter(item => item.state === value.value), 
         data: this.state.data.filter(item => item.state === value.value) 
        })
      default:
        break;
    }
  }

  async handleTypeOfMembers(type) {
    this.setState({ isLoading: true, membersType: type });

    const members = await MembersAPI.getMembers(type);
    this.setState({ data: members, filtered: members, members, isLoading: false, currentPage: 1 })
  }

  paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

  render() {
    let { isLoading, optionSelector, optionAdvanceSelector, currentPage, membersPerPage, filtered, membersType } = this.state;

    // Pagination
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = filtered.slice(indexOfFirstMember, indexOfLastMember);

    return (
      <Fragment>
      <div className="bg-light-gray main-container">
        <MembersHeader title={"Current members of the U.S Congress"} subtitle={""}/>
        <div className="button-group-container pt2 pb2 bg-light-gray">
          <div className="btn-group">
            <button type="button" className={membersType === 'house' ? `btn btn-outline-dark btn-md tc active`: `btn btn-outline-dark btn-md tc`} onClick={() => this.handleTypeOfMembers('house') }>House</button>
            <button type="button" className={membersType === 'senate' ? `btn btn-outline-dark btn-md tc active`: `btn btn-outline-dark btn-md tc`} onClick={() => this.handleTypeOfMembers('senate') }>Senators</button>
          </div>
        </div>
        <div className="flex bg-light-gray">
          <MembersSearch searchString={this.state.searchString} handleInputSearch={this.handleInputSearchChange}/>
          <MembersAdvanceSearch handleOptionsChange={this.handleOptionsChange} handleAdvanceSearch={this.handleAdvanceSearch} option={optionSelector} optionAdvance={optionAdvanceSelector} />
        </div>
        { isLoading ? <div className="loading-members"><CircularProgress /></div> :
          <div>
            <MembersList filtered={currentMembers} membersType={membersType}/>
            <MembersPagination membersPerPage={membersPerPage} totalMembers={filtered.length} paginate={this.paginate} currentPage={currentPage} />
          </div>
        }
      </div>
      <MembersFooter copyrights={"Design and develop by Gustavo - All rights reserved"}/>
      </Fragment>
    );
  }
}


export default MembersContainer;