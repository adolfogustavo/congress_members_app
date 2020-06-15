import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment'
import MembersAPI from './MembersAPI';
import MembersHeader from './Common/MembersHeader';
import MembersFooter from './Common/MembersFooter';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SocialIcon } from 'react-social-icons';

const MembersInfo = () => {
  const [member, setMember] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let memberId = window.location.pathname.replace('/','');
    const getData = async () => {
      const result = await MembersAPI.getOneMember(memberId);
      setMember(result);
      setLoading(false);
    };
    getData();
  }, []);


  return (
    <Fragment>
      {!isLoading && 
      <div>
          <MembersHeader title={`${member.short_title} ${member.full_name}`} subtitle={member.title}/>
          <div className="member-info-container">
            <div className="flex">
              <div className="w-25 pa3"><span className="b">Born:</span> {moment(member.date_of_birth).format("MMMM D, YYYY")}</div>
              <div className="w-25 pa3"><span className="b">Party:</span> {member.party}</div>
              <div className="w-25 pa3"><span className="b">Next Elections:</span> {member.next_election}</div>
              <div className="w-25 pa3 flex">
                <div className="pr3">
                  { member.facebook_account_url !== null && <SocialIcon url={member.facebook_account_url} target="_blank" rel="noopener noreferrer"/> }
                </div>
                <div className="pr3">
                  { member.twitter_account_url !== null && <SocialIcon url={member.twitter_account_url} target="_blank" rel="noopener noreferrer"/> }
                </div>
                <div className="pr3">
                  { member.youtube_account_url !== null && <SocialIcon url={member.youtube_account_url} target="_blank" rel="noopener noreferrer"/>}
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="w-25 pa3"><span className="b">State:</span> {member.state}</div>
              <div className="w-25 pa3"><span className="b">Elected In:</span> {member.elected_in}</div>
              <div className="w-25 pa3"><a href={member.url} target="_blank" rel="noopener noreferrer">Website</a></div>
            </div>
          </div>
          <h4 className="roles">Roles through time</h4>
            { member.roles.map(m => 
              <Fragment>
                <div className="member-info-container">
                  <div className="w-100 b f5 pl3 pt2">{m.title}</div>
                  <div className="w-100 pl3 pb1">{m.start_date.slice(0, 4)} - {m.end_date.slice(0, 4)}</div>
                  <div className="w-100 pl3 f6"><span className="b">Party:</span> {m.party}</div>
                  { m.district &&
                    <div className="w-100 pl3 f6 b">{m.state}, {m.district} district</div>
                  }
                  { m.cook_pvi &&
                    <div className="w-100 pl3 pb2 f6"><span className="b">Cook PVI:</span> {m.cook_pvi}</div>
                  }
                  <div className="flex pt2">
                      { m.total_votes && 
                        <div className="w-30 mh3 f5">
                          <span className="b">Votes</span>
                          <div className="flex">
                            <div className="w-15 f6"><span className="b">Total:</span> {m.total_votes}</div>
                            <div className="w-15 f6 pl3"><span className="b">Missed:</span> {m.missed_votes}</div>
                          </div>
                        </div>
                      }
                      {m.votes_with_party_pct &&   
                      <div className="w-40 mh3 f5">
                        <span className="b">Party votes</span>
                        <div className="flex">
                          <div className="w-100 f6"><span className="b">With party:</span> {m.votes_with_party_pct} percent</div>
                          <div className="w-100 f6 pl3"><span className="b">Against:</span> {m.votes_against_party_pct} percent</div>
                        </div>
                      </div>
                      }
                  </div>
                  {m.committees.length > 0 &&
                    <div className="pt2 pb2">
                      <span className="b f5 pl3 pt2">Committee assignments</span>
                      {m.committees.map(c => 
                        <li className="pl3">{c.name}</li>
                      )}
                    </div>
                  }
                  {m.subcommittees.length > 0 &&
                    <div className="pt2 pb2">
                      <span className="b f5 pl3 pt2">Sub Committee assignments</span>
                      {m.subcommittees.map(c => 
                        <li className="pl3">{c.name}</li>
                      )}
                    </div>
                  }
                </div>
              </Fragment>
            )
          }
      <MembersFooter copyrights={"Design and develop by Gustavo - All rights reserved"}/>
      </div>
      }
      { isLoading && <div className="pa5"><CircularProgress/></div> }
    </Fragment>
  );
};

export default MembersInfo;