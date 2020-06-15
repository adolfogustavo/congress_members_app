import fetch from 'isomorphic-unfetch';
import ab from '../utils/abbreviations';
import moment from 'moment';

const API_KEY = `R2i0qKpn0b3xbhZA6T3DdQXAwa78HkUD7GfTds5k`;

async function getMembers(type) {
  try {
    const response = await fetch(
      `https://api.propublica.org/congress/v1/116/${type}/members.json`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY
        }, 
      }
    );

    const result = await response.json();
    const members = await sortDataFromMembers(result);

    return members;

  } catch(error) {
    throw Error(error);
  }
}

async function getOneMember(memberId){
  try {
    const response = await fetch(
      `https://api.propublica.org/congress/v1/members/${memberId}.json`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY
        }, 
      }
    );

    const data = await response.json();
    const member = await sortDataFromOneMember(data.results[0]);

    return member;
  } catch(error) {
    throw Error(error);
  }
}

async function sortDataFromMembers(data) {
  try {
    let { members } = data.results[0];
    let newData = [];

    for(let m of members) {
      newData.push({
        id: m.id,
        full_name: m.middle_name !== null ? `${m.first_name} ${m.middle_name} ${m.last_name}` : `${m.first_name} ${m.last_name}`,
        date_of_birth: moment(m.date_of_birth).format("MMMM D, YYYY"),
        gender: ab.getGender(m.gender),
        party: ab.getPartyName(m.party),
        state: ab.getStateName(m.state),
        district: m.district,
        title: m.title,
        short_title: m.short_title,
        leadership_role: m.leadership_role,
        cook_pvi: m.cook_pvi,
        facebook_account_url: m.facebook_account !== null ? `https://www.facebook.com/${m.facebook_account}` : null,
        twitter_account_url: m.twitter_account !== null ? `https://twitter.com/${m.twitter_account}` : null,
        youtube_account_url: m.youtube_account !== null ? `https://youtube.com/${m.youtube_account}` : null,
        url: m.url,
        office: m.office,
        in_office: m.in_office,
        phone: m.phone,
        next_election: m.next_election,
        total_votes: m.total_votes,
        total_present: m.total_present,
        missed_votes: m.missed_votes,
        missed_votes_pct: `${m.missed_votes_pct} %`,
        votes_with_party_pct: `${m.votes_with_party_pct} %`,
        votes_against_party_pct: `${m.votes_against_party_pct} %`,
      });
    } 

    return newData;

  } catch (error) {
    throw Error(error);
  }
} 

async function sortDataFromOneMember(member) {
  try {
    let m = member;
    let newData = [];

    newData.push({
      id: m.id,
      full_name: m.middle_name !== null ? `${m.first_name} ${m.middle_name} ${m.last_name}` : `${m.first_name} ${m.last_name}`,
      date_of_birth: m.date_of_birth,
      gender: ab.getGender(m.gender),
      party: ab.getPartyName(m.current_party),
      roles: m.roles,
      facebook_account_url: m.facebook_account !== null ? `https://www.facebook.com/${m.facebook_account}` : null,
      twitter_account_url: m.twitter_account !== null ? `https://twitter.com/${m.twitter_account}` : null,
      youtube_account_url: m.youtube_account !== null ? `https://youtube.com/${m.youtube_account}` : null,
      url: m.url,
      office: m.in_office,
      in_office: m.in_office,
      most_recent_vote: m.most_recent_vote,
      short_title: m.roles[0].short_title,
      title: m.roles[0].title,
      next_election: m.roles[0].next_election,
      elected_in: m.roles[0].start_date,
      state: ab.getStateName(m.roles[0].state)
    });

    return newData[0];

  } catch (error) {
    throw Error(error);
  }
} 

export default {
  getMembers,
  getOneMember,
}