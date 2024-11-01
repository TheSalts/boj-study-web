import React, { useEffect, useState } from "react";
import axios from "axios";
import SolvedProblems from "./SolvedProblems";

interface User {
  handle: string;
  tier: number;
  rating: number;
  profileImageUrl: string;
  solvedCount: number;
}

const baseUrl =
  "https://port-0-boj-study-server-m2ysdjnxabf30e95.sel4.cloudtype.app";

const tiers: { tier: number; name: string; rating: number; class: string }[] = [
  { tier: 0, name: "Unrated", rating: 0, class: "tier-unrated" },
  { tier: 1, name: "Bronze V", rating: 30, class: "tier-bronze" },
  { tier: 2, name: "Bronze IV", rating: 60, class: "tier-bronze" },
  { tier: 3, name: "Bronze III", rating: 90, class: "tier-bronze" },
  { tier: 4, name: "Bronze II", rating: 120, class: "tier-bronze" },
  { tier: 5, name: "Bronze I", rating: 150, class: "tier-bronze" },
  { tier: 6, name: "Silver V", rating: 200, class: "tier-silver" },
  { tier: 7, name: "Silver IV", rating: 300, class: "tier-silver" },
  { tier: 8, name: "Silver III", rating: 400, class: "tier-silver" },
  { tier: 9, name: "Silver II", rating: 500, class: "tier-silver" },
  { tier: 10, name: "Silver I", rating: 650, class: "tier-silver" },
  { tier: 11, name: "Gold V", rating: 800, class: "tier-gold" },
  { tier: 12, name: "Gold IV", rating: 950, class: "tier-gold" },
  { tier: 13, name: "Gold III", rating: 1100, class: "tier-gold" },
  { tier: 14, name: "Gold II", rating: 1250, class: "tier-gold" },
  { tier: 15, name: "Gold I", rating: 1400, class: "tier-gold" },
  { tier: 16, name: "Platinum V", rating: 1600, class: "tier-platinum" },
  { tier: 17, name: "Platinum IV", rating: 1750, class: "tier-platinum" },
  { tier: 18, name: "Platinum III", rating: 1900, class: "tier-platinum" },
  { tier: 19, name: "Platinum II", rating: 2000, class: "tier-platinum" },
  { tier: 20, name: "Platinum I", rating: 2100, class: "tier-platinum" },
  { tier: 21, name: "Diamond V", rating: 2200, class: "tier-diamond" },
  { tier: 22, name: "Diamond IV", rating: 2300, class: "tier-diamond" },
  { tier: 23, name: "Diamond III", rating: 2400, class: "tier-diamond" },
  { tier: 24, name: "Diamond II", rating: 2500, class: "tier-diamond" },
  { tier: 25, name: "Diamond I", rating: 2600, class: "tier-diamond" },
  { tier: 26, name: "Ruby V", rating: 2700, class: "tier-ruby" },
  { tier: 27, name: "Ruby IV", rating: 2800, class: "tier-ruby" },
  { tier: 28, name: "Ruby III", rating: 2850, class: "tier-ruby" },
  { tier: 29, name: "Ruby II", rating: 2900, class: "tier-ruby" },
  { tier: 30, name: "Ruby I", rating: 2950, class: "tier-ruby" },
  { tier: 31, name: "Master", rating: 3000, class: "tier-master" },
];

function getTier(tier: number): {
  tier: number;
  name: string;
  rating: number;
  class: string;
} {
  if (tier >= 0 && tier < tiers.length) {
    return tiers[tier];
  }
  return tiers[0];
}

const UserInfo: React.FC = () => {
  const [userData, setUserData] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/users`, {
          withCredentials: true,
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  if (userData.length === 0) {
    return (
      <div style={{ color: "#8a8f95" }}>
        <i>불러오는 중...</i>
      </div>
    );
  }
  userData.sort((a, b) => b.rating - a.rating);
  return (
    <div className="user-list">
      {userData.map((user) => (
        <div className="user-card" key={user.handle}>
          <div className="rating-container">
            <div className="rating-info">
              <div className="rating-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="tabler-icon tabler-icon-trending-up"
                >
                  <path d="M3 17l6 -6l4 4l8 -8"></path>
                  <path d="M14 7l7 0l0 7"></path>
                </svg>
                AC RATING
              </div>
              <div className="tier-info">
                <span className={`${getTier(user.tier).class}`}>{`${
                  getTier(user.tier).name
                }`}</span>{" "}
                <b>
                  <span className={`${getTier(user.tier).class}`}>
                    {user.rating}
                  </span>
                </b>
              </div>
            </div>
            <div className="stats-container">
              <img
                src={`${
                  user.profileImageUrl ||
                  "https://static.solved.ac/misc/360x360/default_profile.png"
                }`}
                alt="User Profile"
                className="profile-image"
              />
              <b>{`${user.handle}`}</b>
              <br />
              <small>{`${user.solvedCount}`} 문제 해결</small>
            </div>
          </div>
          <SolvedProblems name={`${user.handle}`} />
        </div>
      ))}
    </div>
  );
};

export default UserInfo;
